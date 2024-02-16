import { TokenType } from '@common/enums';
import { OptionsType, QueryType, Token } from '@common/types';
import { FullUser, User } from '@modules/user';

import { IAuthToken } from './interface';

export type AuthToken = IAuthToken;
export type FullAuthToken = IdObject & AuthToken & DateInfo;

export type AuthTokenPayload = Pick<JwtPayload, 'jti' | 'sub' | 'typ'>;

export type AuthTokenQuery = QueryType<FullAuthToken>;
export type AuthTokenOption = OptionsType<FullAuthToken>;

export type Tokens = {
  accessToken: Token;
  refreshToken: Token;
  type: TokenType;
};

export type UserAndTokens = {
  tokens: Tokens;
  user: FullUser;
};

export type SigninCredentials = Pick<User, 'email' | 'password'>;
export type RefreshTokenCredentials = Pick<Tokens, 'refreshToken'>;
