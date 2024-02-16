import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import type { Request as RequestType } from 'express';

import { COOKIE_ACCESS_TOKEN } from '@common/constants';
import { JwtConfig } from '@configs/jwt.config';
import { ITokenService, TokenInject } from '@providers/token';

import { TokenType } from '../enums/token.enum';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject(JwtConfig.KEY)
    protected readonly jwtConfig: ConfigType<typeof JwtConfig>,
    @Inject(TokenInject.SERVICE) protected readonly tokenService: ITokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestType>();
    const token =
      this.extractTokenFromHeader(req) || this.extractTokenFromCookies(req);

    if (!token) throw new UnauthorizedException();

    if (token) {
      try {
        const { jti, sub, typ, ...user } =
          await this.tokenService.verifyJwt<JwtPayload>(
            token,
            this.jwtConfig.accessToken.secret,
          );

        req.user = Object.freeze(user);
      } catch {
        throw new UnauthorizedException();
      }
    }

    return true;
  }

  protected extractTokenFromCookies(req: RequestType): string | null {
    if (req.cookies && COOKIE_ACCESS_TOKEN in req.cookies) {
      return req.cookies.accessToken as string;
    }

    return null;
  }

  protected extractTokenFromHeader(req: RequestType): string | null {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];

    return type === TokenType.BEARER && token ? token : null;
  }
}
