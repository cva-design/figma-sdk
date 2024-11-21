//@index(['./[^\.]+.svelte'], (f, {pascalCase}) => `export { default as ${pascalCase(f.path)} } from '${f.path}${f.ext}';`)
export { default as TabsContent } from './tabs-content.svelte';
export { default as TabsList } from './tabs-list.svelte';
export { default as TabsTrigger } from './tabs-trigger.svelte';
export { default as Tabs } from './tabs.svelte';
//@endindex

//@index(['./[^\.]+.ts'], (f, {pascalCase}) => `export * from '${f.path}${f.ext}';`)

//@endindex
