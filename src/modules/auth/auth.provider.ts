import { Provider } from '@nestjs/common';

import { AuthInject } from './auth.enum';
import { AuthTokenRepository } from './repository';
import { AuthService, AuthTokenService } from './service';

export const AuthServiceProvider: Provider = {
  provide: AuthInject.SERVICE,
  useClass: AuthService,
};

export const AuthTokenRepositoryProvider: Provider = {
  provide: AuthInject.TOKEN_REPOSITORY,
  useClass: AuthTokenRepository,
};

export const AuthTokenServiceProvider: Provider = {
  provide: AuthInject.TOKEN_SERVICE,
  useClass: AuthTokenService,
};
