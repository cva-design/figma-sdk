import { type Mock, beforeEach, describe, expect, it, mock } from 'bun:test';
import { emit, invokeEventHandler, on, once } from '../src/handler';
import { serializeForMessageBus } from '../src/utils';
import { figmaMock, parentMock } from './setup';

describe('Event Handler', () => {
  beforeEach(() => {
    // Reset mocks
    figmaMock.ui.postMessage.mockClear();
    parentMock.postMessage.mockClear();
  });

  describe('on', () => {
    it('should register event handlers', () => {
      const handler = mock();
      const data = { payload: 'data' };
      on('test', handler);

      // Pass serialized data
      invokeEventHandler('test', [serializeForMessageBus(data)]);
      expect(handler).toHaveBeenCalledWith(data); // Expect with original data
    });

    it('should allow deregistering handlers', () => {
      const handler = mock();
      const data = { payload: 'data' };
      const deregister = on('test', handler);

      deregister();
      // Pass serialized data
      invokeEventHandler('test', [serializeForMessageBus(data)]);
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('once', () => {
    it('should only trigger handler once', () => {
      const handler = mock();
      const data1 = { payload: 'first' };
      const data2 = { payload: 'second' };
      once('test', handler);

      // Pass serialized data
      invokeEventHandler('test', [serializeForMessageBus(data1)]);
      invokeEventHandler('test', [serializeForMessageBus(data2)]);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(data1); // Expect with original data
    });
  });

  describe('emit', () => {
    it('should post message to figma UI when in main context', () => {
      const originalWindow = global.window;
      const originalFigma = (globalThis as any).figma;
      (globalThis as any).figma = figmaMock; // Assign mock for this test

      // @ts-ignore
      global.window = undefined; // Simulate main context
      const data = { message: 'to figma' };

      emit('test', data);

      expect(figmaMock.ui.postMessage).toHaveBeenCalledTimes(1);
      expect(figmaMock.ui.postMessage).toHaveBeenCalledWith([
        'test',
        serializeForMessageBus(data),
      ]);

      // Cleanup
      global.window = originalWindow;
      (globalThis as any).figma = originalFigma;
    });

    it('should post message to parent when in UI context', () => {
      // Simulate UI context: figma=undefined, window=defined
      const originalFigma = (globalThis as any).figma;
      const originalWindow = global.window;

      (globalThis as any).figma = undefined;
      // Assign a basic window mock with the parent mock
      global.window = { parent: parentMock } as any;

      const data = { message: 'to parent' };
      emit('test', data);

      // Expect the parent mock (assigned via window.parent) was called
      expect(parentMock.postMessage as Mock<any>).toHaveBeenCalledTimes(1);
      expect(parentMock.postMessage as Mock<any>).toHaveBeenCalledWith(
        { pluginMessage: ['test', serializeForMessageBus(data)] },
        '*',
      );

      // Cleanup
      (globalThis as any).figma = originalFigma;
      global.window = originalWindow;
    });
  });
});
