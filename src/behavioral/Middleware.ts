/**
 * Design a pipeline of functions that can modify or augment incoming data before it reaches the target function
 */

interface MathsArgs {
  a: number;
  b: number;
}

export class Maths {
  add({ a, b }: MathsArgs) {
    return a + b;
  }

  subtract({ a, b }: MathsArgs) {
    return a - b;
  }

  multiply({ a, b }: MathsArgs) {
    return a * b;
  }
}

type MiddlewareFunc = (args: MathsArgs, executeMiddleware: () => void) => void;

export class Middleware {
  private prototype: Record<string, (args: MathsArgs) => number>;
  private middlewares: MiddlewareFunc[] = [];
  private req?: MathsArgs;

  constructor(private target: Maths) {
    this.prototype = Object.getPrototypeOf(target);
    Object.getOwnPropertyNames(this.prototype).forEach(name => {
      if (name !== 'constructor') this.wrapTargetMethod(name);
    });
  }

  use(middleware: MiddlewareFunc) {
    this.middlewares.push(middleware);
  }

  private executeMiddleware(i = 0) {
    if (i < this.middlewares.length) {
      this.middlewares[i](this.req as MathsArgs, () =>
        this.executeMiddleware(i + 1)
      );
    }
  }

  private wrapTargetMethod(name: string) {
    const originalMethod = this.prototype[name];
    this.prototype[name] = (args: MathsArgs) => {
      this.req = args;
      this.executeMiddleware();
      return originalMethod.call(this.target, this.req);
    };
  }
}
