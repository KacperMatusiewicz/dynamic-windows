export function ViewOperation(): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {

    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {

      setTimeout( ()=> {
        const result = originalMethod.apply(this, args);
        return result;
        }, 0);

    };

    return descriptor;
  };
}
