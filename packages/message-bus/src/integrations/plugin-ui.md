# PluginUIIntegration

The `PluginUIIntegration` class serves as a bridge between a Figma plugin's UI and its core functionality. It manages bidirectional communication between the plugin's UI (iframe) and the Figma plugin environment through a message bus system.

## Purpose

This class solves several key challenges in Figma plugin development:

1. **Safe Communication**: It provides a safe way to send and receive messages between the plugin's UI and the Figma environment
2. **Event Management**: Handles various UI-related events like visibility changes and window resizing
3. **Error Handling**: Provides centralized error handling for all UI-related operations
4. **Type Safety**: Uses TypeScript generics to ensure type safety for commands and events

## Usage Example

~~~typescript
// Create a message bus instance
const messageBus = new MessageBus<MyCommands, MyEvents>();

// Initialize the UI integration
const ui = new PluginUIIntegration(messageBus);

// Setup event handlers
ui.onUIMessage((message) => {
  console.log('Received message from UI:', message);
});

ui.onVisibilityChange((visible) => {
  console.log('UI visibility changed:', visible);
});

ui.onResize(({ width, height }) => {
  console.log('UI resized:', width, height);
});

ui.onError((error) => {
  console.error('UI error:', error);
});

// Initialize the integration
ui.initialize();
~~~

## Key Features

### Message Handling
- `sendToUI(message)`: Sends messages to the UI
- `onUIMessage(handler)`: Registers handlers for incoming UI messages

### UI State Management
- `onVisibilityChange(handler)`: Monitors UI visibility state
- `onResize(handler)`: Tracks UI window dimensions
- `onError(handler)`: Handles errors in UI operations

### Lifecycle Management
- `initialize()`: Sets up event listeners
- `cleanup()`: Removes all event listeners

## Internal Architecture

The class uses several private collections to manage different types of event handlers:

- `eventHandlers`: Generic event handlers
- `errorHandlers`: Error-specific handlers
- `visibilityHandlers`: UI visibility state handlers
- `resizeHandlers`: UI dimension change handlers
- `messageHandlers`: Message processing handlers

All event processing is wrapped in try-catch blocks to ensure robust error handling and prevent crashes.

## Integration with MessageBus

The class integrates with a `MessageBus` instance to:
1. Forward errors from the message bus to UI error handlers
2. Maintain type safety through TypeScript generics
3. Handle both custom events and Figma-specific events

## Best Practices

1. Always initialize the integration before use
2. Clean up when the plugin is closed to prevent memory leaks
3. Handle errors appropriately using the error handling system
4. Use TypeScript generics to ensure type safety of commands and events
  </rewritten_file> 