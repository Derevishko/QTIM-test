import { resolve } from 'path';

import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvToken } from '@common/enums';
import { AppConfig } from '@configs/app.config';
import { DbConfig } from '@configs/db.config';

import { Logger } from './typeorm/logger';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [AppConfig.KEY, DbConfig.KEY],
      useFactory: (
        appConfig: ConfigType<typeof AppConfig>,
        dbConfig: ConfigType<typeof DbConfig>,
      ) => ({
        // autoLoadEntities: true,
        type: dbConfig.client,
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.databaseName,
        entities: [resolve('dist/apps/api/src/modules/**/*.entity{.ts,.js}')],
        synchronize: false,
        logging: dbConfig.logging,
        relationLoadStrategy: 'query',
        ...(!(
          appConfig.env === EnvToken.CLI || appConfig.env === EnvToken.SEED
        ) && {
          logger: new Logger(),
        }),
      }),
    }),
  ],
})
export class DbModule {}
