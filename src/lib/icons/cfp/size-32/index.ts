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
export { default as AdjustSvg_32 } from './adjust-32.svg?raw';
export { default as AngleSvg_32 } from './angle-32.svg?raw';
export { default as AnimationSvg_32 } from './animation-32.svg?raw';
export { default as ArrowDownCircleSvg_32 } from './arrow-down-circle-32.svg?raw';
export { default as ArrowLeftCircleSvg_32 } from './arrow-left-circle-32.svg?raw';
export { default as ArrowLeftRightSvg_32 } from './arrow-left-right-32.svg?raw';
export { default as ArrowRightCircleSvg_32 } from './arrow-right-circle-32.svg?raw';
export { default as ArrowUpCircleSvg_32 } from './arrow-up-circle-32.svg?raw';
export { default as ArrowUpDownSvg_32 } from './arrow-up-down-32.svg?raw';
export { default as BellSvg_32 } from './bell-32.svg?raw';
export { default as BlendSvg_32 } from './blend-32.svg?raw';
export { default as BlendEmptySvg_32 } from './blend-empty-32.svg?raw';
export { default as CheckCircleSvg_32 } from './check-circle-32.svg?raw';
export { default as CheckCircleFilledSvg_32 } from './check-circle-filled-32.svg?raw';
export { default as ChevronDownSvg_32 } from './chevron-down-32.svg?raw';
export { default as ChevronLeftSvg_32 } from './chevron-left-32.svg?raw';
export { default as ChevronRightSvg_32 } from './chevron-right-32.svg?raw';
export { default as ChevronUpSvg_32 } from './chevron-up-32.svg?raw';
export { default as CodeSvg_32 } from './code-32.svg?raw';
export { default as ComponentSvg_32 } from './component-32.svg?raw';
export { default as ConnectionConnectSvg_32 } from './connection-connect-32.svg?raw';
export { default as ConnectionDeleteSvg_32 } from './connection-delete-32.svg?raw';
export { default as CornerRadiusSvg_32 } from './corner-radius-32.svg?raw';
export { default as CornersSvg_32 } from './corners-32.svg?raw';
export { default as CrossSvg_32 } from './cross-32.svg?raw';
export { default as DistributeHorizontalSpacingSvg_32 } from './distribute-horizontal-spacing-32.svg?raw';
export { default as DistributeVerticalSpacingSvg_32 } from './distribute-vertical-spacing-32.svg?raw';
export { default as DraftSvg_32 } from './draft-32.svg?raw';
export { default as EffectsSvg_32 } from './effects-32.svg?raw';
export { default as EllipsisSvg_32 } from './ellipsis-32.svg?raw';
export { default as EyedropperSvg_32 } from './eyedropper-32.svg?raw';
export { default as FolderSvg_32 } from './folder-32.svg?raw';
export { default as FrameSvg_32 } from './frame-32.svg?raw';
export { default as GridSvg_32 } from './grid-32.svg?raw';
export { default as HyperlinkBreakSvg_32 } from './hyperlink-break-32.svg?raw';
export { default as HyperlinkLinkedSvg_32 } from './hyperlink-linked-32.svg?raw';
export { default as InfoSvg_32 } from './info-32.svg?raw';
export { default as LayoutAlignBottomSvg_32 } from './layout-align-bottom-32.svg?raw';
export { default as LayoutAlignHorizontalCentersSvg_32 } from './layout-align-horizontal-centers-32.svg?raw';
export { default as LayoutAlignLeftSvg_32 } from './layout-align-left-32.svg?raw';
export { default as LayoutAlignRightSvg_32 } from './layout-align-right-32.svg?raw';
export { default as LayoutAlignTopSvg_32 } from './layout-align-top-32.svg?raw';
export { default as LayoutAlignVerticalCentersSvg_32 } from './layout-align-vertical-centers-32.svg?raw';
export { default as LayoutGridColumnsSvg_32 } from './layout-grid-columns-32.svg?raw';
export { default as LayoutGridRowsSvg_32 } from './layout-grid-rows-32.svg?raw';
export { default as LayoutGridUniformSvg_32 } from './layout-grid-uniform-32.svg?raw';
export { default as LayoutHorizontalSvg_32 } from './layout-horizontal-32.svg?raw';
export { default as LayoutVerticalSvg_32 } from './layout-vertical-32.svg?raw';
export { default as LetterSpacingSvg_32 } from './letter-spacing-32.svg?raw';
export { default as LibrarySvg_32 } from './library-32.svg?raw';
export { default as LineHeightSvg_32 } from './line-height-32.svg?raw';
export { default as LinkBreakSvg_32 } from './link-break-32.svg?raw';
export { default as LinkLinkedSvg_32 } from './link-linked-32.svg?raw';
export { default as ListSvg_32 } from './list-32.svg?raw';
export { default as ListDetailedSvg_32 } from './list-detailed-32.svg?raw';
export { default as LockLockedSvg_32 } from './lock-locked-32.svg?raw';
export { default as LockUnlockedSvg_32 } from './lock-unlocked-32.svg?raw';
export { default as MegaphoneSvg_32 } from './megaphone-32.svg?raw';
export { default as MinusSvg_32 } from './minus-32.svg?raw';
export { default as MissingFontsSvg_32 } from './missing-fonts-32.svg?raw';
export { default as NavigateBackSvg_32 } from './navigate-back-32.svg?raw';
export { default as NavigateToSvg_32 } from './navigate-to-32.svg?raw';
export { default as NoticeSvg_32 } from './notice-32.svg?raw';
export { default as PaddingHorizontalSvg_32 } from './padding-horizontal-32.svg?raw';
export { default as PaddingVerticalSvg_32 } from './padding-vertical-32.svg?raw';
export { default as ParagraphIndentSvg_32 } from './paragraph-indent-32.svg?raw';
export { default as ParagraphSpacingSvg_32 } from './paragraph-spacing-32.svg?raw';
export { default as PencilSvg_32 } from './pencil-32.svg?raw';
export { default as PlaySvg_32 } from './play-32.svg?raw';
export { default as PluginSvg_32 } from './plugin-32.svg?raw';
export { default as PlusSvg_32 } from './plus-32.svg?raw';
export { default as RecentSvg_32 } from './recent-32.svg?raw';
export { default as ResetInstanceSvg_32 } from './reset-instance-32.svg?raw';
export { default as ResizeToFitSvg_32 } from './resize-to-fit-32.svg?raw';
export { default as ReturnSvg_32 } from './return-32.svg?raw';
export { default as RotateSvg_32 } from './rotate-32.svg?raw';
export { default as ScaleSvg_32 } from './scale-32.svg?raw';
export { default as SearchSvg_32 } from './search-32.svg?raw';
export { default as SearchLargeSvg_32 } from './search-large-32.svg?raw';
export { default as ShareSvg_32 } from './share-32.svg?raw';
export { default as SmileySvg_32 } from './smiley-32.svg?raw';
export { default as SpacingHorizontalSvg_32 } from './spacing-horizontal-32.svg?raw';
export { default as SpacingVerticalSvg_32 } from './spacing-vertical-32.svg?raw';
export { default as StarSvg_32 } from './star-32.svg?raw';
export { default as StarFilledSvg_32 } from './star-filled-32.svg?raw';
export { default as StrokeWeightSvg_32 } from './stroke-weight-32.svg?raw';
export { default as StylesSvg_32 } from './styles-32.svg?raw';
export { default as SwapSvg_32 } from './swap-32.svg?raw';
export { default as TargetSvg_32 } from './target-32.svg?raw';
export { default as TidyGridSvg_32 } from './tidy-grid-32.svg?raw';
export { default as TidyListHorizontalSvg_32 } from './tidy-list-horizontal-32.svg?raw';
export { default as TidyListVerticalSvg_32 } from './tidy-list-vertical-32.svg?raw';
export { default as TimerSvg_32 } from './timer-32.svg?raw';
export { default as TrashSvg_32 } from './trash-32.svg?raw';
export { default as VectorHandlesSvg_32 } from './vector-handles-32.svg?raw';
export { default as VisibilityHiddenSvg_32 } from './visibility-hidden-32.svg?raw';
export { default as VisibilityVisibleSvg_32 } from './visibility-visible-32.svg?raw';
export { default as WarningSvg_32 } from './warning-32.svg?raw';
export { default as WarningFilledSvg_32 } from './warning-filled-32.svg?raw';
export { default as WorldSvg_32 } from './world-32.svg?raw';
//@endindex
