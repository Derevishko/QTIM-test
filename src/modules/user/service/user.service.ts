import { ServiceCore } from '@core/service.core';

import { IUserRepository } from '../interface';
import { CreateUser, FullUser, UpdateUser, UserQuery } from '../user.type';

export class UserService extends ServiceCore {
  constructor(protected readonly repository: IUserRepository) {
    super();
  }

  async create(data: CreateUser): Promise<FullUser> {
    const res = await this.repository.create(data);

    return res;
  }

  async delete(query: UserQuery): Promise<void> {
    await this.repository.delete(query);
  }

  async getCount(query: UserQuery): Promise<number> {
    const res = await this.repository.getCount(query);

    return res;
  }

  async getList(query: UserQuery): Promise<FullUser[]> {
    const res = await this.repository.getList({ query });

    return res;
  }

  async getListAndCount(query: UserQuery): Promise<[FullUser[], number]> {
    const res = await this.repository.getListAndCount({ query });

    return res;
  }

  async getOne(query: UserQuery): Promise<FullUser | null> {
    const res = await this.repository.getOne(query);

    return res;
  }

  async getOneWithException(query: UserQuery): Promise<FullUser> {
    const res = await this.repository.getOneWithException(query);

    return res;
  }

  async update(query: UserQuery, data: UpdateUser): Promise<FullUser> {
    const { id } = await this.repository.getOneWithException(query);

    await this.repository.update(query, data);

    const res = await this.repository.getOneWithException({
      id,
    } as UserQuery);

    return res;
  }
}
