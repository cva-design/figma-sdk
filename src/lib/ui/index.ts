/**
 * Automatic Index (vscode snippet: cva-index)
 * 1. Install the extension: JayFong.generate-index
 * 2. Open VS Commands [ ⌘-⇧-P ] and select 'Generate Index'
 * 3. Edit the @index() function call to do what you want
 *
 * ## Cheat Sheet
 *
 * @index(
 *    patterns: string | string[],
 *    codeGenerator: (
 *      parsedPath: {path, name, ext}, // path and name do NOT include the extension
 *      changeCase: { noCase, pathCase, camelCase, ...}, // all props are `fn(string) => string` (see change-case lib link below)
 *      extraInfo: { total: number, index: number, isFirst: boolean, isLast: boolean, isDir: boolean, isFile: boolean }
 *     ) => string,
 *    globbyOptions?: GlobbyOptions,
 * ) => string
 *
 * @example Fill the blank below with the name of a file in this folder to see the output
 *
 * @index('./______________', (patterns,changeCase,extraInfo) => '*\n' + JSON.stringify({patterns,changeCase,extraInfo}, null, 2).split('\n').map(s => ` * ${s}`).join('\n') + '\n *')

 * @endindex
 *
 * @see {@link https://github.com/fjc0k/vscode-generate-index | vscode-generate-index}
 *  For `@index` function documentation.
 * @see {@link https://github.com/blakeembrey/change-case/tree/main/packages/change-case | change-case}
 *  For `changeCase` object documentation.
 */

//@index(['*/index.ts'], (f, {pascalCase}) => `export * from '${f.path}${f.ext}';`)
export * from './button/index.ts';
export * from './checkbox/index.ts';
export * from './icon/index.ts';
export * from './popover/index.ts';
export * from './select-menu/index.ts';
export * from './slider/index.ts';
export * from './tooltip/index.ts';
export * from './tree/index.ts';
//@endindex

//@index(['*/index.svelte'], (f, {pascalCase}) => `export { default as ${pascalCase(f.path.split('/').at(-2))} } from '${f.path}${f.ext}';`)
export { default as Disclosure } from './disclosure/index.svelte';
export { default as IconButton } from './icon-button/index.svelte';
export { default as Input } from './Input/index.svelte';
export { default as Label } from './label/index.svelte';
export { default as OnboardingTip } from './onboarding-tip/index.svelte';
export { default as Radio } from './radio/index.svelte';
export { default as Section } from './section/index.svelte';
export { default as Switch } from './switch/index.svelte';
export { default as Textarea } from './textarea/index.svelte';
export { default as Type } from './type/index.svelte';
//@endindex

//@index(['*/types.ts'], f => `export * from '${f.path}';`)
export * from './layer/types';
export * from './select-menu/types';
export * from './tree/types';
//@endindex

export { Button } from './button';
export { Slider } from './slider';
// Export other components as they are migrated
