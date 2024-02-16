import { SqlContext } from '@common/types';

import {
  CreatePost,
  FullPost,
  PostOptions,
  PostQuery,
  UpdatePost,
} from '../post.type';

export interface IPostRepository {
  create(body: CreatePost, ctx?: SqlContext): Promise<FullPost>;
  delete(query: PostQuery, ctx?: SqlContext): Promise<void>;
  getCount(query: PostQuery, ctx?: SqlContext): Promise<number>;
  getList(options: PostOptions, ctx?: SqlContext): Promise<FullPost[]>;
  getListAndCount(
    options: PostOptions,
    ctx?: SqlContext,
  ): Promise<[FullPost[], number]>;
  getOne(query: PostQuery, ctx?: SqlContext): Promise<FullPost | null>;
  getOneWithException(query: PostQuery, ctx?: SqlContext): Promise<FullPost>;
  update(query: PostQuery, body: UpdatePost, ctx?: SqlContext): Promise<void>;
}
