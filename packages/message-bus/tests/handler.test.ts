import { describe, it, expect, beforeEach, vi } from 'vitest'
import { on, once, emit, invokeEventHandler } from '../src/handler'

describe('Event Handler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('on', () => {
    it('should register event handlers', () => {
      const handler = vi.fn()
      on('test', handler)
      
      invokeEventHandler('test', ['data'])
      expect(handler).toHaveBeenCalledWith('data')
    })

    it('should allow deregistering handlers', () => {
      const handler = vi.fn()
      const deregister = on('test', handler)
      
      deregister()
      invokeEventHandler('test', ['data'])
      expect(handler).not.toHaveBeenCalled()
    })
  })

  describe('once', () => {
    it('should only trigger handler once', () => {
      const handler = vi.fn()
      once('test', handler)
      
      invokeEventHandler('test', ['first'])
      invokeEventHandler('test', ['second'])
      
      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenCalledWith('first')
    })
  })

  describe('emit', () => {
    it('should post message to figma UI when in main context', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window
      
      emit('test', 'data')
      expect(figma.ui.postMessage).toHaveBeenCalledWith(['test', 'data'])
      
      global.window = originalWindow
    })

    it('should post message to parent when in UI context', () => {
      emit('test', 'data')
      expect(window.parent.postMessage).toHaveBeenCalledWith(
        { pluginMessage: ['test', 'data'] },
        '*'
      )
    })
  })
}) 