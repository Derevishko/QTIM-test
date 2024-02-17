import { ApiPropertyOptional } from '@nestjs/swagger';

import { SortBy } from '../enums';

export class SortIdDto {
  [key: string]: SortBy;

  @ApiPropertyOptional({ enum: SortBy, name: 'sort[id]' })
  id!: SortBy;
}
