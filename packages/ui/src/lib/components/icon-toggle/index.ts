//@index(['./[^\.]+.svelte'], (f, {pascalCase}) => `export { default as ${pascalCase(f.path)} } from '${f.path}${f.ext}';`)
export { default as IconToggle } from './icon-toggle.svelte';
//@endindex

export * from './icon-toggle.svelte';
