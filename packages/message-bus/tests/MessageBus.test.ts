import { describe, it, expect, beforeEach, vi } from 'vitest'
import { MessageBusSingleton, getMessageBus } from '../src/MessageBus'
import { FigmaEvent } from '../src/events'

describe('MessageBus', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should be a singleton', () => {
    const bus1 = getMessageBus()
    const bus2 = getMessageBus()
    expect(bus1).toBe(bus2)
  })

  describe('Commands', () => {
    interface TestCommands {
      test: {
        $id: 'test';
        $type: 'command';
        message: string;
        result: number;
      }
    }

    it('should handle commands', () => {
      const bus = getMessageBus<TestCommands>()
      const handler = vi.fn().mockReturnValue(42)
      
      bus.handleCommand('test', handler)
      bus.sendCommand('test', 'hello')
      
      expect(handler).toHaveBeenCalledWith('hello')
    })

    it('should allow deregistering command handlers', () => {
      const bus = getMessageBus<TestCommands>()
      const handler = vi.fn()
      
      const deregister = bus.handleCommand('test', handler)
      deregister()
      
      bus.sendCommand('test', 'hello')
      expect(handler).not.toHaveBeenCalled()
    })
  })

  describe('Events', () => {
    interface TestEvents {
      customEvent: {
        $id: 'customEvent';
        $type: 'event';
        message: string;
      }
    }

    it('should handle custom events', () => {
      const bus = getMessageBus<unknown, TestEvents>()
      const listener = vi.fn()
      
      bus.listenToEvent('customEvent', listener)
      bus.publishEvent('customEvent', 'hello')
      
      expect(listener).toHaveBeenCalledWith('hello')
    })

    it('should handle Figma events', () => {
      const bus = getMessageBus()
      const listener = vi.fn()
      
      bus.listenToEvent(FigmaEvent.SelectionChanged, listener)
      
      expect(figma.on).toHaveBeenCalledWith('selectionchange', listener)
    })

    it('should allow deregistering event listeners', () => {
      const bus = getMessageBus<unknown, TestEvents>()
      const listener = vi.fn()
      
      const deregister = bus.listenToEvent('customEvent', listener)
      deregister()
      
      bus.publishEvent('customEvent', 'hello')
      expect(listener).not.toHaveBeenCalled()
    })
  })
}) 