import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { TokenType } from '@common/enums';
import {
  RefreshTokenExpiredException,
  TokenMalformedException,
} from '@common/exceptions';
import { Token } from '@common/types';
import { JwtConfig } from '@configs/jwt.config';
import { ServiceCore } from '@core/service.core';
import {
  CreateUser,
  FullUser,
  IUserService,
  IUserValidator,
  UserInject,
} from '@modules/user';
import { ITokenService, TokenInject } from '@providers/token';
import { DateUtil } from '@utils/date.util';
import { HashUtil } from '@utils/hash.util';

import { AuthInject } from '../auth.enum';
import {
  AuthToken,
  AuthTokenPayload,
  RefreshTokenCredentials,
  SigninCredentials,
  Tokens,
} from '../auth.type';
import { IAuthService, IAuthTokenService } from '../interface';

@Injectable()
export class AuthService extends ServiceCore implements IAuthService {
  constructor(
    @Inject(JwtConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof JwtConfig>,
    @Inject(AuthInject.TOKEN_SERVICE)
    private readonly authTokenService: IAuthTokenService,
    @Inject(TokenInject.SERVICE) private readonly tokenService: ITokenService,
    @Inject(UserInject.SERVICE) private readonly userService: IUserService,
    @Inject(UserInject.VALIDATOR)
    private readonly userValidator: IUserValidator,
  ) {
    super();
  }

  async getTokens(user: FullUser): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]);

    return {
      type: TokenType.BEARER,
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens({ refreshToken }: RefreshTokenCredentials) {
    const payloadRefreshToken = await this.resolveRefreshToken(refreshToken);

    const user = await this.userService.getOneWithException({
      id: payloadRefreshToken.sub,
    });

    const tokens = await this.getTokens(user);

    return { user, tokens };
  }

  async signin({ password, ...query }: SigninCredentials) {
    const user = await this.userService.getOne(query);

    await this.userValidator.validateCredentials(user, password);
    const tokens = await this.getTokens(user as FullUser);

    return { user: user as FullUser, tokens };
  }

  async signup(body: CreateUser): Promise<void> {
    await this.userService.create(body);
  }

  protected generateAccessToken({ id }: FullUser): Promise<Token> {
    return this.tokenService.signJwt<JwtPayload>(
      {
        jti: HashUtil.generateUuid(),
        sub: id,
        typ: TokenType.BEARER,
      },
      this.jwtConfig.accessToken.secret,
      { expiresIn: DateUtil.toMs(this.jwtConfig.accessToken.expiresIn) },
    );
  }

  protected async generateRefreshToken({ id }: FullUser): Promise<Token> {
    const jti = HashUtil.generateUuid();
    const ms = DateUtil.toMs(this.jwtConfig.refreshToken.expiresIn);
    const expiredAt = DateUtil.addMillisecondToDate(new Date(), ms);

    const [refreshToken] = await Promise.all([
      this.tokenService.signJwt(
        {
          sub: id,
          jti,
          typ: TokenType.BEARER,
        },
        this.jwtConfig.refreshToken.secret,
        { expiresIn: ms },
      ),
      this.authTokenService.create({
        userId: Number(id),
        jti,
        expiredAt,
      }),
    ]);

    return refreshToken;
  }

  private decodeRefreshToken(token: Token): Promise<AuthTokenPayload> {
    return this.tokenService.verifyJwt<AuthTokenPayload>(
      token,
      this.jwtConfig.refreshToken.secret,
    );
  }

  private getAuthTokenFromPayload({
    jti,
    sub,
  }: AuthTokenPayload): Promise<AuthToken> {
    if (!jti || !sub) {
      throw new TokenMalformedException();
    }

    return this.authTokenService.getOneWithException({
      userId: +sub,
      jti,
    });
  }

  private async resolveRefreshToken(token: string): Promise<AuthTokenPayload> {
    const payload = await this.decodeRefreshToken(token);
    const refreshToken = await this.getAuthTokenFromPayload(payload);

    if (refreshToken?.isRevoked) {
      throw new RefreshTokenExpiredException();
    }

    return payload;
  }
}
