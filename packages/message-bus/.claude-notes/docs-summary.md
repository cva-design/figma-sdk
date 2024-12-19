# Message Bus Documentation Summary

## Package Overview
- Type-safe communication between plugin and UI
- Runtime validation of all messages
- Automatic Figma event handling
- Resource management utilities

## Core Concepts

### Message Types
1. Commands
   - Synchronous and asynchronous support
   - Can return data with Accepted response
   - Request-response pattern
   - One handler per command
   - Must return Accepted/Rejected
   - Validated at runtime
   - Handler must be in plugin code
   - Used for actions/queries

2. Events
   - Fire-and-forget pattern
   - Multiple listeners allowed
   - No response expected
   - Validated at runtime
   - Can be listened to anywhere
   - Used for notifications

### Type System
1. Message Envelope
   ```typescript
   interface Envelope<Scope, Type, Name, Data> {
     $id: MsgId<Type, Name, Scope>;  // e.g. "user:command/login"
     $type: Type;                    // "command" | "event" 
     $name: Name;                    // e.g. "login"
     $scope: Scope;                  // e.g. "user"
     message: Data;                  // Payload
   }
   ```

2. Registry Types
   ```typescript
   type CommandRegistry<T, Scope = ''> = {
     [K in keyof T]: Command<T[K], Scope>;
   };

   type EventRegistry<T, Scope = ''> = {
     [K in keyof T]: Event<T[K], Scope>;
   };
   ```

### Validation
1. Runtime Validation (Typia)
   - JSDoc annotations for constraints
   - String formats (email, UUID)
   - Numeric ranges
   - Array constraints
   - Object validation
   - Custom rules
   - Nested object validation
   - Optional field handling

## Features

### Command Handling
1. Registration
   ```typescript
   // With type inference
   messageBus.handleCommand<'SaveData'>('SaveData', async (data) => {
     // Handler implementation with typed data
   });
   ```

2. Dispatch
   ```typescript
   const result = await messageBus.sendCommand('SaveData', data);
   ```

3. Error Handling
   - Validation errors
   - Runtime errors
   - Type-safe error responses

### Event Broadcasting
1. Publishing
   ```typescript
   messageBus.publishEvent('DataChanged', payload);
   ```

2. Listening
   ```typescript
   const cleanup = messageBus.listenToEvent('DataChanged', (data) => {
     // Handler implementation
   });
   ```

3. Cleanup
   ```typescript
   // Always cleanup when component unmounts
   cleanup();
   ```

### Figma Integration
1. Native Events
   - SelectionChanged
   - CurrentPageChanged
   - DocumentChanged
   - PluginDataChanged
   - TimerScheduled
   - NetworkError
   - Run
   - NotificationClicked

2. Event Mapping
   ```typescript
   messageBus.listenToEvent('SelectionChanged', () => {
     const selection = figma.currentPage.selection;
   });
   ```

3. Context Handling
   - Plugin context
   - UI context
   - Message passing

## Dependencies

1. Required
   - Typia (runtime validation)
   - TypeScript (type system)
   - type-fest (utility types)

2. Peer Dependencies
   - Figma Plugin API

## Usage Patterns

### 0. Setup
```typescript
import { getMessageBus } from '@figma-plugin-sdk/message-bus';

// Define your message types
interface Commands {
  // ...
}

interface Events {
  // ...
}

// Create message bus instance
const messageBus = getMessageBus<Commands, Events>();
```

### 1. Basic Command Flow
```typescript
// Define types
interface Commands {
  SaveDocument: {
    name: string;
    content: string;
  };
}

// Create validator
const validator = typia.createValidator<Commands['SaveDocument']>();

// Handle command
messageBus.handleCommand('SaveDocument', async (data) => {
  if (!validator(data)) {
    return { status: 'rejected', errors: [...] };
  }
  // Implementation
});

// Send command
try {
  const result = await messageBus.sendCommand('SaveDocument', data);
  if (result.status === 'rejected') {
    // Handle error
  }
} catch (error) {
  // Handle error
}
```

### 2. Event Flow
```typescript
// Define types
interface Events {
  DocumentSaved: {
    name: string;
    timestamp: number;
  };
}

// Create validator
const validator = typia.createValidator<Events['DocumentSaved']>();

// Publish event
const payload = { name: 'doc', timestamp: Date.now() };
if (validator(payload)) {
  messageBus.publishEvent('DocumentSaved', payload);
}

// Listen to event
const cleanup = messageBus.listenToEvent('DocumentSaved', (data) => {
  if (validator(data)) {
    // Handle event
  }
});
```

