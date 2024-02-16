import { ClassConstructor, ClassTransformOptions } from 'class-transformer';

export type MappingParams<C> = {
  cls: ClassConstructor<C>;
  options?: ClassTransformOptions;
};
