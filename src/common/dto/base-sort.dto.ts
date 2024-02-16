import { ApiPropertyOptional } from '@nestjs/swagger';

import { Sort } from '@common/types';

import { SortBy } from '../enums';

import { SortIdDto } from './sort-id.dto';

export class BaseSortDto extends SortIdDto {
  @ApiPropertyOptional({
    enum: SortBy,
    name: 'sort[createdAt]',
  })
  createdAt!: Sort;
}
