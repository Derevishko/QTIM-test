import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterIdDto {
  @ApiPropertyOptional({ name: 'filter[id]' })
  id?: number[];
}
