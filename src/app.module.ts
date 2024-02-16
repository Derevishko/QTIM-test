import { Module } from '@nestjs/common';

import { DbModule } from '@db/db.module';
import { AuthModule } from '@modules/auth/auth.module';

import { ConfigModule } from './configs';

@Module({
  imports: [ConfigModule, DbModule, AuthModule],
})
export class AppModule {}
