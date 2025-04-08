import { beforeEach, describe, expect, it, mock, spyOn } from 'bun:test'
import { createAPI } from '../src/createAPI'
import * as rpc from '../src/rpc'
import type { Serializer } from '../src/types'

describe('createAPI', () => {
  const mockMethods = {
    test: mock(),
    asyncTest: mock().mockResolvedValue('result')
  }

  const mockSerializer: Serializer = {
    serialize: mock(v => v),
    deserialize: mock(v => v),
  }

  beforeEach(() => {
    mock.restore()
    spyOn(rpc, 'init')
  })

  it('should initialize RPC with provided methods and default options', () => {
    createAPI(mockMethods)
    expect(rpc.init).toHaveBeenCalledWith(mockMethods, undefined)
  })

  it('should initialize RPC with provided debug option', () => {
    createAPI(mockMethods, { debug: true })
    expect(rpc.init).toHaveBeenCalledWith(mockMethods, { debug: true })
  })

  it('should initialize RPC with provided timeout option', () => {
    createAPI(mockMethods, { timeout: 5000 })
    expect(rpc.init).toHaveBeenCalledWith(mockMethods, { timeout: 5000 })
  })

  it('should initialize RPC with provided serializer option', () => {
    createAPI(mockMethods, { serializer: mockSerializer })
    expect(rpc.init).toHaveBeenCalledWith(mockMethods, { serializer: mockSerializer })
  })

  it('should initialize RPC with all provided options', () => {
    const options = { debug: true, timeout: 1000, serializer: mockSerializer }
    createAPI(mockMethods, options)
    expect(rpc.init).toHaveBeenCalledWith(mockMethods, options)
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
