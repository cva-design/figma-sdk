//@index(['./[^\.]+.svelte'], (f, {pascalCase}) => `export { default as ${pascalCase(f.path)} } from '${f.path}${f.ext}';`)
export { default as Condition } from './condition.svelte';
//@endindex

//@index(['./[^\.]+.ts'], (f, {pascalCase}) => `export * from '${f.path}${f.ext}';`)
export * from './types';
//@endindex