import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MessageBus } from '@/index';
import { PluginUIIntegration } from '@/integrations/plugin-ui';
import {
  createTestBus,
  createValidationError,
  generateUUID,
} from '@tests/utils/helpers';
import type { TestCommands, TestEvents } from '@tests/utils/types';

// Mock window for UI context
const mockWindow = {
  parent: {
    postMessage: vi.fn(),
  },
  onmessage: null as any,
};

describe('Plugin-UI Communication', () => {
  let messageBus: MessageBus<TestCommands, TestEvents>;
  let pluginUIIntegration: PluginUIIntegration<TestCommands, TestEvents>;

  beforeEach(() => {
    const { bus } = createTestBus<TestCommands, TestEvents>();
    messageBus = bus;
    pluginUIIntegration = new PluginUIIntegration(messageBus);
    (global as any).window = mockWindow;
    vi.clearAllMocks();
  });

  afterEach(() => {
    pluginUIIntegration.cleanup();
    messageBus.cleanup();
  });

  describe('Message Passing', () => {
    it('should pass messages from plugin to UI', () => {
      const message = { type: 'test', data: { foo: 'bar' } };
      pluginUIIntegration.sendToUI(message);
      expect(mockWindow.parent.postMessage).toHaveBeenCalledWith(
        { pluginMessage: message },
        '*',
      );
    });

    it('should pass messages from UI to plugin', () => {
      const message = { type: 'test', data: { foo: 'bar' } };
      const handler = vi.fn();
      pluginUIIntegration.onUIMessage(handler);
      pluginUIIntegration.initialize();

      // Simulate message from UI
      mockWindow.onmessage?.({ data: message } as MessageEvent);

      expect(handler).toHaveBeenCalledWith(message);
    });
  });

  describe('Event Handling', () => {
    it('should handle UI visibility changes', () => {
      const listener = vi.fn();
      pluginUIIntegration.onVisibilityChange(listener);
      pluginUIIntegration.initialize();

      // Simulate visibility change
      mockWindow.onmessage?.({
        data: { type: 'visibility', visible: true },
      } as MessageEvent);

      expect(listener).toHaveBeenCalledWith(true);
    });

    it('should handle UI resize events', () => {
      const listener = vi.fn();
      pluginUIIntegration.onResize(listener);
      pluginUIIntegration.initialize();

      // Simulate resize event
      mockWindow.onmessage?.({
        data: { type: 'resize', width: 400, height: 300 },
      } as MessageEvent);

      expect(listener).toHaveBeenCalledWith({ width: 400, height: 300 });
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid message format', () => {
      const errorHandler = vi.fn();
      pluginUIIntegration.onError(errorHandler);
      pluginUIIntegration.initialize();

      // Simulate invalid message
      mockWindow.onmessage?.({
        data: 'invalid',
      } as MessageEvent);

      expect(errorHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining('Invalid message format'),
        }),
      );
    });

    it('should handle missing message type', () => {
      const errorHandler = vi.fn();
      pluginUIIntegration.onError(errorHandler);
      pluginUIIntegration.initialize();

      // Simulate message without type
      mockWindow.onmessage?.({
        data: { data: 'test' },
      } as MessageEvent);

      expect(errorHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining('Missing message type'),
        }),
      );
    });
  });
});
