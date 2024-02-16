import {
  ArgumentMetadata,
  Injectable,
  InternalServerErrorException,
  Logger,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import addKeywords from 'ajv-keywords';

import { REG_PASSWORD } from '@common/constants';
import { AjvFormatKey } from '@common/enums/ajv.enum';
import { JsonSchema } from '@common/types';
import { StringUtil } from '@utils/string.util';

import { LoggerCtx } from '../enums';

@Injectable()
export class AjvValidationPipe implements PipeTransform {
  private ajv: Ajv;
  private readonly logger = new Logger(LoggerCtx.VALIDATION_PIPE);

  constructor() {
    this.ajv = new Ajv({ $data: true, allErrors: true, coerceTypes: true });

    addFormats(this.ajv);
    addErrors(this.ajv);
    addKeywords(this.ajv, ['transform', 'uniqueItemProperties']);

    this.registerFormat();
  }

  //FIXME: ARRAY VALID
  transform<T>(input: T, metadata: ArgumentMetadata): T {
    try {
      if (!metadata.data) {
        return input;
      }

      const schema = metadata.data as unknown as JsonSchema;

      const validate = this.getValidate(schema);

      const isValid = validate(input);

      if (!isValid && validate.errors) {
        const errors: Array<{ key: string; value: string }> = [];
        const len = validate.errors.length;

        for (const err of validate.errors) {
          const name =
            (err.params.missingProperty as string) ||
            (err.params.additionalProperty as string) ||
            err.instancePath.slice(1);

          if (name || (len === 1 && err.keyword === 'errorMessage')) {
            errors.push({
              key: name || 'data',
              value: StringUtil.capitalizeOnlyFirstChar(err.message || ''),
            });
          }
        }

        throw new UnprocessableEntityException(errors);
      }

      return input;
    } catch (err: unknown) {
      if (err instanceof UnprocessableEntityException) {
        throw err;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      // this.logger.error('Schema validation', { err });

      this.logger.error('Schema validation', { err });

      throw new InternalServerErrorException();
    }
  }

  private getValidate(schema: JsonSchema) {
    return (
      (schema.$id && this.ajv.getSchema(schema.$id)) || this.ajv.compile(schema)
    );
  }

  private registerFormat() {
    this.ajv.addFormat(AjvFormatKey.PASSWORD, REG_PASSWORD);
  }
}
