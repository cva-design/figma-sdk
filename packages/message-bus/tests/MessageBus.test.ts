import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getMessageBus } from '../src/MessageBus';
import { eventHandlers } from '../src/handler';
import { FigmaEvent } from '../src/types/figma-events';

describe('MessageBus', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.parent.postMessage = vi.fn((args) => {
      for (const id in eventHandlers) {
        if (
          eventHandlers[id].name === args[0] ||
          eventHandlers[id].name === args.pluginMessage[0]
        ) {
          eventHandlers[id].handler.apply(null, [args.pluginMessage[1]]);
        }
      }
    });
  });

  it('should be a singleton', () => {
    const bus1 = getMessageBus();
    const bus2 = getMessageBus();
    expect(bus1).toBe(bus2);
  });

  describe('Commands', () => {
    interface TestCommands {
      test: {
        $id: 'test';
        $type: 'command';
        message: string;
        result: number;
      };
    }

    it('should handle commands', () => {
      const bus = getMessageBus<TestCommands>();
      const handler = vi.fn().mockReturnValue({ message: 'hello' });

      bus.handleCommand('test', handler);

      bus.sendCommand('test', { message: 'hello' });
      expect(handler).toHaveBeenCalledOnce();
      expect(handler).toHaveBeenCalledWith({ message: 'hello' });
    });

    it('should allow deregistering command handlers', () => {
      const bus = getMessageBus<TestCommands>();
      const handler = vi.fn();

      const deregister = bus.handleCommand('test', handler);
      deregister();

      bus.sendCommand('test', { message: 'hello' });
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('Events', () => {
    interface TestEvents {
      'custom:event': {
        $id: 'custom:event';
        $type: 'event';
        message: string;
      };
    }
    beforeEach(() => {
      window.parent.postMessage = vi.fn((args) => {
        for (const id in eventHandlers) {
          if (
            eventHandlers[id].name === args[0] ||
            eventHandlers[id].name === args.pluginMessage[0]
          ) {
            eventHandlers[id].handler.apply(null, [args.pluginMessage[1]]);
          }
        }
      });
    });

    it('should handle custom events', () => {
      const bus = getMessageBus<unknown, TestEvents>();
      const listener = vi.fn();

      bus.listenToEvent('custom:event', listener);
      bus.publishEvent('custom:event', { message: 'hello' });

      expect(listener).toHaveBeenCalledWith({ message: 'hello' });
    });

    it('should handle Figma events', () => {
      const bus = getMessageBus();
      const listener = vi.fn();

      bus.listenToEvent(FigmaEvent.SelectionChanged, listener);

      expect(figma.on).toHaveBeenCalledWith('selectionchange', listener);
    });

    it('should allow deregistering event listeners', () => {
      const bus = getMessageBus<unknown, TestEvents>();
      const listener = vi.fn();

      const deregister = bus.listenToEvent('customEvent', listener);
      deregister();

      bus.publishEvent('custom:event', { message: 'hello' });
      expect(listener).not.toHaveBeenCalled();
    });
  });
});
