import 'svelte/elements';

declare module 'svelte/elements' {
  export interface SvelteHTMLElements {
    Button: HTMLButtonAttributes;
    Action: HTMLButtonAttributes;
  }
}
