import Joi, { SchemaMap } from 'joi';

import { ConfigToken } from '@common/enum';
import { ConfigData, ConfigProps } from '@common/types';

export class ConfigUtil {
  static get schema() {
    return Joi;
  }

  static extractByPropName<T, R = T>(
    config: ConfigData<T>,
    propName: keyof ConfigProps,
  ): R {
    return Object.keys(config).reduce((prop, key) => {
      if (config?.[key]?.[propName]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        prop[key] = config?.[key]?.[propName];
      }

      return prop;
    }, {} as R);
  }

  static validate<T>(name: ConfigToken, config: ConfigData<T>) {
    const schemaObj = ConfigUtil.extractByPropName<T, SchemaMap<T>>(
      config,
      'joi',
    );
    const values = ConfigUtil.extractByPropName(config, 'value');
    const schema = ConfigUtil.schema.object(schemaObj);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { error, value } = schema.validate(values, { abortEarly: false });

    if (error) {
      throw new Error(ConfigUtil.transformError(name, error));
    }

    return value as T;
  }

  private static transformError(
    name: ConfigToken,
    error?: Joi.ValidationError,
  ) {
    const key = error?.details?.[0]?.context?.key || '';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const value = error?.details?.[0]?.context?.value || '';
    const message = error?.message || '';

    if (key) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `Wrong "${name}.${key}" variable; Value: "${value}" is invalid. ${message}`;
    }

    return `Validation failed - Is there an environment variable missing? ${message}`;
  }
}
