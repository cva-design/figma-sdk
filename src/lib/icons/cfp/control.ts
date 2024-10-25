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

//@index(['./size-8/*.svg', './size-12/*.svg'], (f, {pascalCase}) => `export { default as Control${pascalCase(f.name).replace(/_[0-9]+/, 'Svg')} } from '${f.path}${f.ext}?raw';`)
export { default as ControlCheckboxCheckedSvg } from './size-12/checkbox-checked-12.svg?raw';
export { default as ControlCheckboxMixedSvg } from './size-12/checkbox-mixed-12.svg?raw';
export { default as ControlChevronDownSvg } from './size-8/chevron-down-8.svg?raw';
export { default as ControlChevronUpSvg } from './size-8/chevron-up-8.svg?raw';
//@endindex
