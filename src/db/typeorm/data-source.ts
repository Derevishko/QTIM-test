import { resolve } from 'path';
import 'dotenv/config';

import { DataSource } from 'typeorm';

import { EnvToken } from '@common/enum';

export const AppDataSource = new DataSource({
  type: (process.env.DB_CLIENT ?? 'postgres') as 'postgres',
  host: <string>process.env.DB_HOST ?? '127.0.0.1',
  port: parseInt(<string>process.env.DB_PORT),
  username: <string>process.env.DB_USER,
  password: <string>process.env.DB_PASSWORD,
  database: <string>process.env.DB_NAME,
  migrations:
    process.env.NODE_ENV === EnvToken.SEED
      ? [resolve('libs/db/src/seed/*{.ts,.js}')]
      : [resolve('libs/db/src/migration/*{.ts,.js}')],
  migrationsTableName:
    process.env.NODE_ENV === EnvToken.SEED ? 'seeds' : 'migrations',
  entities: [resolve('apps/api/src/modules/**/*.entity{.ts,.js}')],
  synchronize: false,
  logging: (process.env.DB_LOG_ENABLED ?? false) as boolean,
  // TODO: add ssl
});
