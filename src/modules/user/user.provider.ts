import { Provider } from '@nestjs/common';

import { UserRepository } from './repository';
import { UserService } from './service';
import { UserInject } from './user.enum';

export const UserRepositoryProvider: Provider = {
  provide: UserInject.REPOSITORY,
  useClass: UserRepository,
};

export const UserServiceProvider: Provider = {
  provide: UserInject.SERVICE,
  useClass: UserService,
};
