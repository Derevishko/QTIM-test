import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { RepositoryCore } from '@core/repository.core';

import { PostEntity } from '../entity';
import { IPostRepository } from '../interface';

@Injectable()
export class PostRepository
  extends RepositoryCore<PostEntity>
  implements IPostRepository
{
  constructor(protected readonly dataSource: DataSource) {
    super(PostEntity, dataSource);
  }
}
