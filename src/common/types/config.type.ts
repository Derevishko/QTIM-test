import { Schema } from 'joi';

import { EnvToken } from '@common/enums';

import { DbClient } from './sql.type';

export type ConfigProps = {
  joi: Schema;
  value: unknown;
};

export type ConfigData<T> = Record<keyof T, ConfigProps>;

export type AppConfigType = {
  domain: string;
  env: EnvToken;
  host: string;
  logEnabled: boolean;
  name: string;
  port: number;
};

export type DbConfigType = {
  client: DbClient;
  databaseName: string;
  host: string;
  logging: boolean;
  password: string;
  port: number;
  username: string;
};

export type JwtType = {
  expiresIn: string;
  secret: string;
};

export type JwtConfigType = {
  accessToken: JwtType;
  refreshToken: JwtType;
  token: JwtType;
};

export type RedisConfigType = {
  clusterModeEnabled: boolean;
  host: string;
  password?: string;
  port: number;
  queuePrefix: string;
  tls?: boolean;
  username?: string;
};
