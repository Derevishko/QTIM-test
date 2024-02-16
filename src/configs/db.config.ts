import { registerAs } from '@nestjs/config';

import { ConfigToken } from '@common/enums';
import { ConfigData, DbConfigType } from '@common/types';
import { ConfigUtil } from '@utils/config.util';

export const DbConfig = registerAs(ConfigToken.DB, () => {
  const config: ConfigData<DbConfigType> = {
    client: {
      value: process.env.DB_CLIENT,
      joi: ConfigUtil.schema
        .string()
        .valid('postgres')
        .allow(null, '')
        .default('postgres'),
    },
    databaseName: {
      value: process.env.DB_NAME,
      joi: ConfigUtil.schema.string().allow(null, '').default(''),
    },
    host: {
      value: process.env.DB_HOST,
      joi: ConfigUtil.schema
        .string()
        .allow(null, '')
        .default('http://localhost'),
    },
    logging: {
      value: process.env.DB_LOGGING,
      joi: ConfigUtil.schema.boolean().allow(null, '').default('false'),
    },
    password: {
      value: process.env.DB_PASSWORD,
      joi: ConfigUtil.schema.string().allow(null, '').default(''),
    },
    port: {
      value: process.env.DB_PORT,
      joi: ConfigUtil.schema.number().allow(null, '').default(5432),
    },
    username: {
      value: process.env.DB_USER,
      joi: ConfigUtil.schema.string().allow(null, '').default(''),
    },
  };

  return ConfigUtil.validate(ConfigToken.DB, config);
});
