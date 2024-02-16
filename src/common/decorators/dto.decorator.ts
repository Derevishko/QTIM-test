import { SetMetadata } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

import { DTO_KEY } from '../constants';

export const Dto = (arg: ClassConstructor<unknown>) =>
  SetMetadata(DTO_KEY, arg);
