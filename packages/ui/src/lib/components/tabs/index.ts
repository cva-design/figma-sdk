//@index(['./[^\.]+.svelte'], (f, {pascalCase}) => `import { default as ${pascalCase(f.path)} } from '${f.path}${f.ext}';`)
import { default as TabsContent } from './tabs-content.svelte';
import { default as TabsList } from './tabs-list.svelte';
import { default as TabsTrigger } from './tabs-trigger.svelte';
//@endindex

//@index(['./[^\.]+.svelte'], (f, {pascalCase}) => `export { default as ${pascalCase(f.path)} } from '${f.path}${f.ext}';`)
export { default as TabsContent } from './tabs-content.svelte';
export { default as TabsList } from './tabs-list.svelte';
export { default as TabsTrigger } from './tabs-trigger.svelte';
export { default as Tabs } from './tabs.svelte';
//@endindex

//@index(['./[^\.]+.ts'], (f, {pascalCase}) => `export * from '${f.path}${f.ext}';`)

//@endindex

export const Tab = {
  Content: TabsContent,
  List: TabsList,
  Trigger: TabsTrigger,
};
