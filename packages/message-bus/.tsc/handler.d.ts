export type EventHandler = {
    name: string;
    handler: (...args: unknown[]) => void;
};
/**
 * Registers an event `handler` for the given event `name`.
 *
 * @returns Returns a function for deregistering the `handler`.
 * @category Events
 */
export declare function on<Handler extends EventHandler>(name: Handler['name'], handler: Handler['handler']): () => void;
/**
 * Registers an event `handler` that will run at most once for the given
 * event `name`.
 *
 * @returns Returns a function for deregistering the `handler`.
 * @category Events
 */
export declare function once<Handler extends EventHandler>(name: Handler['name'], handler: Handler['handler']): () => void;
/**
 * Calling `emit` in the [main context](https://figma.com/plugin-docs/how-plugins-run/) invokes the event
 * handler for the matching event `name` in your UI. Correspondingly, calling
 * `emit` in your UI invokes the event handler for the matching event `name`
 * in the main context.
 *
 * All `args` passed after `name` will be directly
 * [applied](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
 * on the event handler.
 *
 * See the [recipe for passing data between the main and UI contexts](<%- query('page', 'recipes').url %>#passing-data-between-the-plugin-widgets-main-and-ui-contexts).
 *
 * @category Events
 */
export declare const emit: <Handler extends EventHandler>(name: Handler["name"], ...args: Parameters<Handler["handler"]>) => void;
export declare function invokeEventHandler(name: string, args: Array<unknown>): void;
//# sourceMappingURL=handler.d.ts.map