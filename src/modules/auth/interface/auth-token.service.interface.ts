import { AuthToken, FullAuthToken } from '../auth.type';

export interface IAuthTokenService {
  create(body: AuthToken): Promise<FullAuthToken>;
  getOneWithException(query: Partial<FullAuthToken>): Promise<FullAuthToken>;
  update(
    query: Partial<FullAuthToken>,
    body: Partial<AuthToken>,
  ): Promise<void>;
}
