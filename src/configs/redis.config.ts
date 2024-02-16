import { registerAs } from '@nestjs/config';

import { ConfigToken } from '@common/enums';
import { ConfigData, RedisConfigType } from '@common/types';
import { ConfigUtil } from '@utils/config.util';

export const RedisConfig = registerAs<RedisConfigType>(
  ConfigToken.REDIS,
  () => {
    const configs: ConfigData<RedisConfigType> = {
      clusterModeEnabled: {
        value: process.env.REDIS_CLUSTER_MODE_ENABLED,
        joi: ConfigUtil.schema.boolean().allow(null, '').default(false),
      },
      host: {
        value: process.env.REDIS_HOST,
        joi: ConfigUtil.schema.string().allow(null, '').default('127.0.0.1'),
      },
      password: {
        value: process.env.REDIS_PASSWORD,
        joi: ConfigUtil.schema.string().allow(null, ''),
      },
      port: {
        value: process.env.REDIS_PORT,
        joi: ConfigUtil.schema.number().allow(null, '').default(6379),
      },
      queuePrefix: {
        value: process.env.REDIS_QUEUE_PREFIX,
        joi: ConfigUtil.schema.string().allow(null, '').default('worker'),
      },
      tls: {
        value: process.env.REDIS_TLS,
        joi: ConfigUtil.schema.boolean().allow(null, '').default(false),
      },
      username: {
        value: process.env.REDIS_USERNAME,
        joi: ConfigUtil.schema.string().allow(null, ''),
      },
    };

    return ConfigUtil.validate(ConfigToken.REDIS, configs);
  },
);
