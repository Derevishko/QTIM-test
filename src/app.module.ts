import { Module } from '@nestjs/common';

import { DbModule } from '@db/db.module';
import { AuthModule } from '@modules/auth/auth.module';
import { PostModule } from '@modules/post/post.module';

import { ConfigModule } from './configs';

@Module({
  imports: [ConfigModule, DbModule, AuthModule, PostModule],
})
export class AppModule {}
