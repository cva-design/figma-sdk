import type { JsonObject } from 'type-fest';
import type { MessageBus } from '../MessageBus';
import type { FigmaEventMap } from '../types/figma-events';

export class PluginUIIntegration<
  Commands extends Record<string, JsonObject>,
  Events extends Record<string, JsonObject> & FigmaEventMap,
> {
  private eventHandlers: Map<string, (event: unknown) => void> = new Map();
  private errorHandlers: Set<(error: Error) => void> = new Set();
  private visibilityHandlers: Set<(visible: boolean) => void> = new Set();
  private resizeHandlers: Set<
    (dimensions: { width: number; height: number }) => void
  > = new Set();
  private messageHandlers: Set<(message: unknown) => void> = new Set();

  constructor(
    private readonly messageBus: MessageBus<Commands, Events & FigmaEventMap>,
  ) {
    // Subscribe to message bus events that need to be forwarded to the UI
    this.messageBus.listenToEvent('Error' as keyof Events, (event) => {
      this.handleError(new Error((event as { error: string }).error));
    });
  }

  /**
   * Initialize UI event listeners
   */
  initialize(): void {
    try {
      this.setupEventListeners();
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Clean up all event listeners
   */
  cleanup(): void {
    this.eventHandlers.clear();
    this.errorHandlers.clear();
    this.visibilityHandlers.clear();
    this.resizeHandlers.clear();
    this.messageHandlers.clear();
  }

  /**
   * Send a message to the UI
   */
  sendToUI(message: unknown): void {
    try {
      window.parent.postMessage({ pluginMessage: message }, '*');
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Register a handler for UI messages
   */
  onUIMessage(handler: (message: unknown) => void): void {
    this.messageHandlers.add(handler);
  }

  /**
   * Register a handler for UI visibility changes
   */
  onVisibilityChange(handler: (visible: boolean) => void): void {
    this.visibilityHandlers.add(handler);
  }

  /**
   * Register a handler for UI resize events
   */
  onResize(
    handler: (dimensions: { width: number; height: number }) => void,
  ): void {
    this.resizeHandlers.add(handler);
  }

  /**
   * Register a handler for errors
   */
  onError(handler: (error: Error) => void): void {
    this.errorHandlers.add(handler);
  }

  private setupEventListeners(): void {
    window.onmessage = (event: MessageEvent) => {
      try {
        const { data } = event;
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid message format');
        }

        if (!('type' in data)) {
          throw new Error('Missing message type');
        }

        switch (data.type) {
          case 'visibility':
            this.handleVisibilityChange(data);
            break;
          case 'resize':
            this.handleResize(data);
            break;
          default:
            this.handleMessage(data);
        }
      } catch (error) {
        this.handleError(error);
      }
    };
  }

  private handleVisibilityChange(data: { visible: boolean }): void {
    for (const handler of this.visibilityHandlers) {
      try {
        handler(data.visible);
      } catch (error) {
        this.handleError(error);
      }
    }
  }

  private handleResize(data: { width: number; height: number }): void {
    for (const handler of this.resizeHandlers) {
      try {
        handler({ width: data.width, height: data.height });
      } catch (error) {
        this.handleError(error);
      }
    }
  }

  private handleMessage(data: unknown): void {
    for (const handler of this.messageHandlers) {
      try {
        handler(data);
      } catch (error) {
        this.handleError(error);
      }
    }
  }

  private handleError(error: Error | unknown): void {
    const errorObj =
      error instanceof Error ? error : new Error('Unknown error');
    for (const handler of this.errorHandlers) {
      try {
        handler(errorObj);
      } catch (innerError) {
        console.error('Error in error handler:', innerError);
      }
    }
  }
}
