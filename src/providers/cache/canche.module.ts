import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

import { RedisConfig } from '@configs/redis.config';

@Module({
  imports: [
    NestCacheModule.registerAsync({
      isGlobal: true,
      inject: [RedisConfig.KEY],
      useFactory: (redisConfig: ConfigType<typeof RedisConfig>) => ({
        store: redisStore,
        host: redisConfig.host,
        port: redisConfig.port,
      }),
    }),
  ],
})
export class CacheModule {}
