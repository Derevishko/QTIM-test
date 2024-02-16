import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import type { Request as RequestType } from 'express';

import { JwtConfig } from '@configs/jwt.config';
import { ITokenService, TokenInject } from '@providers/token';

import { AuthGuard } from './auth.guard';

export class OptionalAuthGuard extends AuthGuard implements CanActivate {
  constructor(
    @Inject(JwtConfig.KEY)
    protected readonly jwtConfig: ConfigType<typeof JwtConfig>,
    @Inject(TokenInject.SERVICE) protected readonly tokenService: ITokenService,
  ) {
    super(jwtConfig, tokenService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestType>();
    const token =
      this.extractTokenFromHeader(req) || this.extractTokenFromCookies(req);

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
}
