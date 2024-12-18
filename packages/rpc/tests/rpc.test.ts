import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import type { JsonValue, JsonRpcRequest } from "../src/types";

// Add type declaration for figma
declare global {
	var figma: {
		ui: {
			postMessage: ReturnType<typeof vi.fn>;
			on: ReturnType<typeof vi.fn>;
		};
	};
}

// Initialize the global `figma` object before importing the module
globalThis.figma = {
	ui: {
		postMessage: vi.fn(),
		on: vi.fn(),
	},
};

// Import the module after `figma` is defined
import { init, handleRaw, sendRequest } from "../src/rpc";

describe("RPC Module", () => {
	const mockMethods = {
		test: vi.fn(),
		asyncTest: vi.fn().mockResolvedValue("result" as JsonValue),
		slow: vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(() => resolve('slow result'), 5000))),
	};

	beforeEach(() => {
		vi.clearAllMocks();
		vi.useFakeTimers();

		// Reassign mocks to ensure they're fresh for each test
		figma.ui.postMessage = vi.fn();
		figma.ui.on = vi.fn();

		// Initialize the RPC methods
		init(mockMethods);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	describe("handleRaw", () => {
		it("should handle valid RPC requests", () => {
			handleRaw({
				jsonrpc: "2.0",
				method: "test",
				params: ["arg"],
				id: 1,
			});
			expect(mockMethods.test).toHaveBeenCalledWith("arg");
		});

		it("should handle method not found", () => {
			const request: JsonRpcRequest = {
				jsonrpc: "2.0",
				method: "nonexistent",
				params: [],
				id: 1,
			};

			handleRaw(request);

			// Check if figma.ui.postMessage was called with the error
			expect(figma.ui.postMessage).toHaveBeenCalledWith(
				expect.objectContaining({
					error: expect.objectContaining({
						code: -32601,
						message: "Method not found",
					}),
				}),
			);
		});
	});

	describe("sendRequest", () => {
		it("should send request and receive response", async () => {
			// Capture the message sent via postMessage
			let sentMessage: JsonRpcRequest | undefined;
			figma.ui.postMessage = vi.fn((message: JsonRpcRequest) => {
				sentMessage = message;
				// Simulate receiving a response by triggering the message handler
				const response: JsonRpcRequest = {
					jsonrpc: "2.0",
					id: message.id,
					method: message.method,
					result: "result",
				};
				// Simulate the handler registered in the rpc module
				handleRaw(response);
			});

			const result = await sendRequest("asyncTest", ["arg"]);

			expect(figma.ui.postMessage).toHaveBeenCalled();
			expect(result).toBe("result");
		});

		it("should timeout after specified duration", async () => {
			// Mock postMessage without calling back
			figma.ui.postMessage = vi.fn();

			expect(sendRequest("slow", [], 50)).rejects.toThrow("Request slow timed out.");
			
			await vi.advanceTimersByTimeAsync(51);
		});
	});
});
