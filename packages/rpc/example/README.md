# RPC Example - Figma Plugin Communication

This example demonstrates how to use the `@figma-plugin-sdk/rpc` library to establish type-safe communication between a Figma plugin's main code and its UI.

## Architecture Overview

The example follows a clean, modular architecture that separates concerns:

```
example/
├── code/               # Plugin main thread code
│   ├── api/            # Implementation of API methods
│   │   ├── index.ts    # Exports all API methods
│   │   └── ...         # Individual API method implementations
│   └── init.ts         # Main entry point that initializes the API
├── ui/                 # Plugin UI code
│   └── init.ts         # UI code that calls the plugin API
└── shared/             # Shared code between plugin and UI
    └── types.ts        # Type definitions shared by both sides
```

## Key Mechanics

### 1. Shared Interface Definition

The foundation of type-safe RPC is a shared interface definition in `shared/types.ts`. This ensures both sides agree on the API contract:

```typescript
// Define the API interface
export interface CodeApi {
  getComponentNameByKey: (type: "COMPONENT" | "COMPONENT_SET", key: string) => Promise<string>;
  getCurrentUser: () => User | null;
  notify: (message: string, options?: NotificationOptions) => "OK";
}
```

### 2. Plugin Code (Main Thread)

The plugin code sets up and implements the RPC server:

```typescript
// Import the RPC library
import { createAPI } from '@figma-plugin-sdk/rpc';

// Import the shared interface
import type { CodeApi } from '../shared/types';

// Import API implementations
import * as apiFunctions from './api/index';

// Initialize API with implementations
export const api: CodeApi = apiFunctions;
createAPI(api, { debug: true });
```

### 3. UI Code (iframe)

The UI code creates a client that can call the plugin's API methods:

```typescript
// Import the RPC library
import { createClient, diagnoseRpcError } from '@figma-plugin-sdk/rpc';

// Import the shared interface
import type { CodeApi } from '../shared/types';

// Create a type-safe client
const client = createClient<CodeApi>({ debug: true });

// Call methods
const componentName = await client.getComponentNameByKey('COMPONENT', 'your-component-key');
```

## Why This Structure?

### Shared Types Module

We use a separate `shared` directory for type definitions because:

1. **Single Source of Truth**: Having one definition used by both sides ensures they stay in sync
2. **Code Splitting**: Figma separates plugin code and UI code into different contexts
3. **Type Safety**: TypeScript ensures implementation and usage match the agreed interface
4. **Reduced Duplication**: Avoids having to maintain the same interface in multiple places

### Individual API Files

API implementations are split into individual files because:

1. **Maintainability**: Each method has its own file, making code easier to manage
2. **Modularity**: Methods can be developed and tested in isolation
3. **Clarity**: Each file has a clear, single responsibility
4. **Scalability**: Easy to add new methods without cluttering existing files

## Error Handling

The example demonstrates proper error handling with the `diagnoseRpcError` utility:

```typescript
try {
  await client.notify(JSON.stringify(circularData));
} catch (error) {
  console.error('Error with detailed diagnostics:', diagnoseRpcError(error));
}
```

## Common Patterns

### 1. API Method Implementation

```typescript
// Single-responsibility function with clear typing
export async function getComponentNameByKey(type: 'COMPONENT' | 'COMPONENT_SET', key: string): Promise<string> {
  const component = type === 'COMPONENT' 
    ? await figma.importComponentByKeyAsync(key) 
    : await figma.importComponentSetByKeyAsync(key);
  return component.name;
}
```

### 2. Proxy-Based Client Creation

The library creates a proxy object that intercepts method calls and routes them through the RPC mechanism:

```typescript
// The client automatically routes method calls through RPC
const result = await client.notify('Hello!');
```

## Getting Started

To run this example:

1. Copy the example structure to your Figma plugin
2. Adjust API methods to match your plugin's needs
3. Maintain the shared interface as you add or modify methods 