import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createClient } from '../src/createClient'
import * as rpc from '../src/rpc'
import type { JsonValue } from '../src/types'

describe('createClient', () => {
  // Define an interface instead of a class
  interface TestAPI {
    method1(): string;
    method2(arg: string): string;
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(rpc, 'sendRequest').mockImplementation(async () => 'response' as JsonValue)
  })

  it('should create client with dynamic method access', async () => {
    const client = createClient<TestAPI>()
    
    expect(typeof client.method1).toBe('function')
    expect(typeof client.method2).toBe('function')
  })

  it('should send RPC requests when methods are called', async () => {
    const client = createClient<TestAPI>()
    
    await client.method1()
    expect(rpc.sendRequest).toHaveBeenCalledWith('method1', [], undefined)
    
    await client.method2('test')
    expect(rpc.sendRequest).toHaveBeenCalledWith('method2', ['test'], undefined)
  })

  it('should respect timeout option', async () => {
    const client = createClient<TestAPI>({ timeout: 5000 })
    
    await client.method1()
    expect(rpc.sendRequest).toHaveBeenCalledWith('method1', [], 5000)
  })

  it('should handle methods not defined in the interface', async () => {
    const client = createClient<TestAPI>()
    
    // @ts-expect-error - This method doesn't exist on TestAPI
    await client.nonExistentMethod('test')
    
    // Should still send the request despite not being in the interface
    expect(rpc.sendRequest).toHaveBeenCalledWith('nonExistentMethod', ['test'], undefined)
  })
}) 