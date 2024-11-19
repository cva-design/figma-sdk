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

//@index('./*.{png,jpg,jpeg,svg,gif}', (f, _) => `export { default as ${_.pascalCase(f.name).replace(/(_[0-9]+|$)/, 'Svg$1')} } from '${f.path}${f.ext}?raw';`)
export { default as LayerPolygonSvg_12 } from './layer-polygon-12.svg?raw';
export { default as LayerPolygonSvg_16 } from './layer-polygon-16.svg?raw';
export { default as LayerPolygonSvg_32 } from './layer-polygon-32.svg?raw';
export { default as LayerSectionSvg_16 } from './layer-section-16.svg?raw';
export { default as LayerStarSvg_12 } from './layer-star-12.svg?raw';
export { default as LayerStarSvg_16 } from './layer-star-16.svg?raw';
export { default as LayerStarSvg_32 } from './layer-star-32.svg?raw';
export { default as LayerWidgetSvg_16 } from './layer-widget-16.svg?raw';
export { default as ToolbarActionsSvg } from './toolbar-actions.svg?raw';
export { default as ToolbarArrowSvg } from './toolbar-arrow.svg?raw';
export { default as ToolbarCommentSvg } from './toolbar-comment.svg?raw';
export { default as ToolbarDevModeSvg } from './toolbar-dev-mode.svg?raw';
export { default as ToolbarEllipseSvg } from './toolbar-ellipse.svg?raw';
export { default as ToolbarFrameSvg } from './toolbar-frame.svg?raw';
export { default as ToolbarHandToolSvg } from './toolbar-hand-tool.svg?raw';
export { default as ToolbarLineSvg } from './toolbar-line.svg?raw';
export { default as ToolbarMoveSvg } from './toolbar-move.svg?raw';
export { default as ToolbarPenSvg } from './toolbar-pen.svg?raw';
export { default as ToolbarPencilSvg } from './toolbar-pencil.svg?raw';
export { default as ToolbarPolygonSvg } from './toolbar-polygon.svg?raw';
export { default as ToolbarRectangleSvg } from './toolbar-rectangle.svg?raw';
export { default as ToolbarRulerSvg } from './toolbar-ruler.svg?raw';
export { default as ToolbarScaleSvg } from './toolbar-scale.svg?raw';
export { default as ToolbarSectionSvg } from './toolbar-section.svg?raw';
export { default as ToolbarSliceSvg } from './toolbar-slice.svg?raw';
export { default as ToolbarStarSvg } from './toolbar-star.svg?raw';
export { default as ToolbarTextSvg } from './toolbar-text.svg?raw';
//@endindex
