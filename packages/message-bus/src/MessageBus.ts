import type { JsonObject } from 'type-fest';
import type { ValidationManager } from './ValidationManager';
import type { Accepted, Rejected } from './types/message-handling';
import type { Handler, Listener } from './types/message-handling';
import { deepClone } from './utils/serialization';

/**
 * Options for creating a MessageBus instance
 */
export interface MessageBusOptions {
  /**
   * Validation manager instance
   */
  validator?: ValidationManager;

  /**
   * Maximum number of listeners per event
   */
  maxListenersPerEvent?: number;

  /**
   * Batch size for event processing
   */
  batchSize?: number;

  /**
   * Batch timeout in milliseconds
   */
  batchTimeout?: number;
}

/**
 * Core message bus implementation
 */
export class MessageBus<
  Commands extends Record<string, JsonObject>,
  Events extends Record<string, JsonObject>,
> {
  private commandHandlers = new Map<
    keyof Commands,
    Handler<Commands, string>
  >();
  private eventListeners = new Map<
    keyof Events,
    Set<Listener<Events, string>>
  >();
  private validator?: ValidationManager;
  private maxListenersPerEvent: number;
  private eventBatches = new Map<
    keyof Events,
    { events: Events[keyof Events][]; timer: NodeJS.Timeout }
  >();

  constructor(options: MessageBusOptions = {}) {
    this.validator = options.validator;
    this.maxListenersPerEvent = options.maxListenersPerEvent ?? 100;
  }

  /**
   * Register a command handler
   */
  handleCommand<K extends keyof Commands>(
    name: K,
    handler: Handler<Commands, string>,
  ): void {
    this.commandHandlers.set(name, handler);
  }

  /**
   * Unregister a command handler
   */
  unregisterCommand(name: keyof Commands): void {
    this.commandHandlers.delete(name);
  }

  /**
   * Register an event listener
   */
  listenToEvent<K extends keyof Events>(
    name: K,
    listener: Listener<Events, string>,
  ): () => void {
    let listeners = this.eventListeners.get(name);
    if (!listeners) {
      listeners = new Set();
      this.eventListeners.set(name, listeners);
    }

    if (listeners.size >= this.maxListenersPerEvent) {
      throw new Error('Maximum number of listeners exceeded');
    }

    listeners.add(listener);

    // Return cleanup function
    return () => {
      const listenerSet = this.eventListeners.get(name);
      if (listenerSet) {
        listenerSet.delete(listener);
        if (listenerSet.size === 0) {
          this.eventListeners.delete(name);
        }
      }
    };
  }

  /**
   * Send a command
   */
  async sendCommand<K extends keyof Commands>(
    name: K,
    payload: Commands[K],
    scope?: string,
  ): Promise<Accepted | Rejected> {
    const handler = this.commandHandlers.get(name);
    if (!handler) {
      return {
        status: 'rejected',
        message: `No handler registered for command: ${String(name)}`,
        errors: [
          {
            field: '',
            message: 'Command handler not found',
          },
        ],
      };
    }

    // Validate command payload if validation manager is available
    if (this.validator) {
      const result = this.validator.validate(
        `command/${String(name)}`,
        payload,
      );
      if (!result.success) {
        return {
          status: 'rejected',
          message: result.errors?.[0]?.message || 'Invalid command parameters',
          errors: result.errors || [
            {
              field: '',
              message: 'Invalid command parameters',
            },
          ],
        };
      }
    }

    try {
      // Clone payload to prevent mutations
      const clonedPayload = deepClone(payload);
      return await handler.call(null, clonedPayload);
    } catch (error) {
      const isValidationError =
        error instanceof Error &&
        (error.message === 'Invalid command parameters' ||
          error.message === 'Type validation failed' ||
          error.message.includes('validation'));

      return {
        status: 'rejected',
        message: error instanceof Error ? error.message : 'Unknown error',
        errors: [
          {
            field: '',
            message: isValidationError
              ? 'Invalid command parameters'
              : 'Command handler error',
          },
        ],
      };
    }
  }

  /**
   * Publish an event
   */
  publishEvent<K extends keyof Events>(
    name: K,
    payload: Events[K],
    scope?: string,
  ): void {
    const listeners = this.eventListeners.get(name);
    if (!listeners) return;

    // Validate event payload if validation manager is available
    if (this.validator) {
      const result = this.validator.validate(`event/${String(name)}`, payload);
      if (!result.success) {
        const error = new Error(
          result.errors?.[0]?.message || 'Event validation failed',
        );
        error.name = 'ValidationError';
        throw error;
      }
    }

    // Clone payload to prevent mutations
    const clonedPayload = deepClone(payload);

    // Notify all listeners
    for (const listener of listeners) {
      try {
        // Call the listener with the payload as the first argument
        listener.call(null, clonedPayload);
      } catch (error) {
        console.error('Event listener error:', error);
      }
    }
  }

  /**
   * Clean up all handlers and listeners
   */
  cleanup(): void {
    this.commandHandlers.clear();
    this.eventListeners.clear();
    for (const batch of this.eventBatches.values()) {
      clearTimeout(batch.timer);
    }
    this.eventBatches.clear();
  }
}
