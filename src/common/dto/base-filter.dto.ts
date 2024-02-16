import { ApiPropertyOptional } from '@nestjs/swagger';

import { FilterIdDto } from './filter-id.dto';

class BaseDateRangeDto {
  @ApiPropertyOptional({ format: 'date' })
  max?: string;

  @ApiPropertyOptional({ format: 'date' })
  min?: string;
}

export class BaseFilterDto extends FilterIdDto {
  @ApiPropertyOptional({
    type: () => BaseDateRangeDto,
    name: 'filter[createdAt]',
  })
  createdAt?: BaseDateRangeDto;
}
