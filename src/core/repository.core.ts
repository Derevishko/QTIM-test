import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

import { ServiceOptionToSqlAdapter } from '@common/adapter';
import { LoggerCtx } from '@common/enums';
import { OptionsType, QueryType, SqlContext } from '@common/types';

export class RepositoryCore<E extends ObjectLiteral = any> {
  protected readonly entity: EntityTarget<E>;
  protected readonly orm: Repository<E>;

  private readonly logger = new Logger(LoggerCtx.SQL);

  constructor(entity: EntityTarget<E>, dataSource: DataSource) {
    this.entity = entity;
    this.orm = dataSource.getRepository(entity);
  }

  async create(data: Partial<E>, ctx?: SqlContext<E>): Promise<E> {
    try {
      const manager = ctx?.manager || this.orm.manager;

      return await manager
        .createQueryBuilder()
        .insert()
        .into(ctx?.entity || this.entity)
        .values(data)
        .returning('*')
        .execute()
        .then((res) => res?.generatedMaps[0] as E);
    } catch (err) {
      this.handleError(err);
    }
  }

  async delete(query: QueryType<E>, ctx?: SqlContext<E>): Promise<void> {
    try {
      const manager = ctx?.manager || this.orm.manager;

      await manager.delete(ctx?.entity || this.entity, query);
    } catch (err) {
      this.handleError(err);
    }
  }

  async getCount(query: QueryType<E>, ctx?: SqlContext): Promise<number> {
    try {
      const entity = ctx?.entity || this.entity;
      const manager = ctx?.manager || this.orm.manager;

      const res = await manager.count(
        entity,
        new ServiceOptionToSqlAdapter<E>({ query }),
      );

      return res;
    } catch (err) {
      this.handleError(err);
    }
  }

  async getList(options: OptionsType<E>, ctx?: SqlContext): Promise<E[]> {
    try {
      const entity = ctx?.entity || this.entity;
      const manager = ctx?.manager || this.orm.manager;

      // TODO: add adapter
      const res = await manager.find<E>(
        entity,
        new ServiceOptionToSqlAdapter<E>(options),
      );

      return res;
    } catch (err) {
      this.handleError(err);
    }
  }

  async getListAndCount(
    options: OptionsType<E>,
    ctx?: SqlContext,
  ): Promise<[E[], number]> {
    try {
      const entity = ctx?.entity || this.entity;
      const manager = ctx?.manager || this.orm.manager;

      const res = await manager.findAndCount<E>(
        entity,
        new ServiceOptionToSqlAdapter<E>(options),
      );

      return res;
    } catch (err) {
      this.handleError(err);
    }
  }

  async getOne(query: QueryType<E>, ctx?: SqlContext): Promise<E | null> {
    try {
      const entity = ctx?.entity || this.entity;
      const manager = ctx?.manager || this.orm.manager;

      const res = await manager.findOne<E>(
        entity,
        new ServiceOptionToSqlAdapter<E>({ query }),
      );

      return res;
    } catch (err) {
      this.handleError(err);
    }
  }

  async getOneWithException(query: QueryType<E>, ctx?: SqlContext): Promise<E> {
    try {
      const entity = ctx?.entity || this.entity;
      const manager = ctx?.manager || this.orm.manager;

      const res = await manager.findOneOrFail<E>(
        entity,
        new ServiceOptionToSqlAdapter<E>({ query }),
      );

      return res;
    } catch (err) {
      this.handleError(err);
    }
  }

  async update(
    query: QueryType<E>,
    data: Partial<E>,
    ctx?: SqlContext,
  ): Promise<void> {
    try {
      const manager = ctx?.manager || this.orm.manager;

      await manager.update(ctx?.entity || this.entity, query, data);
    } catch (err) {
      this.handleError(err);
    }
  }

  protected handleError(err: unknown): never {
    console.log(err);
    if (
      (err as Error)?.name === 'EntityNotFound' ||
      (err as Error)?.name === 'EntityNotFoundError'
    ) {
      throw new NotFoundException();
    }

    this.logger.error('DB query error', {
      err,
    });

    throw new InternalServerErrorException();
  }
}
