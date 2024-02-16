import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  description!: string;

  @ApiProperty()
  title!: string;
}
