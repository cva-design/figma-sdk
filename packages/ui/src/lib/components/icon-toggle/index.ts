//@index(['./[^\.]+.svelte'], (f, {pascalCase}) => `export { default as ${pascalCase(f.path)} } from '${f.path}${f.ext}';`)
export { default as IconToggle } from './icon-toggle.svelte';
//@endindex

export type { ToggleState, ToggleStates } from './icon-toggle.svelte';
