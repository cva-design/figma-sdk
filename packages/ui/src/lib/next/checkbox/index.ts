//@index(['./[^\.]+.svelte'], (f, {pascalCase}) => `export { default as ${pascalCase(f.path)} } from '${f.path}${f.ext}';`)
export { default as Checkbox } from './checkbox.svelte';
// export { default as MeltCheckbox } from './melt-checkbox.svelte';
// export { default as OldCheckbox } from './old-checkbox.svelte';
//@endindex
