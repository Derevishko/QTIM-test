import { CreateUser } from '@modules/user';

import {
  RefreshTokenCredentials,
  SigninCredentials,
  UserAndTokens,
} from '../auth.type';

export interface IAuthService {
  refreshTokens(credentials: RefreshTokenCredentials): Promise<UserAndTokens>;
  signin(credentials: SigninCredentials): Promise<UserAndTokens>;
  signup(body: CreateUser): Promise<void>;
}
