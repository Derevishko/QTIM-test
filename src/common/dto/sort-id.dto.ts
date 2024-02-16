import { ApiPropertyOptional } from '@nestjs/swagger';

import { Sort } from '@common/types';

import { SortBy } from '../enums';

export class SortIdDto {
  [key: string]: Sort;

  @ApiPropertyOptional({ enum: SortBy, name: 'sort[id]' })
  id!: Sort;
}
