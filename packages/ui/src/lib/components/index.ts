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

//@index(['*/index.ts'], (f, {pascalCase}) => `export * from '${f.path}';`)
export * from './action-group/index';
export * from './badge/index';
export * from './button/index';
export * from './checkbox/index';
export * from './criteria/index';
export * from './disclosure/index';
export * from './icon-button/index';
export * from './icon-toggle/index';
export * from './icon/index';
export * from './input/index';
export * from './layer-tree/index';
export * from './layer/index';
export * from './onboarding-tip/index';
export * from './popover/index';
export * from './radio/index';
export * from './condition/index';
export * from './criteria/index';
export * from './select-menu/index';
export * from './set/index';
export * from './sidebar-title/index';
export * from './sidebar/index';
export * from './switch/index';
export * from './tabs/index';
export * from './textarea/index';
export * from './tooltip/index';
export * from './typography/index';
//@endindex

//@index(['*/index.svelte'], (f, {pascalCase}) => `export { default as ${pascalCase(f.path.split('/').at(-2))} } from '${f.path}${f.ext}';`)

//@endindex

//@index(['*/types.ts'], f => `export * from '${f.path}';`)
export * from './criteria/types';
export * from './icon/types';
export * from './layer-tree/types';
export * from './layer/types';
export * from './condition/types';
export * from './criteria/types';
export * from './select-menu/types';
export * from './set/types';
export * from './tooltip/types';
//@endindex
