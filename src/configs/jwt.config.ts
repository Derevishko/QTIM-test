import { registerAs } from '@nestjs/config';

import { ConfigToken } from '@common/enums';
import { ConfigData, JwtConfigType, JwtType } from '@common/types';
import { ConfigUtil } from '@utils/config.util';

export const JwtConfig = registerAs<JwtConfigType>(ConfigToken.JWT, () => {
  const accessTokenConfig: ConfigData<JwtType> = {
    secret: {
      value: process.env.JWT_SECRET_ACCESS_TOKEN,
      joi: ConfigUtil.schema.string().required(),
    },
    expiresIn: {
      value: process.env.JWT_EXPIRES_IN_ACCESS_TOKEN,
      joi: ConfigUtil.schema.string().allow(null, '').default('15m'),
    },
  };

  const refreshTokenConfig: ConfigData<JwtType> = {
    secret: {
      value: process.env.JWT_SECRET_REFRESH_TOKEN,
      joi: ConfigUtil.schema.string().required(),
    },
    expiresIn: {
      value: process.env.JWT_EXPIRES_IN_REFRESH_TOKEN,
      joi: ConfigUtil.schema.string().allow(null, '').default('30d'),
    },
  };

  return {
    accessToken: ConfigUtil.validate(ConfigToken.JWT, accessTokenConfig),
    refreshToken: ConfigUtil.validate(ConfigToken.JWT, refreshTokenConfig),
  };
});
