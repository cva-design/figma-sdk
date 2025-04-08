import { afterEach, beforeEach, describe, expect, it, Mock, mock, spyOn } from "bun:test";
import { diagnoseRpcError, handleRaw } from "../src";
import { MethodNotFound } from "../src/errors";
import { init, resetInternalState, sendRaw, sendRequest } from "../src/rpc";
import type { JsonRpcRequest, JsonValue, Serializer } from "../src/types";

let consoleErrorSpy: Mock<(...args: any[]) => void>;
let consoleWarnSpy: Mock<(...args: any[]) => void>;
let consoleLogSpy: Mock<(...args: any[]) => void>;

describe("RPC Module Isolation Test", () => {
	const mockMethods = {
		test: mock((arg: string) => `processed: ${arg}`),
		asyncTest: mock().mockResolvedValue("result" as JsonValue),
		errorTest: mock(() => { throw new Error("method error"); }),
		serializerTest: mock((data: any) => ({ responseDate: data.date })),
	};

	const mockSerializer: Serializer & {
        serialize: Mock<Serializer['serialize']>;
        deserialize: Mock<Serializer['deserialize']>;
    } = {
		serialize: mock((v: any) => JSON.stringify(v, (_key, value) => value instanceof Date ? value.toISOString() : value)),
		deserialize: mock((v: any) => {
            // console.log('[Test Debug] mockSerializer.deserialize received (type:', typeof v, '):', v);
            // Original deserialize logic:
            return JSON.parse(v as string, (_key, value) => typeof value === 'string' && /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value) ? new Date(value) : value);
        }),
	};

	beforeEach(() => {
        // Mock console methods before each test
        consoleErrorSpy = spyOn(console, 'error').mockImplementation(() => {});
        consoleWarnSpy = spyOn(console, 'warn').mockImplementation(() => {});
        consoleLogSpy = spyOn(console, 'log').mockImplementation(() => {});
    });

	afterEach(() => {
        // Restore console mocks
        mock.restore();

        // Clean up global figma mock if it was set during a test
        if ((globalThis as any).figma) {
            (globalThis as any).figma = undefined;
        }
        // Ensure state is reset *after* each test too
        resetInternalState();
    });

    // Helper for setting up mocks for a single test
    const setupTestEnvironment = (options: { serializer?: Serializer, debug?: boolean } = {}) => {
        resetInternalState();
        const postMessageMock = mock((_msg: JsonRpcRequest) => {});
        const onMock = mock((_evt: string, _cb: (message: JsonRpcRequest) => void) => {});
        (globalThis as any).figma = { ui: { postMessage: postMessageMock, on: onMock } };

        // Initialize with potentially specific options for this test
        init(mockMethods, options);
        // Return the mocks needed for assertions
        return { postMessageMock, onMock };
    };

    // Helper to simulate message via the 'on' mock for the current test
    const simulateIncomingMessage = (
        onMock: Mock<(eventName: string, callback: (message: JsonRpcRequest) => void) => void>,
        message: JsonRpcRequest
        ) => {
         const messageCall = onMock.mock.calls.find((call: [string, (msg: JsonRpcRequest) => void]) => call[0] === 'message');
         const messageHandler = messageCall?.[1];
         if (messageHandler && typeof messageHandler === 'function') {
            try {
                 console.log("[Simulate] Found handler on mock, calling with message:", message);
                 messageHandler(message);
             } catch (error) { console.error("Error executing message handler in test:", error); }
         } else {
             console.warn("Simulate: No message handler found on mock");
         }
    };

    // --- Tests --- //

	describe("Initialization", () => {
        it("should setup listeners", () => {
            const { onMock } = setupTestEnvironment();
            expect(onMock).toHaveBeenCalledTimes(1);
            expect(onMock).toHaveBeenCalledWith("message", expect.any(Function));
        });
         it("should use serializer if provided", () => {
            // Setup happens inside, just needs to not throw and register listener
            const { onMock } = setupTestEnvironment({ serializer: mockSerializer });
            expect(onMock).toHaveBeenCalledTimes(1);
        });
    });

    describe("Message Handling", () => {
        beforeEach(() => {
            // Reset method/serializer mocks before each handling test
             Object.values(mockMethods).forEach(m => m.mockClear());
             if(mockSerializer.serialize.mockClear) mockSerializer.serialize.mockClear();
             if(mockSerializer.deserialize.mockClear) mockSerializer.deserialize.mockClear();
        });

        it("should call method and respond", async () => {
            const { postMessageMock } = setupTestEnvironment();
            const req: JsonRpcRequest = { jsonrpc: "2.0", method: "test", params: ["data"], id: 1, clientId: "c1" };
            handleRaw(req); // handleRaw -> sendResult -> sendJson -> sendRaw -> postMessageMock
            await new Promise(resolve => setImmediate(resolve));
            expect(mockMethods.test).toHaveBeenCalledWith("data");
            expect(postMessageMock).toHaveBeenCalledTimes(1);
            expect(postMessageMock.mock.calls[0][0]).toEqual(expect.objectContaining({ id: 1, result: "processed: data" }));
        });

        it("should handle async method and respond", async () => {
            const { postMessageMock } = setupTestEnvironment();
            const req: JsonRpcRequest = { jsonrpc: "2.0", method: "asyncTest", params: [], id: 2, clientId: "c2" };
            handleRaw(req);
            await new Promise(resolve => setImmediate(resolve));
            expect(mockMethods.asyncTest).toHaveBeenCalledTimes(1);
            expect(postMessageMock).toHaveBeenCalledTimes(1);
            expect(postMessageMock.mock.calls[0][0]).toEqual(expect.objectContaining({ id: 2, result: "result" }));
        });

        it("should handle method error and respond", async () => {
            const { postMessageMock } = setupTestEnvironment();
            const req: JsonRpcRequest = { jsonrpc: "2.0", method: "errorTest", params: [], id: 3, clientId: "c3" };
            handleRaw(req);
            await new Promise(resolve => setImmediate(resolve));
            expect(mockMethods.errorTest).toHaveBeenCalledTimes(1);
            expect(postMessageMock).toHaveBeenCalledTimes(1);
            expect(postMessageMock.mock.calls[0][0]).toEqual(expect.objectContaining({ id: 3, error: expect.objectContaining({ message: "method error" }) }));
        });

        it("should handle MethodNotFound error", async () => {
            const { postMessageMock } = setupTestEnvironment();
            const req: JsonRpcRequest = { jsonrpc: "2.0", method: "notFound", params: [], id: 4, clientId: "c4" };
            handleRaw(req);
            await new Promise(resolve => setImmediate(resolve));
            expect(postMessageMock).toHaveBeenCalledTimes(1);
            expect(postMessageMock.mock.calls[0][0]).toEqual(expect.objectContaining({ id: 4, error: expect.objectContaining({ code: -32601, name: "MethodNotFound" }) }));
        });

         it("should use apiSerializer", async () => {
            // Setup with serializer
            const { postMessageMock, onMock } = setupTestEnvironment({ serializer: mockSerializer });
            const testDate = new Date();
            // Test manually serializes params for incoming message
            const serializedParams = mockSerializer.serialize([{ date: testDate }]); // Call 1
            const req: JsonRpcRequest = { jsonrpc: "2.0", method: "serializerTest", params: serializedParams as any, id: 5, clientId: "c5" };

            handleRaw(req); // Calls onRequest -> deserialize, then calls serialize for result (Call 2)

            await new Promise(resolve => setImmediate(resolve));

            expect(mockSerializer.deserialize).toHaveBeenCalledTimes(1);
            expect(mockSerializer.deserialize).toHaveBeenCalledWith(serializedParams);
            // Check call count
            expect(mockMethods.serializerTest).toHaveBeenCalledTimes(1);
            // Manually inspect the call arguments
            const callArgs = mockMethods.serializerTest.mock.calls[0];
            expect(callArgs.length).toBe(1);
            expect(typeof callArgs[0]).toBe('object'); // Check it's an object
            expect(callArgs[0]).toHaveProperty('date'); 

            expect(postMessageMock).toHaveBeenCalledTimes(1);
            const sentMessage = postMessageMock.mock.calls[0][0];
            // Check serialize call count (once in test setup, once for result)
            expect(mockSerializer.serialize).toHaveBeenCalledTimes(2);
            // Check result in sent message is serialized
            expect(sentMessage).toEqual(expect.objectContaining({ id: 5, result: mockSerializer.serialize({ responseDate: testDate }) }));
        });

        it("should ignore message from same client ID via listener", async () => {
            // Setup environment (init assigns an internal clientId)
            const { postMessageMock, onMock } = setupTestEnvironment({ debug: false });

            // --- Discover the clientId used by this instance --- //
            // Temporarily store the global sendRaw
            const globalSendRaw = sendRaw;
            if (!globalSendRaw) {
                throw new Error("sendRaw was not initialized by setupTestEnvironment");
            }
            // Send a dummy message to capture the clientId added by sendRaw
            // Use an empty object as we only care about the clientId added by sendRaw
            globalSendRaw({ jsonrpc: '2.0', id: -999 }); // id is required by JsonRpcRequest type
            expect(postMessageMock).toHaveBeenCalledTimes(1); // Ensure it was called
            const capturedClientId = postMessageMock.mock.calls[0][0]?.clientId;
            if (!capturedClientId) {
                throw new Error("Could not retrieve clientId from dummy message");
            }
            postMessageMock.mockClear(); // Reset mock for the actual test assertion
            // ---- End clientId Discovery ---- //

            // Simulate incoming message via listener using the *actual* clientId
            const reqSameId: JsonRpcRequest = {
                jsonrpc: "2.0",
                method: "test",
                params: ["ignore"],
                id: 99,
                clientId: capturedClientId // Use the discovered ID
            };

            // Find and invoke the message handler directly
            const messageCall = onMock.mock.calls.find((call: [string, (msg: JsonRpcRequest) => void]) => call[0] === 'message');
            const messageHandler = messageCall?.[1];
            if (messageHandler && typeof messageHandler === 'function') {
                messageHandler(reqSameId);
            } else {
                throw new Error("Could not find message handler from onMock setup");
            }

            // Yield event loop
            await new Promise(resolve => setImmediate(resolve));

            // Method should not have been called, and no response should have been sent
            expect(mockMethods.test).not.toHaveBeenCalled();
            expect(postMessageMock).not.toHaveBeenCalled();
        });
    });

    describe("Request Sending", () => {
        it("should send request structure", async () => {
            const { postMessageMock } = setupTestEnvironment();
            sendRequest("methodA", [1, "b"], undefined, { sendRawOverride: postMessageMock }).catch(() => {});
            await new Promise(resolve => setImmediate(resolve));
            expect(postMessageMock).toHaveBeenCalledTimes(1);
            const sent = postMessageMock.mock.calls[0][0];
            expect(sent).toEqual(expect.objectContaining({
                jsonrpc: "2.0",
                method: "methodA",
                params: [1, "b"],
                id: expect.any(Number),
                clientId: expect.any(String)
            }));
        });

        it("should use client serializer for params", async () => {
             const { postMessageMock } = setupTestEnvironment();
             const testDate = new Date();
             // Clear serializer mock before test
             if(mockSerializer.serialize.mockClear) mockSerializer.serialize.mockClear();

             sendRequest("methodB", [{ date: testDate }], undefined, { serializer: mockSerializer, sendRawOverride: postMessageMock }).catch(() => {});
             await new Promise(resolve => setImmediate(resolve));

             expect(postMessageMock).toHaveBeenCalledTimes(1);
             // Check client serializer was called for param
             expect(mockSerializer.serialize).toHaveBeenCalledTimes(1);
             const sent = postMessageMock.mock.calls[0][0];
             // Check params in sent message are serialized
             expect(sent.params).toEqual([mockSerializer.serialize({ date: testDate })]);
        });

        it("should reject on timeout", async () => {
            const { postMessageMock } = setupTestEnvironment();
            const promise = sendRequest("timeoutMethod", [], 10, { sendRawOverride: postMessageMock });
            
            try {
                await promise;
                // If promise resolves, force failure
                throw new Error("Promise should have rejected due to timeout but resolved instead.");
            } catch (error) {
                expect(postMessageMock).toHaveBeenCalledTimes(1); // Verify request was sent
                expect(error).toBeInstanceOf(Error); // Check it's an Error object
                expect((error as Error).message).toMatch(/timed out after/); // Check message matches
            }
        });

        it("should resolve on response", async () => {
            const { postMessageMock, onMock } = setupTestEnvironment();
            const promise = sendRequest("okMethod", [], undefined, { sendRawOverride: postMessageMock });
            await new Promise(resolve => setImmediate(resolve));
            expect(postMessageMock).toHaveBeenCalledTimes(1);
            const reqId = postMessageMock.mock.calls[0][0].id;

            // Simulate response via listener
            simulateIncomingMessage(onMock, { jsonrpc: "2.0", id: reqId, result: "ok", clientId: "c-resp" });

            await expect(promise).resolves.toBe("ok");
        });

        it("should reject on error response", async () => {
            const { postMessageMock, onMock } = setupTestEnvironment();
            const promise = sendRequest("errMethod", [], undefined, { sendRawOverride: postMessageMock });
            await new Promise(resolve => setImmediate(resolve));
            expect(postMessageMock).toHaveBeenCalledTimes(1);
            const reqId = postMessageMock.mock.calls[0][0].id;

            // Simulate error response via listener
            const errObj = { code: -32000, message: "Simulated error", name: "SimulatedError" };
            simulateIncomingMessage(onMock, { jsonrpc: "2.0", id: reqId, error: errObj, clientId: "c-err" });

            // Expect it to be wrapped in InternalError
            await expect(promise).rejects.toMatchObject({ name: "InternalError", message: expect.stringContaining("Simulated error") });
        });

        it("should handle client serializer for result", async () => {
            const { postMessageMock, onMock } = setupTestEnvironment();
            const testDate = new Date();
            // Clear serializer mock before test
            if(mockSerializer.deserialize.mockClear) mockSerializer.deserialize.mockClear();

            // Pass client serializer and override to sendRequest
            const promise = sendRequest("getDate", [], undefined, { serializer: mockSerializer, sendRawOverride: postMessageMock });
            await new Promise(resolve => setImmediate(resolve));
            expect(postMessageMock).toHaveBeenCalledTimes(1);
            const reqId = postMessageMock.mock.calls[0][0].id;

            // Simulate response with serialized date
            const serializedResult = mockSerializer.serialize(testDate); // This call is expected
            simulateIncomingMessage(onMock, { jsonrpc: "2.0", id: reqId, result: serializedResult, clientId: "c-date" });

            // Check that the promise resolves with the *deserialized* date
            await expect(promise as any).resolves.toEqual(testDate);
            // Check deserialize was called
            expect(mockSerializer.deserialize).toHaveBeenCalledTimes(1);
            expect(mockSerializer.deserialize).toHaveBeenCalledWith(serializedResult);
        });
    });

     describe("Error Handling & Diagnostics", () => {
        // These tests don't involve RPC state/mocks, just call functions directly
        it("diagnoseRpcError: should format RpcError correctly", () => {
             const error = new MethodNotFound({ method: "x", details: "details" });
             const result = diagnoseRpcError(error);
             expect(result).toContain('Method not found: "x"');
             expect(result).toContain("details");
         });
 
         it("diagnoseRpcError: should format generic errors", () => {
             const genericError = new Error("Failure");
             genericError.stack = "stack trace here";
             const result = diagnoseRpcError(genericError);
             expect(result).toContain("RPC Error: Error: Failure");
             expect(result).toContain("stack trace here");
         });
     });
});
