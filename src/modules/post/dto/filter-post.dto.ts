import { ApiPropertyOptional } from '@nestjs/swagger';

import { BaseFilterDto } from '@common/dto';

export class FilterPostDto extends BaseFilterDto {
  @ApiPropertyOptional({ name: 'filter[authorId]' })
  authorId?: Id[];

  @ApiPropertyOptional({ name: 'filter[title]' })
  title?: string[];
}