## Best Practices

1. Type Safety
   - Define all types upfront
   - Use Typia validation
   - Handle validation errors
   - Avoid type assertions

2. Error Handling
   - Validate all inputs
   - Provide detailed errors
   - Handle async failures
   - Clean up resources

3. Resource Management
   - Clean up event listeners
   - Handle large payloads
   - Batch operations
   - Manage memory

4. Code Organization
   - Group related messages
   - Centralize types
   - Export validators
   - Document interfaces

5. Performance
   - Batch related operations
   - Validate before sending
   - Clean up unused listeners
   - Use appropriate event granularity

6. Plugin Architecture
   - Separate message types by domain
   - Use scoped messages for clarity
   - Handle plugin lifecycle events
   - Manage UI state efficiently

## Common Patterns

1. History Management
   - Track changes
   - Undo/redo
   - State persistence
   - Error recovery

2. UI Synchronization
   - State updates
   - Error propagation
   - Loading states
   - Batch updates

3. Plugin Communication
   - Context detection
   - Message passing
   - Error handling
   - State sync

## Limitations

1. Serialization
   - No circular references
   - No function serialization
   - Limited Figma object support
   - No SharedArrayBuffer
   - No WeakMap/WeakSet
   - No Symbol values

2. Events
   - No guaranteed order
   - May drop on reload
   - No delivery confirmation

3. Performance
   - Validation overhead
   - Serialization costs
   - Memory usage with large payloads

## Advanced Features

1. Custom Validation
   - Custom formats
   - Complex rules
   - Nested validation
   - Array validation

2. Batching
   - Event batching
   - Operation batching
   - Performance optimization

3. Plugin Features
   - Plugin data persistence
   - UI state management
   - Resource cleanup
   - Error recovery 

4. Context Features
   - Context detection
   - Environment checks
   - Plugin state management
   - UI state synchronization

5. Debug Features
   - Message logging
   - Validation tracing
   - Performance monitoring
   - Error tracking

## Edge Cases

### 1. Circular References
```typescript
// Detection and handling
const node = {
  id: 'node1',
  parent: null as any
};
node.parent = node; // Circular reference

// Serialization will throw error
messageBus.sendCommand('ProcessNode', { node }); // Error
```

### 2. Large Payloads
```typescript
// Chunking strategy
interface ChunkedPayload<T> {
  chunkId: number;
  totalChunks: number;
  data: Partial<T>;
}

// Batch processing
messageBus.handleCommand('ProcessLargeData', async (chunk: ChunkedPayload<T>) => {
  await processChunk(chunk);
  if (chunk.chunkId === chunk.totalChunks) {
    await finalizeProcessing();
  }
});
```

### 3. Resource Management
```typescript
// Cleanup pattern
const cleanup = messageBus.listenToEvent('DataChanged', handler);
try {
  // Use the event listener
} finally {
  cleanup(); // Always cleanup
}

// Memory management
interface ResourceManager {
  maxListeners: number;
  cleanupInterval: number;
  gcThreshold: number;
}
```

## Performance Considerations

### 1. Message Batching
```typescript
// Batch similar operations
interface BatchedChanges {
  operations: Array<{
    type: 'create' | 'update' | 'delete';
    payload: unknown;
  }>;
  timestamp: number;
}

// Process as single transaction
messageBus.handleCommand('ProcessBatch', async (batch) => {
  await transaction.begin();
  try {
    for (const op of batch.operations) {
      await processOperation(op);
    }
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
});
```

### 2. Validation Optimization
```typescript
// Cache validation schemas
const validationCache = new Map<string, ValidationSchema>();

// Reuse validators
function getValidator<T>(type: string): Validator<T> {
  if (!validationCache.has(type)) {
    validationCache.set(type, createValidator<T>());
  }
  return validationCache.get(type)!;
}
```

### 3. Memory Management
```typescript
// Listener cleanup
interface ListenerManager {
  maxListeners: number;
  inactiveTimeout: number;
  cleanupInterval: number;
}

// Resource limits
interface ResourceLimits {
  maxPayloadSize: number;
  maxListenersPerEvent: number;
  maxEventsInQueue: number;
}
```

### 4. Performance Metrics
```typescript
interface PerformanceMetrics {
  messageProcessingTime: number;
  validationTime: number;
  serializationTime: number;
  memoryUsage: {
    listeners: number;
    cache: number;
    queue: number;
  };
}
```