import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import type { Request as RequestType } from 'express';

import { OptionsType } from '@common/types';

export const SortQuery = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const { query } = ctx.switchToHttp().getRequest<RequestType>();

    return query?.sort as OptionsType['sort'];
  },
);
