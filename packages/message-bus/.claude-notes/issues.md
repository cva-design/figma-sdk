# Issues Found in Codebase

## Type Issues

### src/integrations/figma.ts

1. ✅ Event Handler Type Mismatches
   - ✅ Event names in `setupEventListener` now match `FigmaEvent` enum
   - ✅ Using proper event names from `FigmaEvent` enum
   - ✅ Fixed events: PluginRun, PluginClose, SelectionChanged, ViewportChanged, TimerStart, TimerStop, TimerPause, TimerResume

2. ✅ Event Payload Type Mismatches
   - ✅ Event payloads now match expected types in `FigmaEventMap`
   - ✅ Properly typed and structured event payloads
   - ✅ Fixed events: StateUpdated, ContextInitialized, Error

3. ✅ Missing Event Handler Arguments
   - ✅ Added proper handler storage and cleanup using Map
   - ✅ Implemented proper handler tracking for figma.off() calls

### src/integrations/plugin-ui.ts

1. ✅ Message ID Format Issues
   - ✅ Message ID format now matches expected pattern
   - ✅ Added proper scope-based IDs: `${scope}:${type}/${name}`

2. ✅ Type Safety Issues
   - ✅ Replaced `null` with `undefined` for type safety
   - ✅ Improved type safety in message handling

3. ✅ Timer Type Issues
   - ✅ Updated setTimeout return type to use ReturnType<typeof setTimeout>
   - ✅ Proper timer cleanup implementation

4. ✅ Loop Style Issues
   - ✅ Replaced `forEach` with `for...of` loops
   - ✅ Improved iteration patterns

### src/types/figma-events.ts

1. ✅ Registry Type Issues
   - ✅ Added proper generic type arguments to `EventRegistry` and `CommandRegistry`
   - ✅ Implemented scoped registries with proper type safety

## Code Style Issues

1. ✅ Array Iteration
   - ✅ Replaced `forEach` with `for...of` in multiple locations
   - ✅ Fixed in src/integrations/plugin-ui.ts

2. ✅ Error Handling
   - ✅ Replaced generic `any` type with proper error typing
   - ✅ Added proper error object handling

## Architecture Issues

1. ✅ Event System
   - ✅ Standardized event naming between Figma API and internal events
   - ✅ Implemented consistent event naming convention

2. ✅ Type Safety
   - ✅ Removed several type assertions using `as`
   - ✅ Improved type definitions to reduce need for assertions

## Potential Improvements

1. ✅ Event Handler Management
   - ✅ Created a central registry for event handlers
   - ✅ Implemented proper cleanup mechanism

2. ✅ Type Definitions
   - ✅ Created more specific types for event payloads
   - ✅ Reduced usage of `any` and improved type assertions

3. ✅ Error Handling
   - ✅ Implemented structured error types
   - ✅ Added proper error handling mechanisms

4. ✅ Message Bus
   - ✅ Improved type safety of message passing
   - ✅ Added validation for message formats

## Next Steps

1. High Priority
   - ✅ Fixed event handler type mismatches
   - ✅ Corrected message ID format
   - ✅ Fixed registry type arguments

2. Medium Priority
   - ✅ Replaced forEach with for...of
   - ✅ Improved error typing
   - ✅ Fixed timer type issues

3. Low Priority
   - ✅ Refactored event system
   - ✅ Implemented structured error handling
   - ✅ Added comprehensive validation 