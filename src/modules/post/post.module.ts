import { Module } from '@nestjs/common';

import { PostController } from './post.controller';
import { PostRepositoryProvider, PostServiceProvider } from './post.provider';

@Module({
  controllers: [PostController],
  providers: [PostRepositoryProvider, PostServiceProvider],
})
export class PostModule {}
