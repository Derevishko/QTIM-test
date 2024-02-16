import { LIMIT_ITEM, MAX_LIMIT_ITEM } from '@common/constants';

import { StringUtil } from './string.util';

export class PageUtil {
  static getLimit(limit?: any): number {
    const queryLimit =
      StringUtil.isNumber(limit) && Number(limit) > 0
        ? Number(limit)
        : LIMIT_ITEM;

    return queryLimit > MAX_LIMIT_ITEM ? MAX_LIMIT_ITEM : queryLimit;
  }

  static getOffset(page: number, limit: number) {
    const offset = (page - 1) * limit;

    return offset > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : offset;
  }

  static getPage(page?: any): number {
    return (StringUtil.isNumber(page) && Number(page)) || 1;
  }
}
