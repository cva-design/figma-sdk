import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createAPI } from '../src/createAPI'
import * as rpc from '../src/rpc'

describe('createAPI', () => {
  const mockMethods = {
    test: vi.fn(),
    asyncTest: vi.fn().mockResolvedValue('result')
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(rpc, 'init')
  })

  it('should initialize RPC with provided methods', () => {
    createAPI(mockMethods)
    expect(rpc.init).toHaveBeenCalledWith(mockMethods, { debug: undefined })
  })

  it('should create stub methods that call original methods', async () => {
    const api = createAPI(mockMethods)
    
    api.test('arg1', 'arg2')
    expect(mockMethods.test).toHaveBeenCalledWith('arg1', 'arg2')
    
    const result = await api.asyncTest('arg')
    expect(mockMethods.asyncTest).toHaveBeenCalledWith('arg')
    expect(result).toBe('result')
  })
}) 