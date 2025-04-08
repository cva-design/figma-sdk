import { beforeEach, describe, expect, it, mock, spyOn, type Mock } from 'bun:test';
import { createClient } from '../src/createClient';
import * as rpc from '../src/rpc'; // Import the actual module
import type { JsonValue, Serializer } from '../src/types';

// No longer need the global mock.module or the global variable for the mock

describe('createClient', () => {
  // Define an interface instead of a class
  interface TestAPI {
    method1(): string;
    method2(arg: string): string;
    methodWithComplexReturn(): { data: 'response from methodWithComplexReturn' };
  }

  // Mock Serializer
  const mockSerializer: Serializer & {
      serialize: Mock<Serializer['serialize']>;
      deserialize: Mock<Serializer['deserialize']>;
    } = {
    serialize: mock((v) => JSON.stringify(v)),
    deserialize: mock((v) => JSON.parse(v as string)),
  };

  // Variable to hold the spy, assigned in beforeEach
  let sendRequestSpy: Mock<typeof rpc.sendRequest>;

  beforeEach(() => {
    // Restore *all* mocks created with spyOn or mock
    mock.restore();
    // Clear serializer mock calls specifically
    mockSerializer.serialize.mockClear();
    mockSerializer.deserialize.mockClear();

    // Create a spy on the actual sendRequest function for this test suite
    // Refined mock implementation to return specific type for methodWithComplexReturn
    sendRequestSpy = spyOn(rpc, 'sendRequest').mockImplementation(async (method, params, timeout, options) => {
        let resultData: JsonValue;
        if (method === 'methodWithComplexReturn') {
            // Specific return for this method to match the interface
            resultData = { data: 'response from methodWithComplexReturn' as const };
        } else {
            // Generic response for other methods
            resultData = `response from ${method}`;
        }

        if (options?.serializer) {
            const serialized = options.serializer.serialize(resultData);
            // Simulate deserialization
            return options.serializer.deserialize(serialized as string) as JsonValue;
        }
        return resultData;
    });
  })

  it('should create client with dynamic method access', async () => {
    const client = createClient<TestAPI>()
    
    expect(typeof client.method1).toBe('function')
    expect(typeof client.method2).toBe('function')
  })

  it('should send RPC requests when methods are called (no options)', async () => {
    const client = createClient<TestAPI>()
    
    const res1 = await client.method1()
    expect(sendRequestSpy).toHaveBeenCalledWith('method1', [], undefined, { serializer: undefined, sendRawOverride: undefined })
    // The mock implementation handles deserialization simulation
    expect(res1).toBe('response from method1')
    
    const res2 = await client.method2('test')
    expect(sendRequestSpy).toHaveBeenCalledWith('method2', ['test'], undefined, { serializer: undefined, sendRawOverride: undefined })
    expect(res2).toBe('response from method2')
  })

  it('should respect timeout option', async () => {
    const client = createClient<TestAPI>({ timeout: 5000 })
    
    await client.method1()
    expect(sendRequestSpy).toHaveBeenCalledWith('method1', [], 5000, { serializer: undefined, sendRawOverride: undefined })
  })

  it('should use serializer when provided', async () => {
    const client = createClient<TestAPI>({ serializer: mockSerializer })
    const expectedResult = { data: 'response from methodWithComplexReturn' as const };
    // Calculate this for assertion, but don't count this call against the test
    const expectedSerializedResult = mockSerializer.serialize(expectedResult);

    // Clear mock stats *before* the action under test
    sendRequestSpy.mockClear();
    mockSerializer.serialize.mockClear();
    mockSerializer.deserialize.mockClear();

    // Action under test
    const result = await client.methodWithComplexReturn()

    // Assertions
    expect(sendRequestSpy).toHaveBeenCalledTimes(1); // Ensure spy was called once
    expect(sendRequestSpy).toHaveBeenCalledWith('methodWithComplexReturn', [], undefined, { serializer: mockSerializer, sendRawOverride: undefined })

    // Check serializer calls made *during* the action
    // The mockImplementation now calls serialize once and deserialize once.
    expect(mockSerializer.serialize).toHaveBeenCalledTimes(1); // Should be called once by the mock implementation
    expect(mockSerializer.deserialize).toHaveBeenCalledTimes(1); // Should be called once by the mock implementation
    // Ensure deserialize was called with the data the mock created
    expect(mockSerializer.deserialize).toHaveBeenCalledWith(expectedSerializedResult);

    // Expect the final result to match the specific expected object
    expect(result).toEqual(expectedResult)
  })


  it('should handle methods not defined in the interface', async () => {
    const client = createClient<TestAPI>()
    
    // @ts-expect-error - This method doesn't exist on TestAPI
    await client.nonExistentMethod('test')
    
    // Should still send the request despite not being in the interface
    expect(sendRequestSpy).toHaveBeenCalledWith('nonExistentMethod', ['test'], undefined, { serializer: undefined, sendRawOverride: undefined })
  })
}) 
