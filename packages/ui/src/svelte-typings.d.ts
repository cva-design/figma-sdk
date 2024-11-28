import 'svelte/elements';

declare module 'svelte/elements' {
  export interface SvelteHTMLElements {
    Button: HTMLButtonAttributes;
    Action: HTMLButtonAttributes;
  }
}

declare module '*.svg?raw' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}
