import { PAGE_UNLIMIT_ITEM_SCHEMA } from '@common/constants';
import { JsonSchema, JsonSchemaProp } from '@common/types';
import { SchemaCore } from '@core/schema.core';

class PostSchema extends SchemaCore {
  protected get properties(): JsonSchemaProp {
    return {
      ...this.getString('title'),
      ...this.getString('description'),
    };
  }

  create(): JsonSchema {
    return {
      $id: this.getIdKey('create'),
      type: 'object',
      additionalProperties: false,
      required: ['title'],
      properties: this.properties,
    };
  }

  getList(): JsonSchema {
    return {
      type: 'object',
      additionalProperties: false,
      properties: {
        ...PAGE_UNLIMIT_ITEM_SCHEMA,
        filter: {
          type: 'object',
          additionalProperties: false,
          properties: {
            ...this.getArrayInteger('id'),
            ...this.getArrayString('title'),
            ...this.getArrayString('authorId'),
            ...this.getDateRange('createdAt'),
          },
        },
        sort: {
          type: 'object',
          additionalProperties: false,
          properties: {
            ...this.getSortBy('id'),
            ...this.getSortBy('title'),
            ...this.getSortBy('authorId'),
            ...this.getSortBy('createdAt'),
          },
        },
      },
    };
  }

  getOne(): JsonSchema {
    return {
      $id: this.getIdKey('getOne'),
      required: ['id'],
      additionalProperties: false,
      properties: this.getInteger('id'),
    };
  }

  update(): JsonSchema {
    return {
      $id: this.getIdKey('update'),
      type: 'object',
      additionalProperties: false,
      required: ['name'],
      properties: this.properties,
    };
  }
}

export const postSchema = new PostSchema();
