import { ApiPropertyOptional } from '@nestjs/swagger';

import { LIMIT_ITEM, MAX_LIMIT_ITEM } from '../constants';

export class PageOptionDto implements PaginationCtx {
  @ApiPropertyOptional({
    minimum: 1,
    maximum: MAX_LIMIT_ITEM,
    default: LIMIT_ITEM,
  })
  readonly limit: number = LIMIT_ITEM;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  readonly page: number = 1;

  get offset(): number {
    return ((this.page || 1) - 1) * (this.limit || LIMIT_ITEM);
  }
}
