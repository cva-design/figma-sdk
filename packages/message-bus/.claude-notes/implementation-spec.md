# Message Bus Implementation Spec

## Core Types

### Message Envelope
```typescript
interface Envelope<Scope, Type, Name, Data> {
  $id: MsgId<Type, Name, Scope>; // e.g. "user:command/login"
  $type: Type;                   // "command" | "event" 
  $name: Name;                   // e.g. "login"
  $scope: Scope;                 // e.g. "user"
  message: Data;                 // Payload
}
```

### Command Response Types
```typescript
type Accepted = {
  status: 'accepted';
  message?: string;
}

type Rejected = {
  status: 'rejected'; 
  message?: string;
  errors: NonEmptyTuple<ValidationError>;
}
```

## Core Features

1. Command Handling
- One handler per command
- Must return Accepted/Rejected
- Runtime validation with Typia
- Error handling with detailed responses

2. Event Broadcasting
- Multiple listeners allowed
- No response expected
- Runtime validation
- Cleanup registration

3. Figma Event Integration
- Auto-detect Figma events
- Use figma.on/off for native events
- Convert to message bus events
- Handle cleanup

## Implementation Requirements

1. Message Validation
- Use Typia for runtime validation
- Validate all incoming/outgoing messages
- Support string/number/array constraints
- Handle nested object validation

2. Serialization
- Handle Map/Set serialization
- Deep clone messages
- Prevent circular references
- Handle Figma object serialization

3. Error Handling
- Detailed error messages
- Field-level validation errors
- Command rejection handling
- Event validation errors

4. Type Safety
- Full TypeScript support
- Command/Event registry types
- Validation schema generation
- IDE autocompletion

5. Memory Management
- Event listener cleanup
- Prevent memory leaks
- Handle large payloads
- Resource cleanup

## API Design

```typescript
class MessageBus<Commands, Events> {
  // Commands
  handleCommand<T extends keyof Commands>(
    name: T,
    handler: (data: Commands[T]) => Promise<Accepted | Rejected>
  ): void;

  sendCommand<T extends keyof Commands>(
    name: T,
    data: Commands[T]
  ): Promise<Accepted | Rejected>;

  // Events  
  publishEvent<T extends keyof Events>(
    name: T,
    data: Events[T]
  ): void;

  listenToEvent<T extends keyof Events>(
    name: T,
    handler: (data: Events[T]) => void
  ): () => void;

  // Utilities
  isFigmaEvent(name: string): boolean;
  createValidator<T>(): (data: unknown) => data is T;
}
```

## Implementation Notes

1. Use singleton pattern for message bus instance
2. Handle both UI and plugin contexts
3. Support scoped messages (domain:type/name)
4. Integrate with Figma's plugin API
5. Provide validation utilities
6. Handle async operations
7. Support cleanup/disposal
8. Maintain type safety
9. Prevent runtime errors
10. Enable debugging/logging

## Testing Requirements

1. Command handling
2. Event broadcasting
3. Validation logic
4. Error scenarios
5. Figma integration
6. Memory leaks
7. Type safety
8. Edge cases
9. Performance
10. Resource cleanup 

### 8. Edge Case Handling
- **Status**: [⚠️] TODO
- **Implementation**: `src/core/edge-cases/`
  - Circular reference detection
  - Large payload management
  - Resource cleanup
  - Error recovery

#### Circular References
- Detection algorithm
- Safe serialization
- Error reporting
- Recovery strategies

#### Large Payloads
- Chunking system
- Progress tracking
- Memory monitoring
- Batch processing

#### Resource Management
- Listener cleanup
- Memory limits
- Garbage collection
- Resource pooling

### 9. Performance Optimization
- **Status**: [⚠️] TODO
- **Implementation**: `src/core/performance/`
  - Message batching
  - Validation caching
  - Memory management
  - Metrics collection

#### Message Batching
- Operation grouping
- Transaction handling
- Rollback support
- Order preservation

#### Validation Optimization
- Schema caching
- Validator reuse
- Partial validation
- Validation batching

#### Memory Management
- Listener limits
- Cache eviction
- Queue management
- Resource monitoring

#### Performance Metrics
- Timing measurements
- Memory tracking
- Event monitoring
- Performance logging