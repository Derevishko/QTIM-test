import { INTEGER_SCHEMA } from '@common/constants';
import { AjvFormatKey, SortBy } from '@common/enums';
import { JsonSchemaProp, SchemaOption } from '@common/types';

export class SchemaCore {
  constructor(private readonly moduleName = 'common') {}

  protected getArrayInteger(key: string): JsonSchemaProp {
    return {
      [key]: {
        anyOf: [
          {
            type: 'array',
            minItems: 1,
            uniqueItems: true,
            items: { ...INTEGER_SCHEMA, minimum: 1 },
          },
          { ...INTEGER_SCHEMA, minimum: 1 },
        ],
      },
    };
  }

  protected getArrayString(key: string): JsonSchemaProp {
    return {
      [key]: {
        anyOf: [
          {
            type: 'array',
            minItems: 1,
            uniqueItems: true,
            items: { type: 'string' },
          },
          { type: 'string' },
        ],
      },
    };
  }

  protected getDate(key: string): JsonSchemaProp {
    return {
      [key]: {
        type: ['string', 'null'],
        format: 'date',
      },
    };
  }

  protected getDateRange(key: string): JsonSchemaProp {
    return {
      [key]: {
        type: 'object',
        additionalProperties: false,
        properties: {
          min: {
            type: 'string',
            format: 'date',
          },
          max: {
            type: 'string',
            format: 'date',
            formatMinimum: { $data: '1/min' },
          },
        },
      },
    };
  }

  protected getDateTime(key: string): JsonSchemaProp {
    return {
      [key]: {
        type: ['string', 'null'],
        format: 'date-time',
      },
    };
  }

  protected getEmail(): JsonSchemaProp {
    return this.getString('email', {
      format: AjvFormatKey.EMAIL,
    });
  }

  protected getEnum(key: string, value: object): JsonSchemaProp {
    return {
      [key]: {
        type: 'string',
        enum: Object.values(value),
      },
    };
  }

  protected getIdKey(schemaName: string) {
    return `${this.moduleName}/${schemaName}`;
  }

  protected getInteger(
    key: string,
    minimum = 0,
    maximum = Number.MAX_SAFE_INTEGER,
  ): JsonSchemaProp {
    return {
      [key]: {
        type: 'integer',
        minimum,
        maximum,
      },
    };
  }

  protected getPassword(key?: string): JsonSchemaProp {
    return this.getString(key || 'password', { format: AjvFormatKey.PASSWORD });
  }

  protected getSortBy(key: string): JsonSchemaProp {
    return {
      [key]: {
        type: 'string',
        enum: Object.values(SortBy),
        transform: ['toUpperCase'],
      },
    };
  }

  protected getString(key: string, opt?: SchemaOption): JsonSchemaProp {
    const { isOptional, ...param } = opt || { isOptional: false };
    const minLength = isOptional ? 0 : opt?.minLength ?? 1;
    const maxLength = opt?.maxLength;

    return {
      [key]: {
        type: isOptional ? ['string', 'null'] : 'string',
        transform: ['trim'],
        ...param,
        minLength,
        ...(maxLength && { maxLength }),
      },
    };
  }
}
