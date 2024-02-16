import { Module } from '@nestjs/common';

import { UserModule } from '@modules/user/user.module';
import { TokenModule } from '@providers/token/token.module';

import { AuthController } from './auth.controller';
import {
  AuthServiceProvider,
  AuthTokenRepositoryProvider,
  AuthTokenServiceProvider,
} from './auth.provider';

@Module({
  imports: [TokenModule, UserModule],
  controllers: [AuthController],
  providers: [
    AuthServiceProvider,
    AuthTokenRepositoryProvider,
    AuthTokenServiceProvider,
  ],
})
export class AuthModule {}
