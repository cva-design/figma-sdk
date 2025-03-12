# @figma-plugin-sdk/rpc

A lightweight RPC (Remote Procedure Call) implementation specifically designed for Figma plugins,
enabling seamless communication between plugin code and UI code.

## Features

- Type-safe RPC calls between Figma plugin and UI contexts
- Promise-based API with automatic request/response handling
- Comprehensive error handling and diagnostics
- Detailed error messages with context-aware suggestions
- Request timeout support
- Debug mode for troubleshooting
- TypeScript support with full type inference

## Installation

```bash
npm install @figma-plugin-sdk/rpc
# or
yarn add @figma-plugin-sdk/rpc
# or
pnpm add @figma-plugin-sdk/rpc
```

## Basic Usage

### Plugin Code (main thread)

```typescript
import { createAPI } from '@figma-plugin-sdk/rpc';

// Define your API methods
interface PluginAPI {
  getData(): Promise<SceneNode[]>;
  updateNode(id: string, props: any): Promise<boolean>;
}

// Implement the API methods
const api: PluginAPI = {
  async getData() {
    return figma.currentPage.selection;
  },

  async updateNode(id: string, props: any) {
    const node = figma.getNodeById(id);
    if (node) {
      Object.assign(node, props);
      return true;
    }
    return false;
  },
};

// Initialize the API
createAPI(api);

// Or with debug mode enabled
createAPI(api, { debug: true });
```

### UI Code

```typescript
import { createClient, diagnoseRpcError } from '@figma-plugin-sdk/rpc';

// Create the RPC client using the same interface
const client = createClient<PluginAPI>();

// Call methods
async function example() {
  try {
    // All calls are automatically promisified
    const selection = await client.getData();
    await client.updateNode('123', { x: 100, y: 100 });
  } catch (error) {
    // Use the diagnostic utility for better error messages
    console.error(diagnoseRpcError(error));
  }
}
```

## Advanced Usage

### Direct RPC Usage

For more control, you can use the lower-level RPC functions directly:

```typescript
import { init, sendRequest } from '@figma-plugin-sdk/rpc';

// Register API methods
init({
  getData: async () => figma.currentPage.selection,
  updateNode: async (id, props) => {
    const node = figma.getNodeById(id);
    if (node) {
      Object.assign(node, props);
      return true;
    }
    return false;
  }
}, { debug: true }); // Enable debug mode

// In UI code
const result = await sendRequest('getData');
```

### Error Handling

The library provides comprehensive error handling with detailed diagnostics:

```typescript
import { diagnoseRpcError } from '@figma-plugin-sdk/rpc';

try {
  await client.someMethod();
} catch (error) {
  // Get a detailed diagnostic message
  const diagnostics = diagnoseRpcError(error);
  console.error(diagnostics);
  
  // Check for specific error types
  if (error.name === 'MethodNotFound') {
    // Handle method not found error
  } else if (error.name === 'InvalidParams') {
    // Handle invalid parameters error
  }
}
```

### Handling Non-Serializable Data

When working with complex objects that may contain circular references or non-serializable data:

```typescript
// Create a serializable version of a complex object
function makeSerializable(complexObject) {
  return {
    ...complexObject,
    // Remove non-serializable properties
    circularRef: null,
    domNode: null,
  };
}

// Use in API calls
client.saveData(makeSerializable(myComplexObject));
```

## API Reference

### Core Functions

#### `createAPI(methods, options?)`

Initializes the RPC server with the provided methods.

- `methods`: Object containing the API methods
- `options`: Optional configuration
  - `timeout`: Request timeout in milliseconds (default: 6000)
  - `debug`: Enable debug logging (default: false)

#### `createClient(options?)`

Creates an RPC client for calling methods.

- `options`: Optional configuration
  - `timeout`: Request timeout in milliseconds (default: 6000)

#### `init(apiInstance, options?)`

Low-level function to initialize the RPC system with API methods.

- `apiInstance`: Object containing the API methods
- `options`: Optional configuration
  - `debug`: Enable debug logging (default: false)

#### `sendRequest(method, params?, timeout?)`

Low-level function to send an RPC request.

- `method`: The name of the method to call
- `params`: Array of parameters to pass to the method
- `timeout`: Request timeout in milliseconds (default: 6000)

### Error Handling

#### `diagnoseRpcError(error)`

Utility function to generate detailed diagnostic information for RPC errors.

- `error`: The error object from a failed RPC call
- Returns: A formatted diagnostic message with context-aware suggestions

### Error Types

The library includes the following error types:

- `ParseError` (-32700): Invalid JSON was received
- `InvalidRequest` (-32600): The JSON sent is not a valid request object
- `MethodNotFound` (-32601): The method does not exist or is unavailable
- `InvalidParams` (-32602): Invalid method parameters
- `InternalError` (-32603): Internal JSON-RPC error

## Debugging

Enable debug mode to get detailed logs of RPC activity:

```typescript
// In plugin code
createAPI(api, { debug: true });

// Or with low-level API
init(apiMethods, { debug: true });
```

Debug logs include:
- Method registration
- Request/response details
- Error information
- Available methods

## Common Issues and Solutions

### Method Not Found Errors

If you encounter "Method not found" errors:

1. Ensure the method is registered on the receiving end
2. Check for typos in the method name
3. Verify that the API is properly initialized
4. Check that the method is exported correctly

### Serialization Errors

If you encounter serialization errors:

1. Check for circular references in your objects
2. Remove DOM nodes or other non-serializable data
3. Use a serialization helper function to clean objects before sending

### Timeout Errors

If requests are timing out:

1. Increase the timeout value
2. Check for long-running operations in your methods
3. Ensure promises are being properly resolved or rejected

## License

MIT License - see LICENSE file for details
