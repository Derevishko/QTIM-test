import { FindManyOptions } from 'typeorm';

import { OptionsType } from '@common/types';

export class ServiceOptionToSqlAdapter<T extends object>
  implements FindManyOptions<T>
{
  constructor(options: OptionsType<T>) {
    const { query, sort, page, limit } = options;

    const res: FindManyOptions = {};

    res.where = query;
    res.order = sort;
    res.skip = page && limit && (page - 1) * limit;
    res.take = limit;

    return res;
  }
}
