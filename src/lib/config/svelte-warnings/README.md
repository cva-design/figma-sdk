# Vite Plugin: Svelte Warnings

This Vite plugin allows you to manage Svelte compiler warnings in your project by either disabling specific warnings or showing only specific warnings.

## Installation

```bash
npm install --save-dev @cva.design/figma-sdk
# or
yarn add --dev @cva.design/figma-sdk
# or
pnpm add --save-dev @cva.design/figma-sdk
```

## Usage

In your `vite.config.ts` or `vite.config.js` file:

```typescript
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteWarnings } from '@cva.design/figma-sdk/config/svelte-warnings';

export default defineConfig({
  plugins: [
    svelte(),
    svelteWarnings({
      disable: [/css-unused-selector/, (warning) => warning.code === 'unused-export-let', 'a11y-missing-attribute'],
      showSummary: true,
    }),
  ],
  // ... other configuration options
});
```

## API

### `svelteWarnings(config: SvelteWarningsConfig)`

Creates a Vite plugin that manages Svelte compiler warnings.

#### Parameters

- `config`: An object with the following properties:
  - `disable`: (Optional) An array of `WarningMatcher`s to disable specific warnings.
  - `only`: (Optional) An array of `WarningMatcher`s to show only specific warnings.
  - `showSummary`: (Optional) A boolean to enable displaying a summary of ignored warnings at the end of compilation.

  Note: You can specify either `disable` or `only`, but not both. Attempting to use both will throw an error.

Each `WarningMatcher` can be:

- A `RegExp` to test against the warning code
- A function that takes a `Warning` object and returns a boolean
- A string to match exactly against the warning code (including known Svelte warning codes)

#### Returns

A Vite plugin object.

## Examples

### Disabling specific warnings

```typescript
svelteWarnings({
  disable: [/css-unused-selector/, (warning) => warning.code === 'unused-export-let', 'a11y-missing-attribute'],
  showSummary: true,
});
```

### Showing only specific warnings

```typescript
svelteWarnings({
  only: ['missing-custom-element-compile-options', (warning) => warning.code.startsWith('a11y-')],
});
```

## Notes

- This plugin works by modifying the `onwarn` function of the Svelte compiler configuration in the Vite Svelte plugin.
- It preserves any existing `onwarn` function, allowing you to use both this plugin and a custom `onwarn` function in your Vite config.
- The plugin has an `enforce: 'post'` configuration to ensure it runs after the Svelte plugin.
- When `showSummary` is enabled, a summary of ignored warnings will be displayed at the end of compilation, categorized by the first word of the warning code.
- The plugin includes a comprehensive list of known Svelte warning codes, which can be used as string matchers.

## Error Handling

The plugin will throw an error if both `disable` and `only` are specified in the configuration. Make sure to use only one of these options.

## License

MIT
