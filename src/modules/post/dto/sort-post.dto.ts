import { ApiPropertyOptional } from '@nestjs/swagger';

import { BaseSortDto } from '@common/dto';
import { SortBy } from '@common/enums';

export class SortPostDto extends BaseSortDto {
  @ApiPropertyOptional({ enum: SortBy })
  authorId!: SortBy;

  @ApiPropertyOptional({ enum: SortBy })
  title!: SortBy;
}
