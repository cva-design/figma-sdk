//@index(['./[^\.]+.svelte'], (f, {pascalCase}) => `export { default as ${pascalCase(f.path)} } from '${f.path}${f.ext}';`)
export { default as DialogTitle } from './dialog-title.svelte';
export { default as Dialog } from './dialog.svelte';
//@endindex
