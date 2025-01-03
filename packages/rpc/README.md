# @figma-plugin-sdk/rpc

A lightweight RPC (Remote Procedure Call) implementation specifically designed for Figma plugins,
enabling seamless communication between plugin code and UI code.

## Features

- Type-safe RPC calls between Figma plugin and UI contexts
- Promise-based API
- Automatic request/response handling
- Error propagation
- Request timeout support
- TypeScript support with full type inference

## Installation

```bash
npm install @figma-plugin-sdk/rpc
# or
yarn add @figma-plugin-sdk/rpc
# or
pnpm add @figma-plugin-sdk/rpc
```

## Usage

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
```

### UI Code

```typescript
import { createClient } from '@figma-plugin-sdk/rpc';

// Create the RPC client using the same interface
const client = createClient<PluginAPI>();

// Call methods
async function example() {
  // All calls are automatically promisified
  const selection = await client.getData();
  await client.updateNode('123', { x: 100, y: 100 });
}
```

## API Reference

### `createAPI(methods, options?)`

Initializes the RPC server with the provided methods.

- `methods`: Object containing the API methods
- `options`: Optional configuration
  - `timeout`: Request timeout in milliseconds (default: 6000)

### `createClient(stubClass, options?)`

Creates an RPC client for calling methods.

- `stubClass`: Class or interface defining the API methods
- `options`: Optional configuration
  - `timeout`: Request timeout in milliseconds (default: 6000)

## Type Safety

The library provides full TypeScript support with:

- Automatic promise type inference
- Parameter type checking
- Return type inference
- Error type propagation

## Error Handling

The library includes built-in error handling for common RPC scenarios:

- Parse errors (`-32700`)
- Invalid requests (`-32600`)
- Method not found (`-32601`)
- Invalid parameters (`-32602`)
- Internal errors (`-32603`)
- Request timeouts

## License

MIT License - see LICENSE file for details
