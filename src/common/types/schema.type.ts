import { JSONSchema7 } from 'json-schema';

export type JsonSchema = JSONSchema7 & {
  consumes?: string[];
  errorMessage?: {
    [key: string]: string;
  };
  formatMinimum?: any;
  maximum?: number;
  minimum?: number;
  patternProperties?: {
    [key: string]: JsonSchema;
  };
  properties?: {
    [key: string]: JsonSchema | boolean;
  };
  transform?: string[];
  uniqueItemProperties?: string[];
};

export type JsonSchemaProp = {
  [key: string]: JsonSchema;
};

export type SchemaOption = {
  isOptional?: boolean;
} & Pick<JsonSchema, 'format' | 'maxLength' | 'minLength'>;
