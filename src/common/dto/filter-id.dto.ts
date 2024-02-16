import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterIdDto {
  @ApiPropertyOptional({ name: 'filter[ids]' })
  ids?: number[];
}
