import { JsonSchema } from '@common/types';
import { SchemaCore } from '@core/schema.core';

class AuthSchema extends SchemaCore {
  refreshToken(): JsonSchema {
    return {
      $id: this.getIdKey('refreshToken'),
      type: 'object',
      additionalProperties: false,
      required: ['refreshToken'],
      properties: {
        ...this.getString('refreshToken'),
      },
    };
  }

  signin(): JsonSchema {
    return {
      $id: this.getIdKey('signin'),
      type: 'object',
      additionalProperties: false,
      properties: {
        ...this.getEmail(),
        ...this.getPassword(),
      },
      required: ['email', 'password'],
    };
  }

  signup(): JsonSchema {
    return {
      $id: this.getIdKey('signup'),
      type: 'object',
      additionalProperties: false,
      properties: {
        ...this.getEmail(),
        ...this.getPassword(),
      },
    };
  }
}

export const authSchema = new AuthSchema();
