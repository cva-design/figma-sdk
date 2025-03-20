import { describe, expect, it } from 'vitest'
import {
  InternalError,
  InvalidParams,
  InvalidRequest,
  MethodNotFound,
  ParseError
} from '../src/errors'

describe('RPC Errors', () => {
  const testData = { test: 'data' }

  it('should create ParseError with correct properties', () => {
    const error = new ParseError(testData)
    expect(error.statusCode).toBe(-32700)
    expect(error.message).toBe('Parse error')
    expect(error.data).toEqual(testData)
    expect(error).toBeInstanceOf(Error)
  })

  it('should create InvalidRequest with correct properties', () => {
    const error = new InvalidRequest({ jsonrpc: '2.0', method: 'test', id: 1 })
    expect(error.statusCode).toBe(-32600)
    expect(error.message).toBe('Invalid Request')
    expect(error.data).toMatchObject({ jsonrpc: '2.0', method: 'test', id: 1 })
  })

  it('should create MethodNotFound with correct properties', () => {
    const error = new MethodNotFound(testData)
    expect(error.statusCode).toBe(-32601)
    expect(error.message).toContain('Method not found')
    expect(error.data).toEqual(testData)
  })

  it('should create InvalidParams with correct properties', () => {
    const error = new InvalidParams(testData)
    expect(error.statusCode).toBe(-32602)
    expect(error.message).toContain('Invalid params')
    expect(error.data).toEqual(testData)
  })

  it('should create InternalError with correct properties', () => {
    const error = new InternalError(testData)
    expect(error.statusCode).toBe(-32603)
    expect(error.message).toBe('Internal error')
    expect(error.data).toEqual(testData)
  })
}) 