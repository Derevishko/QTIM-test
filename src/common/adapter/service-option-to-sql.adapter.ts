import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  In,
} from 'typeorm';

import { OptionsType } from '@common/types';

// TODO: like
// TODO: range
export class ServiceOptionToSqlAdapter<T extends object>
  implements FindManyOptions<T>
{
  public order: FindOptionsOrder<T>;
  public skip?: number;
  public take?: number;
  public where: FindOptionsWhere<T>;

  constructor(options: OptionsType<T>) {
    const { query, sort, page, limit } = options;

    this.where = this.mapWhere(query);
    this.order = sort as FindOptionsOrder<T>;
    this.skip = page && limit && (page - 1) * limit;
    this.take = limit;
  }

  private mapWhere(query?: Record<string, any>) {
    const res: FindOptionsWhere<T> = {};

    if (query) {
      for (const [key, value] of Object.entries(query)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        res[key] = Array.isArray(value) ? In(value) : value;
      }
    }

    return res;
  }
}
