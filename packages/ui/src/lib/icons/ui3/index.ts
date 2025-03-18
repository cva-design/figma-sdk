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
export { default as BooleanPropertySvg_24 } from './boolean-property-24.svg?raw';
export { default as ColorPalettePropertySvg_16 } from './color-palette-property-16.svg?raw';
export { default as ColorPalettePropertySvg_24 } from './color-palette-property-24.svg?raw';
export { default as ColorPropertySvg_16 } from './color-property-16.svg?raw';
export { default as ColorPropertySvg_24 } from './color-property-24.svg?raw';
export { default as EffectPropertySvg_16 } from './effect-property-16.svg?raw';
export { default as EffectPropertySvg_24 } from './effect-property-24.svg?raw';
export { default as GridPropertySvg_16 } from './grid-property-16.svg?raw';
export { default as GridPropertySvg_24 } from './grid-property-24.svg?raw';
export { default as InstanceSwapSvg_24 } from './instance-swap-24.svg?raw';
export { default as LayerPolygonSvg_12 } from './layer-polygon-12.svg?raw';
export { default as LayerPolygonSvg_16 } from './layer-polygon-16.svg?raw';
export { default as LayerSectionSvg_16 } from './layer-section-16.svg?raw';
export { default as LayerStarSvg_12 } from './layer-star-12.svg?raw';
export { default as LayerStarSvg_16 } from './layer-star-16.svg?raw';
export { default as LayerWidgetSvg_16 } from './layer-widget-16.svg?raw';
export { default as NestedInstanceSvg_16 } from './nested-instance-16.svg?raw';
export { default as NumberPropertySvg_16 } from './number-property-16.svg?raw';
export { default as NumberPropertySvg_24 } from './number-property-24.svg?raw';
export { default as PlusSvg_24 } from './plus-24.svg?raw';
export { default as SidePanelSvg_24 } from './side-panel-24.svg?raw';
export { default as TextInputPropertySvg_16 } from './text-input-property-16.svg?raw';
export { default as TextInputPropertySvg_24 } from './text-input-property-24.svg?raw';
export { default as TextPropertySvg_16 } from './text-property-16.svg?raw';
export { default as TextPropertySvg_24 } from './text-property-24.svg?raw';
export { default as TogglePropertySvg_16 } from './toggle-property-16.svg?raw';
export { default as TogglePropertySvg_24 } from './toggle-property-24.svg?raw';
export { default as ToolbarActionsSvg_24 } from './toolbar-actions-24.svg?raw';
export { default as ToolbarArrowSvg_24 } from './toolbar-arrow-24.svg?raw';
export { default as ToolbarCommentSvg_24 } from './toolbar-comment-24.svg?raw';
export { default as ToolbarDevModeSvg_24 } from './toolbar-dev-mode-24.svg?raw';
export { default as ToolbarEllipseSvg_24 } from './toolbar-ellipse-24.svg?raw';
export { default as ToolbarFrameSvg_24 } from './toolbar-frame-24.svg?raw';
export { default as ToolbarHandToolSvg_24 } from './toolbar-hand-tool-24.svg?raw';
export { default as ToolbarLineSvg_24 } from './toolbar-line-24.svg?raw';
export { default as ToolbarMoveSvg_24 } from './toolbar-move-24.svg?raw';
export { default as ToolbarPenSvg_24 } from './toolbar-pen-24.svg?raw';
export { default as ToolbarPencilSvg_24 } from './toolbar-pencil-24.svg?raw';
export { default as ToolbarPolygonSvg_24 } from './toolbar-polygon-24.svg?raw';
export { default as ToolbarRectangleSvg_24 } from './toolbar-rectangle-24.svg?raw';
export { default as ToolbarRulerSvg_24 } from './toolbar-ruler-24.svg?raw';
export { default as ToolbarScaleSvg_24 } from './toolbar-scale-24.svg?raw';
export { default as ToolbarSectionSvg_24 } from './toolbar-section-24.svg?raw';
export { default as ToolbarSliceSvg_24 } from './toolbar-slice-24.svg?raw';
export { default as ToolbarStarSvg_24 } from './toolbar-star-24.svg?raw';
export { default as ToolbarTextSvg_24 } from './toolbar-text-24.svg?raw';
export { default as VariableModePropertySvg_16 } from './variable-mode-property-16.svg?raw';
export { default as VariableModePropertySvg_24 } from './variable-mode-property-24.svg?raw';
export { default as VariablePropertySvg_16 } from './variable-property-16.svg?raw';
export { default as VariablePropertySvg_24 } from './variable-property-24.svg?raw';
export { default as VariantPropertySvg_16 } from './variant-property-16.svg?raw';
export { default as VariantPropertySvg_24 } from './variant-property-24.svg?raw';
//@endindex

