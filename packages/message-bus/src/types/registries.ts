import type { JsonObject } from 'type-fest';
import type { Handler, Listener } from './message-handling';

/**
 * Command Handlers registry type
 */
export type HandlersRegistry<
  T extends Record<string, JsonObject>,
  Scope extends string = '',
> = {
  [K in keyof T]: Handler<T, Scope>;
};

/**
 * Event Listeners registry type
 */
export type ListenersRegistry<
  T extends Record<string, JsonObject>,
  Scope extends string = '',
> = {
  [K in keyof T]: Set<Listener<T, Scope>>;
};
