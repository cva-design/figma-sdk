# Message Bus Testing Specification

## Folder Structure

```
tests/
├── core/                     # Core functionality tests
│   ├── commands.test.ts     # Command handling
│   ├── events.test.ts       # Event broadcasting
│   └── validation.test.ts   # Message validation
│
├── integration/             # Integration tests
│   ├── figma/              # Figma-specific integration
│   │   ├── events.test.ts  # Figma event handling
│   │   └── plugin.test.ts  # Plugin lifecycle
│   └── ui/                 # UI integration tests
│       └── ui.test.ts      # Plugin-UI communication
│
├── edge-cases/             # Edge cases & error handling
│   ├── errors.test.ts      # Error scenarios
│   └── complex-data.test.ts # Complex data handling
│
├── examples/              # Example implementations
│   └── todo-app/         # Todo app example
│       ├── basic-crud.test.ts    # Basic CRUD operations
│       └── error-handling.test.ts # Error handling
│
└── utils/                # Shared test utilities
    ├── helpers.ts       # Test helpers and utilities
    └── types.ts         # Shared type definitions
```

## Test Suites

### 1. Core Functionality (`tests/core/`)

#### 1.1 Command Handling (`commands.test.ts`)
- **Basic Command Flow**
  - Command validation and handling
  - Response types (Accepted/Rejected)
  - Optional fields and payload validation

#### 1.2 Event Broadcasting (`events.test.ts`)
- **Event Handling**
  - Event validation and broadcasting
  - Multiple listeners and cleanup
  - Fire-and-forget behavior

#### 1.3 Message Validation (`validation.test.ts`)
- **Validation Rules**
  - Data type validation (strings, numbers, arrays)
  - Format validation (email, UUID)
  - Complex object validation
  - Custom validation rules

### 2. Integration Tests (`tests/integration/`)

#### 2.1 Figma Integration (`figma/*.test.ts`)
- Plugin lifecycle and event handling
- Document and selection changes
- Plugin data management

#### 2.2 UI Integration (`ui/ui.test.ts`)
- Event registration and handling
- Message flow between plugin and UI
- State synchronization

### 3. Edge Cases & Error Handling (`tests/edge-cases/`)
- Validation and runtime errors
- Complex data structures
- API error scenarios
- Resource cleanup

### 4. Example Apps

#### 4.1 Todo App Example (`examples/todo-app/`) ✅
A simple example demonstrating basic message bus usage.

##### Basic CRUD Operations (`basic-crud.test.ts`) ✅
- [x] Add todo with validation
- [x] Update todo with optional fields
- [x] Delete todo by id
- [x] Get todos list
- [x] Event broadcasting for all operations

##### Error Handling (`error-handling.test.ts`) ✅
- [x] Validation errors (empty text, invalid UUID)
- [x] Runtime errors (todo not found)
- [x] Error event broadcasting

## Implementation Guidelines

### 1. Test Organization
- Group related tests in dedicated files
- Use descriptive test names
- Follow consistent naming patterns
- Maintain single responsibility per test

### 2. Best Practices
- Clean up resources after tests
- Mock external dependencies
- Use meaningful test data
- Keep tests focused and concise
- Validate event propagation
- Test error scenarios thoroughly

### 3. Coverage Requirements
- 100% coverage of core functionality
- 90%+ coverage of integration code
- All error paths tested

### 4. Naming Conventions
- Pattern: `Category > Subcategory > should <expected behavior>`
- Keep names consistent across related tests
- Use proper casing and spacing

## Test Implementation Checklist

### 1. Core Message Bus ✅
- [x] Command handling
- [x] Event broadcasting
- [x] Message validation
- [x] Error handling

### 2. Integration Tests ✅
- [x] Figma integration
- [x] UI communication
- [x] State management

### 3. Example Apps ✅
- [x] Todo App
  - [x] Basic CRUD operations
  - [x] Error handling
  - [x] Event broadcasting

### 4. Documentation ✅
- [x] Testing specification
- [x] Code documentation
- [x] Best practices
- [x] Examples
