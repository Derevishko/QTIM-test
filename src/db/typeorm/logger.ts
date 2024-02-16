import { Logger as NestLogger } from '@nestjs/common';
import { Logger as TypeOrmLogger } from 'typeorm';

import { LoggerCtx } from '@common/enums';

export class Logger implements TypeOrmLogger {
  private readonly logger = new NestLogger(LoggerCtx.SQL);

  log(level: 'log' | 'info' | 'warn', message: string) {
    const name = 'DB log';

    if (level === 'log') {
      return this.logger.log(name, { message });
    }
    if (level === 'info') {
      return this.logger.debug(name, { message });
    }
    if (level === 'warn') {
      return this.logger.warn(name, { message });
    }
  }

  logMigration(query: string) {
    this.logger.log('DB migration', { query });
  }

  logQuery(query: string, parameters?: unknown[]) {
    this.logger.log('DB query', {
      query,
      parameters,
    });
  }

  logQueryError(err: string, query: string, parameters?: unknown[]) {
    this.logger.error('DB query error', {
      err,
      query,
      parameters,
    });
  }

  logQuerySlow(time: number, query: string, parameters?: unknown[]) {
    this.logger.warn(`DB slow query took ${time} ms`, {
      query,
      parameters,
    });
  }

  logSchemaBuild(query: string) {
    this.logger.log('DB schema', { query });
  }
}
