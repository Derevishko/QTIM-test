import { OptionsType, QueryCtx, QueryType } from '@common/types';

import { IPost } from './interface';

export type Post = IPost;
export type FullPost = IdObject & Post & DateInfo;
export type CreatePost = Pick<Post, 'title' | 'description' | 'authorId'>;
export type UpdatePost = Partial<CreatePost>;
export type PostQuery = QueryType<FullPost>;
export type PostOptions = OptionsType<FullPost>;
export type PostCtx = QueryCtx<FullPost>;
