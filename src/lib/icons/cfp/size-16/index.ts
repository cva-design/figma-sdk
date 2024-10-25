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

//@index(['./*.svg'], (f, {pascalCase}) => `export { default as ${pascalCase(f.path).replace(/_/, 'Svg_')} } from '${f.path}${f.ext}?raw';`)
export { default as AlignBottomSvg_16 } from './align-bottom-16.svg?raw';
export { default as AlignMiddleSvg_16 } from './align-middle-16.svg?raw';
export { default as AlignTopSvg_16 } from './align-top-16.svg?raw';
export { default as AnchorHorizontalSvg_16 } from './anchor-horizontal-16.svg?raw';
export { default as AnchorVerticalSvg_16 } from './anchor-vertical-16.svg?raw';
export { default as ArrowDownSvg_16 } from './arrow-down-16.svg?raw';
export { default as ArrowLeftSvg_16 } from './arrow-left-16.svg?raw';
export { default as ArrowLeftRightSvg_16 } from './arrow-left-right-16.svg?raw';
export { default as ArrowRightSvg_16 } from './arrow-right-16.svg?raw';
export { default as ArrowUpSvg_16 } from './arrow-up-16.svg?raw';
export { default as ArrowUpDownSvg_16 } from './arrow-up-down-16.svg?raw';
export { default as AutoLayoutHorizontalBottomSvg_16 } from './auto-layout-horizontal-bottom-16.svg?raw';
export { default as AutoLayoutHorizontalCenterSvg_16 } from './auto-layout-horizontal-center-16.svg?raw';
export { default as AutoLayoutHorizontalTopSvg_16 } from './auto-layout-horizontal-top-16.svg?raw';
export { default as AutoLayoutVerticalCenterSvg_16 } from './auto-layout-vertical-center-16.svg?raw';
export { default as AutoLayoutVerticalLeftSvg_16 } from './auto-layout-vertical-left-16.svg?raw';
export { default as AutoLayoutVerticalRightSvg_16 } from './auto-layout-vertical-right-16.svg?raw';
export { default as CaretDownSvg_16 } from './caret-down-16.svg?raw';
export { default as CaretLeftSvg_16 } from './caret-left-16.svg?raw';
export { default as CaretRightSvg_16 } from './caret-right-16.svg?raw';
export { default as CaretUpSvg_16 } from './caret-up-16.svg?raw';
export { default as ChevronDownSvg_16 } from './chevron-down-16.svg?raw';
export { default as ChevronUpSvg_16 } from './chevron-up-16.svg?raw';
export { default as CircleHelpSvg_16 } from './circle-help-16.svg?raw';
export { default as CircleInfoSvg_16 } from './circle-info-16.svg?raw';
export { default as CodeSvg_16 } from './code-16.svg?raw';
export { default as ConnectorSvg_16 } from './connector-16.svg?raw';
export { default as HyperlinkSvg_16 } from './hyperlink-16.svg?raw';
export { default as LayerAnimatedSvg_16 } from './layer-animated-16.svg?raw';
export { default as LayerComponentSvg_16 } from './layer-component-16.svg?raw';
export { default as LayerEllipseSvg_16 } from './layer-ellipse-16.svg?raw';
export { default as LayerFrameSvg_16 } from './layer-frame-16.svg?raw';
export { default as LayerFrameCoverArtSvg_16 } from './layer-frame-cover-art-16.svg?raw';
export { default as LayerFrameScrollingSvg_16 } from './layer-frame-scrolling-16.svg?raw';
export { default as LayerFrameScrollingHorizontalSvg_16 } from './layer-frame-scrolling-horizontal-16.svg?raw';
export { default as LayerFrameScrollingVerticalSvg_16 } from './layer-frame-scrolling-vertical-16.svg?raw';
export { default as LayerGroupSvg_16 } from './layer-group-16.svg?raw';
export { default as LayerImageSvg_16 } from './layer-image-16.svg?raw';
export { default as LayerInstanceSvg_16 } from './layer-instance-16.svg?raw';
export { default as LayerLineSvg_16 } from './layer-line-16.svg?raw';
export { default as LayerMaskSvg_16 } from './layer-mask-16.svg?raw';
export { default as LayerRectangleSvg_16 } from './layer-rectangle-16.svg?raw';
export { default as LayerSliceSvg_16 } from './layer-slice-16.svg?raw';
export { default as LayerTextSvg_16 } from './layer-text-16.svg?raw';
export { default as LayerVectorSvg_16 } from './layer-vector-16.svg?raw';
export { default as LockLockedSvg_16 } from './lock-locked-16.svg?raw';
export { default as LockUnlockedSvg_16 } from './lock-unlocked-16.svg?raw';
export { default as MenuCheckmarkBreadcrumbSvg_16 } from './menu-checkmark-breadcrumb-16.svg?raw';
export { default as MenuCheckmarkCheckedSvg_16 } from './menu-checkmark-checked-16.svg?raw';
export { default as MenuCheckmarkMixedSvg_16 } from './menu-checkmark-mixed-16.svg?raw';
export { default as MoveDownSvg_16 } from './move-down-16.svg?raw';
export { default as MoveRightSvg_16 } from './move-right-16.svg?raw';
export { default as OptionCheckSvg_16 } from './option-check-16.svg?raw';
export { default as OptionDisabledSvg_16 } from './option-disabled-16.svg?raw';
export { default as OrientationLandscapeSvg_16 } from './orientation-landscape-16.svg?raw';
export { default as OrientationPortraitSvg_16 } from './orientation-portrait-16.svg?raw';
export { default as PaddingHorizontalSvg_16 } from './padding-horizontal-16.svg?raw';
export { default as PaddingVerticalSvg_16 } from './padding-vertical-16.svg?raw';
export { default as SpaceHorizontalSvg_16 } from './space-horizontal-16.svg?raw';
export { default as SpaceVerticalSvg_16 } from './space-vertical-16.svg?raw';
export { default as StarSvg_16 } from './star-16.svg?raw';
export { default as StarFilledSvg_16 } from './star-filled-16.svg?raw';
export { default as SwapSvg_16 } from './swap-16.svg?raw';
export { default as TargetSvg_16 } from './target-16.svg?raw';
export { default as TextAlignCenterSvg_16 } from './text-align-center-16.svg?raw';
export { default as TextAlignJustifiedSvg_16 } from './text-align-justified-16.svg?raw';
export { default as TextAlignLeftSvg_16 } from './text-align-left-16.svg?raw';
export { default as TextAlignRightSvg_16 } from './text-align-right-16.svg?raw';
export { default as TextDecorationStrikethroughSvg_16 } from './text-decoration-strikethrough-16.svg?raw';
export { default as TextDecorationUnderlineSvg_16 } from './text-decoration-underline-16.svg?raw';
export { default as UploadSvg_16 } from './upload-16.svg?raw';
export { default as VisibilityHiddenSvg_16 } from './visibility-hidden-16.svg?raw';
export { default as VisibilityVisibleSvg_16 } from './visibility-visible-16.svg?raw';
export { default as WarningSvg_16 } from './warning-16.svg?raw';
export { default as WorldSvg_16 } from './world-16.svg?raw';
//@endindex
