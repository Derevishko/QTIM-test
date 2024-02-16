import { Inject } from '@nestjs/common';

import { AuthInject } from '../auth.enum';
import { AuthToken, FullAuthToken } from '../auth.type';
import { IAuthTokenRepository, IAuthTokenService } from '../interface';

export class AuthTokenService implements IAuthTokenService {
  constructor(
    @Inject(AuthInject.TOKEN_REPOSITORY)
    private readonly repository: IAuthTokenRepository,
  ) {}

  create(body: AuthToken) {
    return this.repository.create(body);
  }

  getOneWithException(query: Partial<FullAuthToken>) {
    return this.repository.getOneWithException(query);
  }

  async update(query: Partial<FullAuthToken>, body: Partial<AuthToken>) {
    const { id } = await this.repository.getOneWithException(query);

    await this.repository.update({ id }, body);
  }
}
