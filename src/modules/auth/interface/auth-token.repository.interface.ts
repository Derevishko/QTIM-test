import { AuthToken, AuthTokenQuery, FullAuthToken } from '../auth.type';

export interface IAuthTokenRepository {
  create(body: AuthToken): Promise<FullAuthToken>;
  getOneWithException(query: AuthTokenQuery): Promise<FullAuthToken>;
  update(
    query: Partial<FullAuthToken>,
    body: Partial<AuthToken>,
  ): Promise<void>;
}
