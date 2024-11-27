//@index(['./[^\.]+.svelte'], (f, {pascalCase}) => `export { default as ${pascalCase(f.path)} } from '${f.path}${f.ext}';`)
export { default as DialogTitle } from './dialog-title.svelte';
export { default as Dialog } from './dialog.svelte';
//@endindex

//@index(['./[^\.]+.svelte'], (f, {pascalCase}) => `export * from '${f.path}${f.ext}';`)
export * from './dialog-title.svelte';
export * from './dialog.svelte';
//@endindex
