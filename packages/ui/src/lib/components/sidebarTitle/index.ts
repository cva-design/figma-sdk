//@index(['./[^\.]+.svelte'], (f, {pascalCase}) => `export { default as ${pascalCase(f.path)} } from '${f.path}${f.ext}';`)
export { default as SidebarTitle } from './sidebarTitle.svelte';
//@endindex

//@index(['./[^\.]+.ts'], (f, {pascalCase}) => `export * from '${f.path}${f.ext}';`)

//@endindex
