import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createClient } from '../src/createClient'
import * as rpc from '../src/rpc'
import type { JsonValue } from '../src/types'

describe('createClient', () => {
  class TestAPI {
    public method1(): string { return 'result1' }
    public method2(arg: string): string { return arg }
    private secretMethod(): string { return 'secret' }
  }

  // Make public methods enumerable
  Object.defineProperties(TestAPI.prototype, {
    method1: {
      value: TestAPI.prototype.method1,
      enumerable: true,
      configurable: true,
      writable: true
    },
    method2: {
      value: TestAPI.prototype.method2,
      enumerable: true,
      configurable: true,
      writable: true
    }
  });

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(rpc, 'sendRequest').mockImplementation(async () => 'response' as JsonValue)
  })

  it('should create client with all public methods', async () => {
    const client = createClient(TestAPI)
    
    expect(typeof client.method1).toBe('function')
    expect(typeof client.method2).toBe('function')
    expect('secretMethod' in client).toBe(false)
  })

  it('should send RPC requests when methods are called', async () => {
    const client = createClient(TestAPI)
    
    await client.method1()
    expect(rpc.sendRequest).toHaveBeenCalledWith('method1', [], undefined)
    
    await client.method2('test')
    expect(rpc.sendRequest).toHaveBeenCalledWith('method2', ['test'], undefined)
  })

  it('should respect timeout option', async () => {
    const client = createClient(TestAPI, { timeout: 5000 })
    
    await client.method1()
    expect(rpc.sendRequest).toHaveBeenCalledWith('method1', [], 5000)
  })
}) 