import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MessageBus, ValidationManager } from '#source';
import type { JsonObject } from '#source/types';

describe('Event Broadcasting', () => {
  let messageBus: MessageBus<{}, Record<string, JsonObject>>;
  let validationManager: ValidationManager;

  beforeEach(() => {
    validationManager = new ValidationManager();
    messageBus = new MessageBus<{}, Record<string, JsonObject>>({ validator: validationManager });
  });

  afterEach(() => {
    messageBus.cleanup();
  });

  describe('Event Basics', () => {
    it('should be fire-and-forget', () => {
      interface TestEvents {
        TestEvent: { data: string };
      }

      const bus = new MessageBus<{}, TestEvents>();
      const listener = vi.fn();

      bus.listenToEvent('TestEvent', listener);
      bus.publishEvent('TestEvent', { data: 'test' });

      expect(listener).toHaveBeenCalledWith({ data: 'test' });
    });

    it('should validate event payload', () => {
      interface TestEvents {
        TestEvent: { data: string };
      }

      const validator = new ValidationManager();
      validator.register('event/TestEvent', {
        validate: (data): data is { data: string } => {
          return (
            typeof data === 'object' &&
            data !== null &&
            typeof (data as any).data === 'string'
          );
        },
      });

      const bus = new MessageBus<{}, TestEvents>({ validator });
      const listener = vi.fn();

      bus.listenToEvent('TestEvent', listener);
      expect(() => {
        bus.publishEvent('TestEvent', { data: 123 as any });
      }).toThrow('Validation failed');
      expect(listener).not.toHaveBeenCalled();
    });

    it('should allow multiple listeners', () => {
      interface TestEvents {
        TestEvent: { data: string };
      }

      const bus = new MessageBus<{}, TestEvents>();
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      bus.listenToEvent('TestEvent', listener1);
      bus.listenToEvent('TestEvent', listener2);
      bus.publishEvent('TestEvent', { data: 'test' });

      expect(listener1).toHaveBeenCalledWith({ data: 'test' });
      expect(listener2).toHaveBeenCalledWith({ data: 'test' });
    });

    it('should handle listener cleanup', () => {
      interface TestEvents {
        TestEvent: { data: string };
      }

      const bus = new MessageBus<{}, TestEvents>();
      const listener = vi.fn();

      const cleanup = bus.listenToEvent('TestEvent', listener);
      bus.publishEvent('TestEvent', { data: 'test1' });
      cleanup();
      bus.publishEvent('TestEvent', { data: 'test2' });

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith({ data: 'test1' });
    });

    it('should batch events', async () => {
      interface TestEvents {
        TestEvent: { data: string };
      }

      vi.useFakeTimers();

      const bus = new MessageBus<{}, TestEvents>({
        batchSize: 2,
        batchTimeout: 100,
      });
      const listener = vi.fn();

      bus.listenToEvent('TestEvent', listener);
      bus.publishEvent('TestEvent', { data: 'test1' });
      bus.publishEvent('TestEvent', { data: 'test2' });

      await vi.advanceTimersByTimeAsync(150);

      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toHaveBeenNthCalledWith(1, { data: 'test1' });
      expect(listener).toHaveBeenNthCalledWith(2, { data: 'test2' });

      vi.useRealTimers();
    });

    it('should respect max listeners limit', () => {
      interface TestEvents {
        TestEvent: { data: string };
      }

      const bus = new MessageBus<{}, TestEvents>({
        maxListenersPerEvent: 2,
      });

      bus.listenToEvent('TestEvent', () => {});
      bus.listenToEvent('TestEvent', () => {});

      expect(() => {
        bus.listenToEvent('TestEvent', () => {});
      }).toThrow('Maximum number of listeners exceeded');
    });
  });

  describe('Event Handling', () => {
    it('should filter events by type', () => {
      interface TestEvents {
        Event1: { data: string };
        Event2: { data: number };
      }

      const bus = new MessageBus<{}, TestEvents>();
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      bus.listenToEvent('Event1', listener1);
      bus.listenToEvent('Event2', listener2);

      bus.publishEvent('Event1', { data: 'test' });
      bus.publishEvent('Event2', { data: 123 });

      expect(listener1).toHaveBeenCalledWith({ data: 'test' });
      expect(listener1).not.toHaveBeenCalledWith({ data: 123 });
      expect(listener2).toHaveBeenCalledWith({ data: 123 });
      expect(listener2).not.toHaveBeenCalledWith({ data: 'test' });
    });

    it('should handle errors in event listeners gracefully', () => {
      interface TestEvents {
        TestEvent: { data: string };
      }

      const bus = new MessageBus<{}, TestEvents>();
      const errorListener = vi.fn(() => {
        throw new Error('Listener error');
      });
      const normalListener = vi.fn();

      bus.listenToEvent('TestEvent', errorListener);
      bus.listenToEvent('TestEvent', normalListener);

      // Should not throw and should continue processing other listeners
      expect(() => {
        bus.publishEvent('TestEvent', { data: 'test' });
      }).not.toThrow();

      expect(errorListener).toHaveBeenCalled();
      expect(normalListener).toHaveBeenCalled();
    });

    it('should maintain event order', () => {
      interface TestEvents {
        TestEvent: { sequence: number };
      }

      const bus = new MessageBus<{}, TestEvents>();
      const receivedSequence: number[] = [];

      bus.listenToEvent('TestEvent', (event) => {
        receivedSequence.push(event.sequence);
      });

      // Publish events rapidly
      for (let i = 0; i < 5; i++) {
        bus.publishEvent('TestEvent', { sequence: i });
      }

      // Check order after all events are processed
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(receivedSequence).toEqual([0, 1, 2, 3, 4]);
          resolve();
        }, 100);
      });
    });

    it('should handle one-time event listeners', () => {
      interface TestEvents {
        TestEvent: { data: string };
      }

      const bus = new MessageBus<{}, TestEvents>();
      const listener = vi.fn();

      // Create a one-time listener using cleanup
      const cleanup = bus.listenToEvent('TestEvent', (data) => {
        listener(data);
        cleanup();
      });

      bus.publishEvent('TestEvent', { data: 'first' });
      bus.publishEvent('TestEvent', { data: 'second' });

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith({ data: 'first' });
    });

    it('should validate complex event payloads', () => {
      interface TestEvents {
        ComplexEvent: {
          id: string;
          data: {
            items: Array<{ name: string; value: number }>;
            metadata: {
              timestamp: number;
              source: string;
            };
          };
        };
      }

      const validator = new ValidationManager();
      validator.register('event/ComplexEvent', {
        validate: (data): data is TestEvents['ComplexEvent'] => {
          const d = data as any;
          return (
            typeof d === 'object' &&
            typeof d.id === 'string' &&
            typeof d.data === 'object' &&
            Array.isArray(d.data.items) &&
            d.data.items.every(
              (item: any) =>
                typeof item === 'object' &&
                typeof item.name === 'string' &&
                typeof item.value === 'number',
            ) &&
            typeof d.data.metadata === 'object' &&
            typeof d.data.metadata.timestamp === 'number' &&
            typeof d.data.metadata.source === 'string'
          );
        },
      });

      const bus = new MessageBus<{}, TestEvents>({ validator });
      const listener = vi.fn();

      bus.listenToEvent('ComplexEvent', listener);

      // Valid complex payload
      const validPayload = {
        id: '123',
        data: {
          items: [
            { name: 'item1', value: 10 },
            { name: 'item2', value: 20 },
          ],
          metadata: {
            timestamp: Date.now(),
            source: 'test',
          },
        },
      };
      bus.publishEvent('ComplexEvent', validPayload);
      expect(listener).toHaveBeenCalledWith(validPayload);

      // Invalid complex payload
      const invalidPayload = {
        id: '123',
        data: {
          items: [
            { name: 'item1', value: '10' }, // Invalid value type
          ],
          metadata: {
            timestamp: Date.now(),
            source: 'test',
          },
        },
      };
      expect(() => {
        bus.publishEvent('ComplexEvent', invalidPayload as any);
      }).toThrow('Validation failed');
      expect(listener).toHaveBeenCalledTimes(1); // Should not be called with invalid payload
    });
  });
});
