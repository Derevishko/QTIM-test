import { Module } from '@nestjs/common';

import { UserRepositoryProvider, UserServiceProvider } from './user.provider';

@Module({
  providers: [UserRepositoryProvider, UserServiceProvider],
  exports: [UserServiceProvider],
})
export class UserModule {}
