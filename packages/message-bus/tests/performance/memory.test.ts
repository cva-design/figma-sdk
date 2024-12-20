import { describe, expect, it } from 'vitest';
import { MessageBus } from '#source';
import { TestCommands, TestEvents, createMockListener } from '../utils';

describe('Memory Management', () => {
  describe('Cleanup', () => {
    it('should properly cleanup event listeners', () => {
      const bus = new MessageBus<TestCommands, TestEvents>();
      const listener = createMockListener();

      // Add and remove listener multiple times
      for (let i = 0; i < 100; i++) {
        const unsubscribe = bus.listenToEvent('TestEvent', listener);
        unsubscribe();
      }

      bus.publishEvent('TestEvent', { id: 'test', data: 'test' });
      expect(listener).not.toHaveBeenCalled();
    });

    it('should handle multiple unsubscriptions', () => {
      const bus = new MessageBus<TestCommands, TestEvents>();
      const listener = createMockListener();
      const unsubscribe = bus.listenToEvent('TestEvent', listener);

      // Unsubscribe multiple times (should not throw)
      unsubscribe();
      unsubscribe();
      unsubscribe();

      bus.publishEvent('TestEvent', { id: 'test', data: 'test' });
      expect(listener).not.toHaveBeenCalled();
    });

    it('should prevent memory leaks with dynamic listeners', () => {
      const bus = new MessageBus<TestCommands, TestEvents>();
      const listeners = new Set<ReturnType<typeof createMockListener>>();
      const maxListeners = 50; // Stay under the limit

      // Simulate adding and removing listeners dynamically
      for (let i = 0; i < maxListeners * 2; i++) {
        const listener = createMockListener();

        // Remove an existing listener if we're at max capacity
        if (listeners.size >= maxListeners) {
          const [firstListener] = listeners;
          if (firstListener) {
            const unsubscribe = bus.listenToEvent('TestEvent', firstListener);
            unsubscribe();
            listeners.delete(firstListener);
          }
        }

        listeners.add(listener);
        bus.listenToEvent('TestEvent', listener);
      }

      const testEvent = { id: 'test', data: 'test' };
      bus.publishEvent('TestEvent', testEvent);

      // Only remaining listeners should be called
      for (const listener of listeners) {
        expect(listener).toHaveBeenCalledWith(testEvent);
      }
    });
  });

  describe('Resource Disposal', () => {
    it('should handle resource disposal', () => {
      const bus = new MessageBus<TestCommands, TestEvents>();
      const listeners = Array(50)
        .fill(0)
        .map(() => createMockListener());
      const unsubscribes = listeners.map((listener) =>
        bus.listenToEvent('TestEvent', listener),
      );

      // Dispose all resources
      for (const unsubscribe of unsubscribes) {
        unsubscribe();
      }

      bus.publishEvent('TestEvent', { id: 'test', data: 'test' });
      for (const listener of listeners) {
        expect(listener).not.toHaveBeenCalled();
      }
    });

    it('should handle concurrent cleanup operations', async () => {
      const bus = new MessageBus<TestCommands, TestEvents>();
      const listeners = Array(50)
        .fill(0)
        .map(() => createMockListener());

      // Add listeners and get their unsubscribe functions
      const unsubscribes = listeners.map((listener) =>
        bus.listenToEvent('TestEvent', listener),
      );

      // Concurrently unsubscribe and publish events
      await Promise.all([
        ...unsubscribes.map((unsubscribe) =>
          Promise.resolve().then(unsubscribe),
        ),
        Promise.resolve().then(() =>
          bus.publishEvent('TestEvent', { id: 'test', data: 'test' }),
        ),
      ]);

      // Some listeners might have been called depending on the timing,
      // but after all unsubscriptions, no more events should be received
      bus.publishEvent('TestEvent', { id: 'final', data: 'final' });
      for (const listener of listeners) {
        expect(listener).not.toHaveBeenCalledWith({
          id: 'final',
          data: 'final',
        });
      }
    });
  });
});
