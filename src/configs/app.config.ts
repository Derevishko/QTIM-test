import { registerAs } from '@nestjs/config';

import { ConfigToken, EnvToken } from '@common/enums';
import { AppConfigType, ConfigData } from '@common/types';
import { ConfigUtil } from '@utils/config.util';

export const AppConfig = registerAs(ConfigToken.APP, () => {
  const config: ConfigData<AppConfigType> = {
    domain: {
      value: process.env.APP_DOMAIN,
      joi: ConfigUtil.schema.string().allow(null, '').default('localhost'),
    },
    env: {
      value: process.env.NODE_ENV,
      joi: ConfigUtil.schema
        .string()
        .valid(...Object.values(EnvToken))
        .allow(null, '')
        .default(EnvToken.PRODUCTION),
    },
    host: {
      value: process.env.APP_HOST,
      joi: ConfigUtil.schema
        .string()
        .allow(null, '')
        .default('http://localhost'),
    },
    logEnabled: {
      value: process.env.APP_LOG_ENABLED,
      joi: ConfigUtil.schema.boolean().allow(null, '').default('true'),
    },
    name: {
      value: process.env.APP_NAME,
      joi: ConfigUtil.schema.string().allow(null, '').default(''),
    },
    port: {
      value: process.env.APP_PORT,
      joi: ConfigUtil.schema.number().allow(null, '').default(5656),
    },
  };

  return ConfigUtil.validate(ConfigToken.APP, config);
});
