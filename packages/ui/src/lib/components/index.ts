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
export * from './action-group/index.ts';
export * from './button/index.ts';
export * from './checkbox/index.ts';
export * from './dialog/index.ts';
export * from './disclosure/index.ts';
export * from './icon-button/index.ts';
export * from './icon-toggle/index.ts';
export * from './icon/index.ts';
export * from './input/index.ts';
export * from './label/index.ts';
export * from './layer-tree/index.ts';
export * from './layer/index.ts';
export * from './onboarding-tip/index.ts';
export * from './popover/index.ts';
export * from './radio/index.ts';
export * from './section/index.ts';
export * from './select-menu/index.ts';
export * from './sidebar/index.ts';
export * from './slider/index.ts';
export * from './switch/index.ts';
export * from './tabs/index.ts';
export * from './text/index.ts';
export * from './textarea/index.ts';
export * from './tooltip/index.ts';
export * from './tree/index.ts';
//@endindex

//@index(['*/index.svelte'], (f, {pascalCase}) => `export { default as ${pascalCase(f.path.split('/').at(-2))} } from '${f.path}${f.ext}';`)

//@endindex

//@index(['*/types.ts'], f => `export * from '${f.path}';`)
export * from './layer/types';
export * from './select-menu/types';
export * from './tooltip/types';
export * from './tree/types';
//@endindex

export { Button } from './button';
export { Slider } from './slider';
// Export other components as they are migrated

export * from './action-group';
