import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class QueryPipe implements PipeTransform {
  transform<T extends QueryPayload>({ filter, search }: T) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return { ...filter, ...(search && { search }) };
  }
}
