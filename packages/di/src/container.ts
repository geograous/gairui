/**
 * container
 */
export type Newable<T> = new (...args: any[]) => T;

type Identifier = string

enum InjectType {
  Singleton = 'singleton',
  Multiton = 'multiton'
}

// sync/async, constructor/property/function, singleton/multiton
interface IInject<T = any> {
  instance: T
  factory: () => T
  provider: () => T
  id: Identifier
  type: Newable<T>
  async: boolean
  injectType: InjectType
}

type InjectIdentifier<T = any> = Identifier | Newable<T>

interface IContainer {
  getInstance: <T>(id: InjectIdentifier<T>) => T
  inject: <T>(param: IInject<T>) => T
  reject: <T>(id: InjectIdentifier<T>) => void
}

type PoolKey<T = any>  = Identifier | T

export class Container implements IContainer {
  private pool: WeakMap<any, IInject<unknown>> = new WeakMap()
  inject<T>(param: IInject<T>): T {
    if (this.pool.has(param.id)) {
      const poolItem = this.pool.get(param.id)
      
      // return this.pool.get(param.id).instance
    }

    this.pool.set(param.id, param)
    return param.instance
  }
  hasInjected<T>(id: InjectIdentifier<T>) {
    return this.pool.has(id)
  }
  reject<T>(id: InjectIdentifier<T>) {
    if (this.hasInjected(id)) {
      this.pool.delete(id)
    }
  }
  getInstance<T>(id: InjectIdentifier<T>) {
    if (this.hasInjected(id)) {
      return this.pool.get(id).instance as T
    }
    return
  }
}
