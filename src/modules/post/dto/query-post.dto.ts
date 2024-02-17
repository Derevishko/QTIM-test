import { ApiPropertyOptional } from '@nestjs/swagger';

import { PageOptionDto } from '@common/dto';

import { FilterPostDto } from './filter-post.dto';
import { SortPostDto } from './sort-post.dto';

export class QueryPostDto extends PageOptionDto {
  @ApiPropertyOptional({ type: () => FilterPostDto })
  filter?: FilterPostDto;

  @ApiPropertyOptional({ type: () => SortPostDto })
  sort?: SortPostDto;
}
