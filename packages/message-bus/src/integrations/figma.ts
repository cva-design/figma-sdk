import type { JsonObject } from 'type-fest';
import type { MessageBus } from '../MessageBus';
import type { FigmaEventMap } from '../types/figma-events';

// type ArgFreeEventType = keyof typeof FigmaEventTypes;

export class FigmaIntegration<
  Commands extends Record<string, JsonObject>,
  Events extends Record<string, JsonObject> & FigmaEventMap,
> {
  private cleanupFns: Array<() => void> = [];
  private messageBus: MessageBus<Commands, Events & FigmaEventMap>;
  private eventHandlers: Map<string, () => void> = new Map();

  constructor(messageBus: MessageBus<Commands, Events & FigmaEventMap>) {
    this.messageBus = messageBus;
  }

  /**
   * Initialize Figma event listeners
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
    // Remove all event listeners using stored handlers
    for (const [event, handler] of this.eventHandlers) {
      if (event.startsWith('ui:')) {
        figma.ui.off('message', handler);
      } else {
        figma.off(event as ArgFreeEventType, handler);
      }
    }
    this.eventHandlers.clear();
    this.cleanupFns = [];
  }

  /**
   * Set up a Figma event listener
   */
  private setupEventListener<E extends keyof Events>(
    figmaEvent: ArgFreeEventType,
    busEvent: E,
    payloadFactory: () => Events[E],
    isUIEvent = false,
  ): void {
    const handler = () => {
      try {
        const payload = payloadFactory();
        this.messageBus.publishEvent(busEvent, payload);
      } catch (error) {
        this.handleError(error);
      }
    };

    const eventKey = isUIEvent ? `ui:${figmaEvent}` : figmaEvent;

    if (isUIEvent) {
      figma.ui.on('message', handler);
    } else {
      figma.on(figmaEvent, handler);
    }

    this.eventHandlers.set(eventKey, handler);
    this.cleanupFns.push(() => {
      const storedHandler = this.eventHandlers.get(eventKey);
      if (storedHandler) {
        if (isUIEvent) {
          figma.ui.off('message', storedHandler);
        } else {
          figma.off(figmaEvent, storedHandler);
        }
        this.eventHandlers.delete(eventKey);
      }
    });
  }

  /**
   * Check if running in Figma context
   */
  static isFigmaContext(): boolean {
    return typeof figma !== 'undefined';
  }

  /**
   * Get current Figma context info
   */
  static getContextInfo(): Record<string, unknown> {
    if (!FigmaIntegration.isFigmaContext()) {
      return {};
    }

    return {
      mode: figma.mode,
      viewport: figma.viewport,
      currentPage: {
        id: figma.currentPage.id,
        name: figma.currentPage.name,
      },
      selection: figma.currentPage.selection.map((node) => ({
        id: node.id,
        type: node.type,
      })),
    };
  }

  /**
   * Handle errors
   */
  private handleError(error: unknown): void {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    this.messageBus.publishEvent(
      'Error' as keyof Events,
      {
        error: errorMessage,
      } as Events[keyof Events] & FigmaEventMap['Error'],
    );
  }

  private isValidMessage(
    event: unknown,
  ): event is { type: string; [key: string]: unknown } {
    if (typeof event !== 'object' || event === null) return false;
    const msg = event as { type?: unknown };
    return typeof msg.type === 'string';
  }

  private setupEventListeners(): void {
    // Set up a single message handler for all UI events
    const messageHandler = (event: {
      type: string;
      [key: string]: unknown;
    }) => {
      try {
        if (!this.isValidMessage(event)) {
          throw new Error('Invalid message format');
        }

        switch (event.type) {
          case 'run':
            this.messageBus.publishEvent(
              'PluginRun' as keyof Events,
              {
                command: (event.command as string) || '',
                parameters: (event.parameters as Record<string, unknown>) || {},
              } as Events[keyof Events] & FigmaEventMap['PluginRun'],
            );
            break;

          case 'close':
            this.messageBus.publishEvent(
              'PluginClose' as keyof Events,
              {} as Events[keyof Events] & FigmaEventMap['PluginClose'],
            );
            break;

          case 'timerstart':
            this.messageBus.publishEvent(
              'TimerStart' as keyof Events,
              {
                id: (event.id as string) || '',
              } as Events[keyof Events] & FigmaEventMap['TimerStart'],
            );
            break;

          case 'timerstop':
            this.messageBus.publishEvent(
              'TimerStop' as keyof Events,
              {
                id: (event.id as string) || '',
              } as Events[keyof Events] & FigmaEventMap['TimerStop'],
            );
            break;

          case 'timerpause':
            this.messageBus.publishEvent(
              'TimerPause' as keyof Events,
              {
                id: (event.id as string) || '',
              } as Events[keyof Events] & FigmaEventMap['TimerPause'],
            );
            break;

          case 'timerresume':
            this.messageBus.publishEvent(
              'TimerResume' as keyof Events,
              {
                id: (event.id as string) || '',
              } as Events[keyof Events] & FigmaEventMap['TimerResume'],
            );
            break;

          case 'visibility':
            this.messageBus.publishEvent(
              'UIVisibilityChanged' as keyof Events,
              {
                visible: Boolean(event.visible),
              } as Events[keyof Events] & FigmaEventMap['UIVisibilityChanged'],
            );
            break;

          case 'resize':
            this.messageBus.publishEvent(
              'UIResized' as keyof Events,
              {
                width: Number(event.width) || 0,
                height: Number(event.height) || 0,
              } as Events[keyof Events] & FigmaEventMap['UIResized'],
            );
            break;

          case 'command':
            this.messageBus.publishEvent(
              'CommandExecuted' as keyof Events,
              {
                command: (event.command as string) || '',
                parameters: (event.parameters as Record<string, unknown>) || {},
              } as Events[keyof Events] & FigmaEventMap['CommandExecuted'],
            );
            break;

          default:
            throw new Error(`Unknown message type: ${event.type}`);
        }
      } catch (error) {
        this.handleError(error);
      }
    };

    figma.ui.on('message', messageHandler);
    this.eventHandlers.set('ui:message', messageHandler as () => void);

    // Figma Events
    this.setupEventListener(
      'selectionchange',
      'SelectionChanged' as keyof Events,
      () =>
        ({
          nodes: figma.currentPage.selection.map((node) => ({
            id: node.id,
            type: node.type,
          })),
        }) as Events[keyof Events] & FigmaEventMap['SelectionChanged'],
    );

    // Handle viewport changes through the viewport property
    const handleViewportChange = () => {
      this.messageBus.publishEvent(
        'ViewportChanged' as keyof Events,
        {
          center: {
            x: figma.viewport.center.x,
            y: figma.viewport.center.y,
          },
          zoom: figma.viewport.zoom,
        } as Events[keyof Events] & FigmaEventMap['ViewportChanged'],
      );
    };

    figma.on('documentchange', handleViewportChange);
    this.eventHandlers.set(
      'documentchange',
      handleViewportChange as () => void,
    );

    this.setupEventListener(
      'currentpagechange',
      'ContextInitialized' as keyof Events,
      () =>
        ({
          viewport: {
            center: {
              x: figma.viewport.center.x,
              y: figma.viewport.center.y,
            },
            zoom: figma.viewport.zoom,
          },
          selection: figma.currentPage.selection.map((node) => ({
            id: node.id,
            type: node.type,
          })),
        }) as Events[keyof Events] & FigmaEventMap['ContextInitialized'],
    );

    // Initialize context
    this.messageBus.publishEvent(
      'ContextInitialized' as keyof Events,
      {
        viewport: {
          center: {
            x: figma.viewport.center.x,
            y: figma.viewport.center.y,
          },
          zoom: figma.viewport.zoom,
        },
        selection: figma.currentPage.selection.map((node) => ({
          id: node.id,
          type: node.type,
        })),
      } as Events[keyof Events] & FigmaEventMap['ContextInitialized'],
    );
  }
}
