import { ServiceCore } from '@core/service.core';

import { IPostRepository, IPostService } from '../interface';
import { CreatePost, FullPost, PostQuery, UpdatePost } from '../post.type';

export class PostService extends ServiceCore implements IPostService {
  constructor(protected readonly repository: IPostRepository) {
    super();
  }

  async create(data: CreatePost): Promise<FullPost> {
    const res = await this.repository.create(data);

    return res;
  }

  async delete(query: PostQuery): Promise<void> {
    await this.repository.delete(query);
  }

  async getCount(query: PostQuery): Promise<number> {
    const res = await this.repository.getCount(query);

    return res;
  }

  async getList(query: PostQuery): Promise<FullPost[]> {
    const res = await this.repository.getList({ query });

    return res;
  }

  async getListAndCount(query: PostQuery): Promise<[FullPost[], number]> {
    const res = await this.repository.getListAndCount({ query });

    return res;
  }

  async getOne(query: PostQuery): Promise<FullPost | null> {
    const res = await this.repository.getOne(query);

    return res;
  }

  async getOneWithException(query: PostQuery): Promise<FullPost> {
    const res = await this.repository.getOneWithException(query);

    return res;
  }

  async update(query: PostQuery, data: UpdatePost): Promise<FullPost> {
    const { id } = await this.repository.getOneWithException(query);

    await this.repository.update(query, data);

    const res = await this.repository.getOneWithException({
      id,
    } as PostQuery);

    return res;
  }
}
