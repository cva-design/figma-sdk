import type { JsonObject } from 'type-fest';

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
 * Validation error type
 */
export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
}

/**
 * Command handler function type
 */
export type Handler<
  T extends Record<string, JsonObject>,
  Scope extends string = '',
> = <K extends keyof T>(
  payload: T[K],
  scope?: Scope,
) => Promise<Accepted | Rejected>;

/**
 * Event listener function type
 */
export type Listener<
  T extends Record<string, JsonObject>,
  Scope extends string = '',
> = <K extends keyof T>(payload: T[K], scope?: Scope) => void;

/**
 * Function to deregister a handler or listener
 */
export type DeregisterFn = () => void;
