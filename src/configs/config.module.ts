import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { EnvToken } from '@common/enums';

import { AppConfig } from './app.config';
import { DbConfig } from './db.config';
import { JwtConfig } from './jwt.config';
import { RedisConfig } from './redis.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `${process.cwd()}/${
        process?.env?.NODE_ENV === EnvToken.TEST ? '.env.test' : '.env'
      }`,
      load: [AppConfig, DbConfig, JwtConfig, RedisConfig],
    }),
  ],
})
export class ConfigModule {}
