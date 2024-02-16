import { Provider } from '@nestjs/common';

import { PostInject } from './post.enum';
import { PostRepository } from './repository';
import { PostService } from './service';

export const PostRepositoryProvider: Provider = {
  provide: PostInject.REPOSITORY,
  useClass: PostRepository,
};

export const PostServiceProvider: Provider = {
  provide: PostInject.SERVICE,
  useClass: PostService,
};
