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

//@index(['*/index.svelte'], f => `export { default as ${f.path.split('/').at(-2)} } from '${f.path}${f.ext}';`)
export { default as Button } from './Button/index.svelte';
export { default as Checkbox } from './Checkbox/index.svelte';
export { default as Disclosure } from './Disclosure/index.svelte';
export { default as DisclosureItem } from './DisclosureItem/index.svelte';
export { default as Icon } from './Icon/index.svelte';
export { default as IconButton } from './IconButton/index.svelte';
export { default as Input } from './Input/index.svelte';
export { default as Label } from './Label/index.svelte';
export { default as OnboardingTip } from './OnboardingTip/index.svelte';
export { default as Radio } from './Radio/index.svelte';
export { default as Section } from './Section/index.svelte';
export { default as SelectDivider } from './SelectDivider/index.svelte';
export { default as SelectItem } from './SelectItem/index.svelte';
export { default as SelectMenu } from './SelectMenu/index.svelte';
export { default as Switch } from './Switch/index.svelte';
export { default as Textarea } from './Textarea/index.svelte';
export { default as Type } from './Type/index.svelte';
//@endindex
