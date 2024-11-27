//@index(['./[^\.]+.svelte'], (f, {pascalCase}) => `export { default as ${pascalCase(f.path)} } from '${f.path}${f.ext}';`)
export { default as Checkbox } from './checkbox.svelte';
//@endindex

//@index(['./[^\.]+.svelte'], (f, {pascalCase}) => `export * from '${f.path}${f.ext}';`)
export * from './checkbox.svelte';
//@endindex
