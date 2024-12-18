import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MessageBus } from '@/index';
import { FigmaIntegration } from '@/integrations/figma';
import {
  createTestBus,
  createValidationError,
  generateUUID,
  createMockListener,
} from '@tests/utils/helpers';
import type { FigmaCommands, FigmaEvents } from '@tests/utils/types';

// Mock Figma API
const mockFigma = {
  ui: {
    on: vi.fn(),
    off: vi.fn(),
    postMessage: vi.fn(),
  },
  on: vi.fn(),
  off: vi.fn(),
  currentPage: {
    selection: [],
  },
  viewport: {
    center: { x: 0, y: 0 },
    zoom: 1,
  },
};

describe('Plugin Lifecycle', () => {
  let messageBus: MessageBus<FigmaCommands, FigmaEvents>;
  let figmaIntegration: FigmaIntegration<FigmaCommands, FigmaEvents>;
  let messageHandler: (message: unknown) => void;

  beforeEach(() => {
    vi.clearAllMocks();
    (global as any).figma = mockFigma;
    const { bus } = createTestBus<FigmaCommands, FigmaEvents>();
    messageBus = bus;
    figmaIntegration = new FigmaIntegration(messageBus);

    // Set up message handler
    mockFigma.ui.on.mockImplementation((event, handler) => {
      if (event === 'message') {
        messageHandler = handler;
      }
    });

    // Initialize plugin
    figmaIntegration.initialize();
  });

  afterEach(() => {
    figmaIntegration.cleanup();
    messageBus.cleanup();
  });

  describe('Plugin Events', () => {
    it('should handle plugin run event', async () => {
      const listener = createMockListener();
      messageBus.listenToEvent('PluginRun', listener);

      // Trigger the run event
      const eventData = { command: 'start', parameters: { mode: 'edit' } };
      messageHandler({ type: 'run', ...eventData });

      expect(listener).toHaveBeenCalledWith(eventData);
    });

    it('should handle plugin close event', async () => {
      const listener = createMockListener();
      messageBus.listenToEvent('PluginClose', listener);

      // Trigger the close event
      messageHandler({ type: 'close' });

      expect(listener).toHaveBeenCalled();
    });
  });

  describe('Timer Events', () => {
    it('should handle timer start event', async () => {
      const listener = createMockListener();
      messageBus.listenToEvent('TimerStart', listener);

      // Trigger timer start event
      messageHandler({ type: 'timerstart', id: 'timer-1' });

      expect(listener).toHaveBeenCalledWith({ id: 'timer-1' });
    });

    it('should handle timer stop event', async () => {
      const listener = createMockListener();
      messageBus.listenToEvent('TimerStop', listener);

      // Trigger timer stop event
      messageHandler({ type: 'timerstop', id: 'timer-1' });

      expect(listener).toHaveBeenCalledWith({ id: 'timer-1' });
    });

    it('should handle timer pause event', async () => {
      const listener = createMockListener();
      messageBus.listenToEvent('TimerPause', listener);

      // Trigger timer pause event
      messageHandler({ type: 'timerpause', id: 'timer-1' });

      expect(listener).toHaveBeenCalledWith({ id: 'timer-1' });
    });

    it('should handle timer resume event', async () => {
      const listener = createMockListener();
      messageBus.listenToEvent('TimerResume', listener);

      // Trigger timer resume event
      messageHandler({ type: 'timerresume', id: 'timer-1' });

      expect(listener).toHaveBeenCalledWith({ id: 'timer-1' });
    });
  });

  describe('Cleanup', () => {
    it('should cleanup all event listeners', () => {
      figmaIntegration.cleanup();

      expect(mockFigma.off).toHaveBeenCalled();
      expect(mockFigma.ui.off).toHaveBeenCalled();
    });
  });

  describe('Context Handling', () => {
    it('should initialize with correct context', () => {
      const listener = createMockListener();
      messageBus.listenToEvent('ContextInitialized', listener);

      figmaIntegration.initialize();

      expect(listener).toHaveBeenCalledWith({
        viewport: mockFigma.viewport,
        selection: mockFigma.currentPage.selection,
      });
    });

    it('should handle selection changes', () => {
      const listener = createMockListener();
      messageBus.listenToEvent('SelectionChanged', listener);

      // Set up selection change handler
      let selectionHandler: Function;
      mockFigma.on.mockImplementation((event, handler) => {
        if (event === 'selectionchange') {
          selectionHandler = handler;
        }
      });

      figmaIntegration.initialize();

      // Simulate selection change
      mockFigma.currentPage.selection = [{ id: 'node1', type: 'RECTANGLE' }];
      selectionHandler();

      expect(listener).toHaveBeenCalledWith({
        nodes: mockFigma.currentPage.selection,
      });
    });

    it('should handle viewport changes', () => {
      const listener = createMockListener();
      messageBus.listenToEvent('ViewportChanged', listener);

      // Simulate viewport change
      mockFigma.viewport = {
        center: { x: 100, y: 100 },
        zoom: 2,
      };

      // Trigger viewport change
      const documentChangeHandler = mockFigma.on.mock.calls.find(
        ([event]) => event === 'documentchange',
      )?.[1];

      if (!documentChangeHandler) {
        throw new Error('Document change handler not found');
      }

      documentChangeHandler();

      expect(listener).toHaveBeenCalledWith({
        center: mockFigma.viewport.center,
        zoom: mockFigma.viewport.zoom,
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid node references', () => {
      const errorListener = createMockListener();
      messageBus.listenToEvent('Error', errorListener);

      figmaIntegration.initialize();

      // Trigger error by accessing invalid node
      mockFigma.currentPage.selection = [undefined];
      const selectionHandler = mockFigma.on.mock.calls.find(
        ([event]) => event === 'selectionchange',
      )?.[1];
      selectionHandler?.();

      expect(errorListener).toHaveBeenCalledWith({
        error: 'Cannot read properties of undefined (reading \'id\')',
      });
    });
  });

  describe('Plugin Commands', () => {
    it('should handle plugin commands with parameters', async () => {
      const listener = createMockListener();
      messageBus.listenToEvent('CommandExecuted', listener);

      // Trigger command
      messageHandler({
        type: 'command',
        command: 'create',
        parameters: { type: 'rectangle' },
      });

      expect(listener).toHaveBeenCalledWith({
        command: 'create',
        parameters: { type: 'rectangle' },
      });
    });
  });

  describe('Plugin UI', () => {
    it('should handle UI visibility changes', async () => {
      const listener = createMockListener();
      messageBus.listenToEvent('UIVisibilityChanged', listener);

      // Trigger UI visibility change
      messageHandler({ type: 'visibility', visible: true });

      expect(listener).toHaveBeenCalledWith({ visible: true });
    });

    it('should handle UI resize events', async () => {
      const listener = createMockListener();
      messageBus.listenToEvent('UIResized', listener);

      // Trigger UI resize
      messageHandler({
        type: 'resize',
        width: 400,
        height: 300,
      });

      expect(listener).toHaveBeenCalledWith({
        width: 400,
        height: 300,
      });
    });
  });
});
