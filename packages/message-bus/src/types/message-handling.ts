import type { ValidationError } from './validation';

/**
 * Command accepted response
 */
export interface Accepted {
  status: 'accepted';
  message?: string;
  data?: unknown;
}

/**
 * Command rejected response
 */
export interface Rejected {
  status: 'rejected';
  message?: string;
  errors: [ValidationError, ...ValidationError[]];
}

/**
 * Command handler function type
 */
export type Handler<
  T extends CommandsDefinition<any>,
  Scope extends string = '',
> = <K extends keyof T>(
  payload: T[K],
  scope?: Scope,
) => Promise<Accepted | Rejected>;

/**
 * Event listener function type
 */
export type Listener<
  T extends EventsDefinition<any>,
  Scope extends string = '',
> = <K extends keyof T>(payload: T[K], scope?: Scope) => void;

/**
 * Function to deregister a handler or listener
 */
export type DeregisterFn = () => void;

export type CommandsDefinition<T> = { [K in keyof T]: unknown };
export type EventsDefinition<T> = { [K in keyof T]: unknown };
