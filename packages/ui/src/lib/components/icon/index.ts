//@index(['./[^\.]+.svelte'], (f, {pascalCase}) => `export { default as ${pascalCase(f.path)} } from '${f.path}${f.ext}';`)
export { default as Icon } from './icon.svelte';
export { default as Svg } from './svg.svelte';
//@endindex
