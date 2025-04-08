import { beforeEach, describe, expect, it, mock } from 'bun:test';
import { getMessageBus } from '../src/MessageBus';
import { FigmaEvent, type FigmaEventRegistry } from '../src/events';
import { eventHandlers, invokeEventHandler } from '../src/handler';
import { serializeForMessageBus } from '../src/utils';
import { figmaMock } from './setup';

describe('MessageBus', () => {
  beforeEach(() => {
    figmaMock.on.mockClear();
    figmaMock.off.mockClear();
    figmaMock.ui.on.mockClear();
    figmaMock.ui.postMessage.mockClear();

    for (const key in eventHandlers) {
      delete eventHandlers[key];
    }
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
      const handler = mock().mockReturnValue({ message: 'hello' });
      const commandData = {
        $id: 'test' as const,
        $type: 'command' as const,
        message: 'hello',
        result: 0,
      };

      bus.handleCommand('test', handler);
      bus.sendCommand('test', commandData);

      invokeEventHandler('test', [serializeForMessageBus(commandData)]);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(commandData);
    });

    it('should allow deregistering command handlers', () => {
      const bus = getMessageBus<TestCommands>();
      const handler = mock();
      const commandData = {
        $id: 'test' as const,
        $type: 'command' as const,
        message: 'hello',
        result: 0,
      };

      const deregister = bus.handleCommand('test', handler);
      deregister();

      bus.sendCommand('test', commandData);
      invokeEventHandler('test', [serializeForMessageBus(commandData)]);

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

    it('should handle custom events', () => {
      const bus = getMessageBus<unknown, TestEvents>();
      const listener = mock();
      const eventData = {
        $id: 'custom:event' as const,
        $type: 'event' as const,
        message: 'hello',
      };

      bus.listenToEvent('custom:event', listener);
      bus.publishEvent('custom:event', eventData);

      invokeEventHandler('custom:event', [serializeForMessageBus(eventData)]);

      expect(listener).toHaveBeenCalledWith(eventData);
    });

    it('should handle Figma events', () => {
      const bus = getMessageBus<unknown, FigmaEventRegistry>();
      const listener = mock();

      const originalFigma = (globalThis as any).figma;
      (globalThis as any).figma = figmaMock;

      bus.listenToEvent(FigmaEvent.SelectionChanged, listener);

      expect(figmaMock.on).toHaveBeenCalledWith('selectionchange', listener);

      (globalThis as any).figma = originalFigma;
    });

    it('should allow deregistering event listeners', () => {
      const bus = getMessageBus<unknown, TestEvents>();
      const listener = mock();
      const eventData = {
        $id: 'custom:event' as const,
        $type: 'event' as const,
        message: 'hello',
      };

      const deregister = bus.listenToEvent('custom:event', listener);
      deregister();

      bus.publishEvent('custom:event', eventData);
      invokeEventHandler('custom:event', [serializeForMessageBus(eventData)]);

      expect(listener).not.toHaveBeenCalled();
    });
  });
});
