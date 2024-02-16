import {
  CreatePost,
  FullPost,
  PostCtx,
  PostQuery,
  UpdatePost,
} from '../post.type';

export interface IPostService {
  create(body: CreatePost, ctx?: PostCtx): Promise<FullPost>;
  delete(query: PostQuery, ctx?: PostCtx): Promise<void>;
  getCount(query: PostQuery, ctx?: PostCtx): Promise<number>;
  getList(options: PostQuery, ctx?: PostCtx): Promise<FullPost[]>;
  getListAndCount(
    options: PostQuery,
    ctx?: PostCtx,
  ): Promise<[FullPost[], number]>;
  getOne(query: PostQuery, ctx?: PostCtx): Promise<FullPost | null>;
  getOneWithException(query: PostQuery, ctx?: PostCtx): Promise<FullPost>;
  update(query: PostQuery, body: UpdatePost, ctx?: PostCtx): Promise<FullPost>;
}
