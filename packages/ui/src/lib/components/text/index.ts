//@index(['./[^\.]+.svelte'], (f, {pascalCase}) => `export { default as ${pascalCase(f.path)} } from '${f.path}${f.ext}';`)
export { default as Label } from './label.svelte';
export { default as Link } from './link.svelte';
export { default as Paragraph } from './paragraph.svelte';
export { default as Text } from './text.svelte';
//@endindex

//@index(['./[^\.]+.ts'], (f, {pascalCase}) => `export * from '${f.path}${f.ext}';`)

//@endindex
