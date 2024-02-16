import { Module } from '@nestjs/common';

import {
  UserRepositoryProvider,
  UserServiceProvider,
  UserValidatorProvider,
} from './user.provider';

@Module({
  providers: [
    UserRepositoryProvider,
    UserServiceProvider,
    UserValidatorProvider,
  ],
  exports: [UserServiceProvider, UserValidatorProvider],
})
export class UserModule {}
