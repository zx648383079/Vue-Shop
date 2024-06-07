import { getCurrentInstance, inject, type App } from "vue";

export class GlobalSingleton {
    private items: {
        [key: string]: any
    } = {};

    public has(key: Symbol | string): boolean {
        return Object.prototype.hasOwnProperty.call(this.items, key.toString());
    }

    public inject<T>(key: Symbol | string, defFn: () => T): T;
    public inject<T>(key: Symbol | string, def: T): T;
    public inject<T>(key: Symbol | string, def: T | (() => T)): T  {
        let instance = getCurrentInstance() ? inject<T>(key, undefined as any) : undefined;
        if (instance) {
            return instance;
        }
        instance = this.items[key.toString()];
        if (instance) {
            return instance;
        }
        instance = typeof def === 'function' ? (def as Function)() : def;
        this.provide(key, instance);
        return instance as T;
    }

    public provide<T>(key: Symbol | string, value: T): this;
    public provide<T>(key: Symbol | string, value: T, app: App): this;
    public provide<T>(key: Symbol | string, value: T, app?: App): this {
        if (app) {
            app.provide<T>(key, value);
        }
        this.items[key.toString()] = value;
        console.log(this);
        
        return this;
    }
}

export const globalSingleton = new GlobalSingleton();