import { JsonSchema, JsonSchemaProp } from '@common/types';

import {
  MAX_LIMIT_ITEM,
  MIN_LIMIT_ITEM,
  MIN_PAGE,
  UNLIMIT_PAGE,
} from './page.constant';

export const INTEGER_SCHEMA: JsonSchema = {
  type: 'integer',
};

export const NUMBER_SCHEMA: JsonSchema = {
  type: 'number',
};

export const PAGE_UNLIMIT_ITEM_SCHEMA: JsonSchemaProp = {
  limit: {
    type: 'integer',
    minimum: MIN_LIMIT_ITEM,
    maximum: MAX_LIMIT_ITEM,
  },
  page: {
    oneOf: [
      {
        type: 'integer',
        format: 'int64',
        minimum: MIN_PAGE,
        maximum: Number.MAX_SAFE_INTEGER,
      },
      {
        type: 'integer',
        format: 'int64',
        const: UNLIMIT_PAGE,
      },
    ],
  },
};
