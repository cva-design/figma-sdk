import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createTestBus,
  createMockListener,
  createValidationError
} from '../../utils/helpers';

import { FigmaEvents, FigmaIntegration, MessageBus } from '#source';

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

describe('Figma Events Integration', () => {
  let messageBus: MessageBus<{}, FigmaEvents> & { mockEventValidation: (eventName: keyof FigmaEvents, validator: (event: FigmaEvents[keyof FigmaEvents]) => boolean) => void };
  let figmaIntegration: FigmaIntegration;

  beforeEach(() => {
    vi.clearAllMocks();
    (global as any).figma = mockFigma;
    const { bus } = createTestBus<{}, FigmaEvents>();
    messageBus = bus;
    figmaIntegration = new FigmaIntegration(messageBus);
  });

  afterEach(() => {
    figmaIntegration.cleanup();
    messageBus.cleanup();
  });

  describe('Custom Plugin Events', () => {
    it('should validate custom plugin event payload', async () => {
      const listener = createMockListener();
      messageBus.listenToEvent('CommandExecuted', listener);

      // Mock event validation to reject invalid events
      messageBus.mockEventValidation('CommandExecuted', (event: any) => {
        if (!event || typeof event !== 'object') {
          throw createValidationError('Invalid event data');
        }
        return true;
      });

      // Invalid event should not trigger listener
      expect(() => {
        messageBus.publishEvent('CommandExecuted', null as any);
      }).toThrow('Invalid event data');
      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('Event Validation', () => {
    it('should validate selection event payload', async () => {
      const listener = createMockListener();
      messageBus.listenToEvent('SelectionChanged', listener);

      // Mock event validation to reject invalid events
      messageBus.mockEventValidation('SelectionChanged', (event: any) => {
        if (!event || !Array.isArray((event as any).nodes)) {
          throw createValidationError('Invalid selection data');
        }
        return true;
      });

      // Invalid event should not trigger listener
      expect(() => {
        messageBus.publishEvent('SelectionChanged', { nodes: 'invalid' as any });
      }).toThrow('Invalid selection data');
      expect(listener).not.toHaveBeenCalled();
    });

    it('should validate document change payload', async () => {
      const listener = createMockListener();
      messageBus.listenToEvent('DocumentChanged', listener);

      // Mock event validation to reject invalid events
      messageBus.mockEventValidation('DocumentChanged', (event: any) => {
        if (!event || !Array.isArray((event as any).documentChanges)) {
          throw createValidationError('Invalid document changes');
        }
        return true;
      });

      // Invalid event should not trigger listener
      expect(() => {
        messageBus.publishEvent('DocumentChanged', { changes: 'invalid' as any });
      }).toThrow('Invalid document changes');
      expect(listener).not.toHaveBeenCalled();
    });

    it('should validate plugin data payload', async () => {
      const listener = createMockListener();
      messageBus.listenToEvent('PluginDataChanged', listener);

      // Mock event validation to reject invalid events
      messageBus.mockEventValidation('PluginDataChanged', (event: any) => {
        if (!event || typeof (event as any).key !== 'string' || !(event as any).value) {
          throw createValidationError('Invalid plugin data');
        }
        return true;
      });

      // Invalid event should not trigger listener
      expect(() => {
        messageBus.publishEvent('PluginDataChanged', { key: 123, value: null } as any);
      }).toThrow('Invalid plugin data');
      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid event data', async () => {
      const listener = createMockListener();
      messageBus.listenToEvent('SelectionChanged', listener);

      // Mock event validation to reject invalid events
      messageBus.mockEventValidation('SelectionChanged', (event) => {
        if (!event || !Array.isArray((event as any).nodes) || (event as any).nodes.some((node: any) => typeof node.id !== 'string' || typeof node.type !== 'string')) {
          throw createValidationError('Invalid selection data');
        }
        return true;
      });

      // Send invalid event data
      expect(() => {
        messageBus.publishEvent('SelectionChanged', {
          nodes: [{ id: 'not-a-valid-uuid', type: 123 }],
        } as any);
      }).toThrow('Invalid selection data');
      expect(listener).not.toHaveBeenCalled();
    });
  });
});