export default [
  //@index('./**/*.{png,jpg,jpeg,svg,gif}', (f, _) => `'#icons/ui3/${f.path.replace(/^\.\//, '')}${f.ext}',`)
  '#icons/ui3/boolean-property-24.svg',
  '#icons/ui3/color-palette-property-16.svg',
  '#icons/ui3/color-palette-property-24.svg',
  '#icons/ui3/color-property-16.svg',
  '#icons/ui3/color-property-24.svg',
  '#icons/ui3/effect-property-16.svg',
  '#icons/ui3/effect-property-24.svg',
  '#icons/ui3/grid-property-16.svg',
  '#icons/ui3/grid-property-24.svg',
  '#icons/ui3/instance-swap-24.svg',
  '#icons/ui3/layer-polygon-12.svg',
  '#icons/ui3/layer-polygon-16.svg',
  '#icons/ui3/layer-section-16.svg',
  '#icons/ui3/layer-star-12.svg',
  '#icons/ui3/layer-star-16.svg',
  '#icons/ui3/layer-widget-16.svg',
  '#icons/ui3/nested-instance-16.svg',
  '#icons/ui3/number-property-16.svg',
  '#icons/ui3/number-property-24.svg',
  '#icons/ui3/plus-24.svg',
  '#icons/ui3/side-panel-24.svg',
  '#icons/ui3/text-input-property-16.svg',
  '#icons/ui3/text-input-property-24.svg',
  '#icons/ui3/text-property-16.svg',
  '#icons/ui3/text-property-24.svg',
  '#icons/ui3/toggle-property-16.svg',
  '#icons/ui3/toggle-property-24.svg',
  '#icons/ui3/toolbar-actions-24.svg',
  '#icons/ui3/toolbar-arrow-24.svg',
  '#icons/ui3/toolbar-comment-24.svg',
  '#icons/ui3/toolbar-dev-mode-24.svg',
  '#icons/ui3/toolbar-ellipse-24.svg',
  '#icons/ui3/toolbar-frame-24.svg',
  '#icons/ui3/toolbar-hand-tool-24.svg',
  '#icons/ui3/toolbar-line-24.svg',
  '#icons/ui3/toolbar-move-24.svg',
  '#icons/ui3/toolbar-pen-24.svg',
  '#icons/ui3/toolbar-pencil-24.svg',
  '#icons/ui3/toolbar-polygon-24.svg',
  '#icons/ui3/toolbar-rectangle-24.svg',
  '#icons/ui3/toolbar-ruler-24.svg',
  '#icons/ui3/toolbar-scale-24.svg',
  '#icons/ui3/toolbar-section-24.svg',
  '#icons/ui3/toolbar-slice-24.svg',
  '#icons/ui3/toolbar-star-24.svg',
  '#icons/ui3/toolbar-text-24.svg',
  '#icons/ui3/variable-mode-property-16.svg',
  '#icons/ui3/variable-mode-property-24.svg',
  '#icons/ui3/variable-property-16.svg',
  '#icons/ui3/variable-property-24.svg',
  '#icons/ui3/variant-property-16.svg',
  '#icons/ui3/variant-property-24.svg',
  //@endindex
];
