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

//@index(['*/index'], (f, {pascalCase}) => `export * from '${f.path}${f.ext}';`)
export * from './action-group/index';
export * from './button/index';
export * from './disclosure/index';
export * from './icon-button/index';
export * from './icon-toggle/index';
export * from './icon/index';
export * from './input/index';
export * from './onboarding-tip/index';
export * from './popover/index';
export * from './radio/index';
export * from './select-menu/index';
export * from './sidebar/index';
export * from './switch/index';
export * from './tabs/index';
export * from './text/index';
export * from './title/index';
export * from './tag/index';
export * from './textarea/index';
export * from './tooltip/index';
export * from './tree/index';
export * from './layer-tree/index';
export * from './layer/index';
export * from '../next/checkbox/index';
//@endindex

//@index(['*/index.svelte'], (f, {pascalCase}) => `export { default as ${pascalCase(f.path.split('/').at(-2))} } from '${f.path}${f.ext}';`)

//@endindex

//@index(['*/types'], f => `export * from '${f.path}';`)
export * from './select-menu/types';
export * from './tooltip/types';
export * from './tree/types';
//@endindex
