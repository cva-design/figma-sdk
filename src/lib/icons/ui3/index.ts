/**
 * Automatic Index (vscode snippet: cva-index)
 * 1. Install the extension: JayFong.generate-index
 * 2. Open VS Commands [⌘-⇧-P] and select 'Generate Index'
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
 * @index('./______________', (patterns,changeCase,extraInfo) => '*
' + JSON.stringify({patterns,changeCase,extraInfo}, null, 2).split('
').map(s => ` * s`).join('
') + '
 *')
 *
 * @endindex
 *
 * @see {@link https://github.com/fjc0k/vscode-generate-index | vscode-generate-index}
 *  For `@index` function documentation.
 * @see {@link https://github.com/blakeembrey/change-case/tree/main/packages/change-case | change-case}
 *  For `changeCase` object documentation.
 */

//@index(['./*.svg', './**/index.*'], f => `export * from '${f.path}${f.ext === '.ts' ? '' : f.ext}';`)
export * from './toolbar-actions.svg';
export * from './toolbar-arrow.svg';
export * from './toolbar-comment.svg';
export * from './toolbar-dev-mode.svg';
export * from './toolbar-ellipse.svg';
export * from './toolbar-frame.svg';
export * from './toolbar-hand-tool.svg';
export * from './toolbar-line.svg';
export * from './toolbar-move.svg';
export * from './toolbar-pen.svg';
export * from './toolbar-pencil.svg';
export * from './toolbar-polygon.svg';
export * from './toolbar-rectangle.svg';
export * from './toolbar-ruler.svg';
export * from './toolbar-scale.svg';
export * from './toolbar-section.svg';
export * from './toolbar-slice.svg';
export * from './toolbar-star.svg';
export * from './toolbar-text.svg';
//@endindex
