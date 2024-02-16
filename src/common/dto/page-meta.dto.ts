import { ApiProperty } from '@nestjs/swagger';

import { PageOptionDto } from './page-option.dto';

export class PageMetaDto {
  @ApiProperty({ example: true })
  readonly hasNextPage!: boolean;

  @ApiProperty({ example: false })
  readonly hasPrevPage!: boolean;

  @ApiProperty({ example: 335 })
  readonly itemCount!: number;

  @ApiProperty({ example: 20 })
  readonly limit!: number;

  @ApiProperty({ example: 1 })
  readonly page!: number;

  @ApiProperty({ example: 17 })
  readonly pageCount!: number;

  constructor(pageOption: PageOptionDto, itemCount: number) {
    this.limit = pageOption.limit || itemCount;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.limit) || 0;

    this.page = this.transformPage(pageOption);
    this.hasPrevPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }

  private transformPage(pageOption: PageOptionDto) {
    return pageOption?.page > this.pageCount
      ? this.pageCount + 1
      : pageOption.page || 1;
  }
}
