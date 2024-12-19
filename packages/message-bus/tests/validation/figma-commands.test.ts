/**
 * These tests are meant to run against the compiled code to ensure typia's runtime validations are working.
 * Make sure to build the project before running these tests:
 * ```
 * tsc --build tsconfig.project.json
 * vitest run tests/validation
 * ```
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MessageBus } from '../../esm';
import { FigmaIntegration } from '@/integrations/figma';
import {
  createTestBus,
  createMockListener,
} from '../utils/helpers';
import type { FigmaCommands, FigmaEvents } from '../utils/types';

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

describe.skip('Figma Commands Validation', () => {
  let messageBus: MessageBus<FigmaCommands, FigmaEvents>;
  let figmaIntegration: FigmaIntegration<FigmaCommands, FigmaEvents>;

  beforeEach(() => {
    vi.clearAllMocks();
    (global as any).figma = mockFigma;
    const { bus } = createTestBus<FigmaCommands, FigmaEvents>();
    messageBus = bus;
    figmaIntegration = new FigmaIntegration(messageBus);
    figmaIntegration.initialize();
  });

  afterEach(() => {
    figmaIntegration.cleanup();
    messageBus.cleanup();
  });

  it('should validate command parameters', async () => {
    const errorListener = createMockListener();
    messageBus.listenToEvent('Error', errorListener);

    // Create an invalid command payload
    const invalidCommand = {
      command: 'create',
      parameters: { type: 123 }, // Invalid type - should be string
    };

    // This should trigger typia's runtime validation
    messageBus.publishEvent('CommandExecuted', invalidCommand);

    // The error message might be different with typia, but we expect some kind of validation error
    expect(errorListener).toHaveBeenCalled();
    expect(errorListener.mock.calls[0][0]).toHaveProperty('error');
  });

  it('should accept valid command parameters', async () => {
    const commandListener = createMockListener();
    messageBus.listenToEvent('CommandExecuted', commandListener);

    // Create a valid command payload
    const validCommand = {
      command: 'create',
      parameters: { type: 'rectangle' },
    };

    // This should pass typia's runtime validation
    messageBus.publishEvent('CommandExecuted', validCommand);

    expect(commandListener).toHaveBeenCalledWith(validCommand);
  });
}); 