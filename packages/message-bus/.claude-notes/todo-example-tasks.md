# Todo App Example Tasks

## Types (types.ts)
- ✂️ Remove complex validation with typia/tags - it distracts from the message bus usage
- ✂️ Remove validators export - validation should be simple and manual for the example
- ✂️ Remove EmptyObject import - use simple null for GetTodos

## Implementation (code.ts)
- ✂️ Remove try/catch blocks - keep error handling minimal
- ✂️ Remove validation logic - keep it simple
- 🔧 Add proper imports from the message bus package
- 🔧 Add proper comments explaining the message bus usage

## UI (ui.ts)
- ✂️ Remove error handling UI code
- ✂️ Remove validation checks
- 🔧 Add proper imports from the message bus package
- 🔧 Add better comments explaining the event subscription pattern

## Tests
- ✂️ Remove batch-operations.test.ts - too complex for a simple example
- ✂️ Remove error-handling.test.ts - too much focus on error cases
- ✂️ Remove todo-app.test.ts - too many integration tests
- 🔧 Keep only basic-crud.test.ts but simplify it
- 🔧 Add comments in tests explaining the message bus testing patterns

## Legend
- ✂️ Remove/Simplify
- ���� Add/Improve 