export class DecoratorUtil {
  static apply(
    ...decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator>
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return <TFunction extends Function, Y>(
      target: TFunction | object,
      propertyKey?: string | symbol,
      descriptor?: TypedPropertyDescriptor<Y>,
    ) => {
      for (const decorator of decorators) {
        if (target instanceof Function && !descriptor) {
          (decorator as ClassDecorator)(target);
          continue;
        }

        if (propertyKey && !descriptor) {
          (decorator as PropertyDecorator)(target, propertyKey);
        }

        if (propertyKey && descriptor) {
          (decorator as MethodDecorator)(target, propertyKey, descriptor);
        }
      }
    };
  }
}
