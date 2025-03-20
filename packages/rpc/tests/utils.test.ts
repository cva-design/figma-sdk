import { describe, expect, it } from 'vitest'
import { isFunction, isPromise, toJsonObject, toJsonValue } from '../src/utils'

describe('Utils', () => {
  describe('isFunction', () => {
    it('should identify functions correctly', () => {
      expect(isFunction(() => {})).toBe(true)
      expect(isFunction(() => {})).toBe(true)
      expect(isFunction({})).toBe(false)
      expect(isFunction(null)).toBe(false)
    })
  })

  describe('isPromise', () => {
    it('should identify promises correctly', () => {
      expect(isPromise(Promise.resolve('test'))).toBe(true)
      expect(isPromise({})).toBe(false)
      // biome-ignore lint/suspicious/noThenProperty:
      expect(isPromise({ then: undefined, catch: undefined })).toBe(false)
    })
  })

  describe('toJsonValue', () => {
    it('should convert values to JSON-safe format', () => {
      const input = {
        str: 'string',
        num: 123,
        bool: true,
        arr: [1, 'two', { three: 3 }],
        obj: { nested: 'value' },
        nil: null
      }

      const result = toJsonValue(input)
      expect(result).toEqual(input)
    })

    it('should handle null and undefined correctly', () => {
      expect(toJsonValue(null)).toBe(null);
      expect(toJsonValue(undefined)).toBe(undefined);
    })

    it('should throw on unconvertible values', () => {
      expect(() => toJsonValue(() => {})).toThrow()
      expect(() => toJsonValue(Symbol())).toThrow()
    })

    it('should detect and throw on circular references', () => {
      const circular: any = { prop: 'value' };
      circular.self = circular;
      
      expect(() => toJsonValue(circular)).toThrow(/circular/i);
    })
  })

  describe('toJsonObject', () => {
    it('should convert objects to JSON-safe objects', () => {
      const input = { key: 'value', nested: { num: 123 } }
      const result = toJsonObject(input)
      expect(result).toEqual(input)
    })
  })
}) 