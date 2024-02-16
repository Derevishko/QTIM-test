import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClassConstructor } from 'class-transformer';
import { map } from 'rxjs/operators';

import { MappingUtil } from '@utils/mapping.util';

import { DTO_KEY } from '../constants';
import { PageDto, PageMetaDto, PageOptionDto } from '../dto';

@Injectable()
export class ResponseToDtoInterceptor<
  I,
  O,
  T extends { data: I | I[] } & {
    itemCount?: number;
    pagination?: PageOptionDto;
  },
> implements NestInterceptor<T, O | O[] | PageDto<O>>
{
  constructor(private reflector: Reflector) {}

  intercept(ctx: ExecutionContext, next: CallHandler) {
    const cls = this.getDto(ctx);

    return cls
      ? next.handle().pipe(
          map<T, O | O[] | PageDto<O>>(({ data, pagination, itemCount }) => {
            const result = MappingUtil.toDto(data, { cls });

            if (pagination && Array.isArray(result)) {
              const meta = new PageMetaDto(pagination, itemCount ?? 0);

              return new PageDto(result, meta);
            }

            return result;
          }),
        )
      : next.handle();
  }

  private getDto(ctx: ExecutionContext) {
    return this.reflector.getAllAndOverride<ClassConstructor<O>>(DTO_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
  }
}
