import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import type { Request as RequestType } from 'express';

import { UNLIMIT_PAGE } from '@common/constants';
import { PageUtil } from '@utils/page.util';

export const PageQuery = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const { query } = ctx.switchToHttp().getRequest<RequestType>();
    let page = PageUtil.getPage(query?.page);

    if (page === UNLIMIT_PAGE) {
      return { offset: 0, page: 0, limit: 0 };
    }

    const limit = PageUtil.getLimit(query?.limit);

    page = page > 0 ? page : 1;

    return {
      offset: PageUtil.getOffset(page, limit),
      page,
      limit,
    };
  },
);
