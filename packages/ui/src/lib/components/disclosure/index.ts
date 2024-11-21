//@index(['./[^\.]+.svelte'], (f, {pascalCase}) => `export { default as ${pascalCase(f.path)} } from '${f.path}${f.ext}';`)
export { default as DisclosureItem } from './disclosure-item.svelte';
export { default as Disclosure } from './disclosure.svelte';
//@endindex
