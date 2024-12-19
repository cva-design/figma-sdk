# @figma-plugin-sdk/message-bus

A type-safe message bus implementation for Figma plugins that handles bi-directional communication between the main thread and UI thread.

## Features

- 🔒 Type-safe message passing with TypeScript
- 🔄 Bi-directional communication between main and UI threads
- 📦 Command and Event system with registries
- 🎯 Automatic routing of messages to the correct thread
- 🗺️ Support for Map objects in messages
- 🔌 Built-in Figma event handling

## Installation

```bash
npm install @figma-plugin-sdk/message-bus
# or
yarn add @figma-plugin-sdk/message-bus
# or
pnpm add @figma-plugin-sdk/message-bus
```

## Quick Start

1. Define your command and event types:

```typescript
// types.ts
import type { JsonObject } from '@figma-plugin-sdk/message-bus';

export interface TodoCommands {
  AddTodo: {
    text: string;
    completed?: boolean;
  };

  ToggleTodo: {
    id: string;
  };

  DeleteTodo: {
    id: string;
  };
}

export interface TodoEvents {
  TodoAdded: {
    id: string;
    text: string;
    completed: boolean;
  };

  TodoToggled: {
    id: string;
    completed: boolean;
  };

  TodoDeleted: {
    id: string;
  };
}
```

2. Create a message bus instance:

```typescript
// messageBus.ts
import { getMessageBus } from '@figma-plugin-sdk/message-bus';
import type { TodoCommands, TodoEvents } from './types';

export const messageBus = getMessageBus<TodoCommands, TodoEvents>();
```

3. Use in your main thread:

```typescript
// code.ts
import { messageBus } from './messageBus';

// Handle commands
messageBus.handleCommand('AddTodo', async ({ text, completed = false }) => {
  const id = Math.random().toString(36).slice(2);
  // Add todo to storage...

  // Publish event
  messageBus.publishEvent('TodoAdded', { id, text, completed });
});

// Listen to Figma events
messageBus.listenToEvent('SelectionChanged', () => {
  // Handle selection change...
});
```

4. Use in your UI:

```typescript
// ui.ts
import { messageBus } from './messageBus';

// Send commands
function addTodo(text: string) {
  messageBus.sendCommand('AddTodo', { text });
}

// Listen to events
messageBus.listenToEvent('TodoAdded', ({ id, text, completed }) => {
  // Update UI...
});
```

## Documentation

For detailed documentation and examples, see the [docs folder](./docs).

## License

MIT
