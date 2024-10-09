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

//@index(['*/index.svelte'], f => `export * as ${f.path.split('/').at(-2)} from '${f.path}${f.ext}';`)
export * as Button from './Button/index.svelte';
export * as Checkbox from './Checkbox/index.svelte';
export * as Disclosure from './Disclosure/index.svelte';
export * as DisclosureItem from './DisclosureItem/index.svelte';
export * as Icon from './Icon/index.svelte';
export * as IconButton from './IconButton/index.svelte';
export * as Input from './Input/index.svelte';
export * as Label from './Label/index.svelte';
export * as OnboardingTip from './OnboardingTip/index.svelte';
export * as Radio from './Radio/index.svelte';
export * as Section from './Section/index.svelte';
export * as SelectDivider from './SelectDivider/index.svelte';
export * as SelectItem from './SelectItem/index.svelte';
export * as SelectMenu from './SelectMenu/index.svelte';
export * as Switch from './Switch/index.svelte';
export * as Textarea from './Textarea/index.svelte';
export * as Type from './Type/index.svelte';
//@endindex
