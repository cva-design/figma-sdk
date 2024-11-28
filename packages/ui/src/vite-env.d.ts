/// <reference types="vite/client" />

declare module '*?raw' {
  const content: string;
  export default content;
}

declare module '*.svg?raw' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.svelte' {
  import type { ComponentType } from 'svelte';
  const component: ComponentType;
  export default component;
}
