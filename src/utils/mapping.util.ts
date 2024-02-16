import { plainToInstance } from 'class-transformer';

import { MappingParams } from '@common/types';

export class MappingUtil {
  static toDto<T, C>(data: T, { options, cls }: MappingParams<C>): C;
  static toDto<T, C>(data: T[], { options, cls }: MappingParams<C>): C[];
  static toDto<T, C>(
    data: T | T[],
    { options, cls }: MappingParams<C>,
  ): C | C[] {
    return plainToInstance(cls, data, options);
  }
}
