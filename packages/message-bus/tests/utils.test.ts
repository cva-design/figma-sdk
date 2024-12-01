import { describe, it, expect } from 'vitest'
import { serialize, deserialize, deepClone, JsonReplacer, JsonReviver } from '../src/utils'

describe('Utils', () => {
  describe('JSON Serialization', () => {
    it('should handle Map objects', () => {
      const map = new Map([['key', 'value']])
      const serialized = JSON.stringify(map, JsonReplacer)
      const deserialized = JSON.parse(serialized, JsonReviver)
      
      expect(deserialized).toBeInstanceOf(Map)
      expect(deserialized.get('key')).toBe('value')
    })

    it('should handle regular objects', () => {
      const obj = { test: 'value' }
      const serialized = JSON.stringify(obj, JsonReplacer)
      const deserialized = JSON.parse(serialized, JsonReviver)
      
      expect(deserialized).toEqual(obj)
    })
  })

  describe('serialize/deserialize', () => {
    it('should round-trip objects correctly', () => {
      const original = {
        str: 'test',
        num: 123,
        map: new Map([['key', 'value']])
      }
      
      const serialized = serialize(original)
      const deserialized = deserialize(serialized)
      
      expect(deserialized).toEqual({
        str: 'test',
        num: 123,
        map: new Map([['key', 'value']])
      })
    })

    it('should throw on invalid input to deserialize', () => {
      expect(() => deserialize(123)).toThrow('Input must be a string')
    })
  })

  describe('deepClone', () => {
    it('should create a deep copy of objects', () => {
      const original = {
        nested: { value: 'test' },
        map: new Map([['key', { deep: 'value' }]])
      }
      
      const clone = deepClone(original)
      
      expect(clone).toEqual(original)
      expect(clone).not.toBe(original)
      expect(clone.nested).not.toBe(original.nested)
      expect(clone.map).not.toBe(original.map)
    })
  })
}) 