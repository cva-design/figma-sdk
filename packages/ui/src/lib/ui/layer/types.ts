import type { SceneNode } from '@figma/plugin-typings/plugin-api-standalone';

import * as icons from '$icons';
import type { AutocompletableString } from '$lib/util';

export type LayerType =
  | Exclude<
      SceneNode['type'],
      | 'EMBED'
      | 'HIGHLIGHT'
      | 'LINK_UNFURL'
      | 'SHAPE_WITH_TEXT'
      | 'STAMP'
      | 'STICKY'
      | 'TABLE'
      | 'WASHI_TAPE'
    >
  | AutocompletableString;

export const LayerIcon: Record<LayerType, string> = {
  BOOLEAN_OPERATION: icons.LayerMaskSvg_16,
  CODE_BLOCK: icons.CodeSvg_16,
  COMPONENT_SET: icons.LayerComponentSvg_16,
  COMPONENT: icons.LayerComponentSvg_16,
  CONNECTOR: icons.ConnectorSvg_16,
  ELLIPSE: icons.LayerEllipseSvg_16,
  FRAME: icons.LayerFrameSvg_16,
  GROUP: icons.LayerGroupSvg_16,
  INSTANCE: icons.LayerInstanceSvg_16,
  LINE: icons.LayerLineSvg_16,
  MEDIA: icons.LayerAnimatedSvg_16,
  POLYGON: icons.LayerPolygonSvg_16,
  RECTANGLE: icons.LayerRectangleSvg_16,
  // NOTE: if any of the fills in a rectangle is an image, the type becomes IMAGE
  SECTION: icons.LayerSectionSvg_16,
  SLICE: icons.LayerSliceSvg_16,
  STAR: icons.StarSvg_16,
  TEXT: icons.LayerTextSvg_16,
  VECTOR: icons.LayerVectorSvg_16,
  WIDGET: icons.LayerWidgetSvg_16,
  // Unsupported
  // EMBED: icons.WarningSvg_16,
  // HIGHLIGHT: icons.WarningSvg_16,
  // LINK_UNFURL: icons.WarningSvg_16,
  // SHAPE_WITH_TEXT: icons.WarningSvg_16,
  // STAMP: icons.WarningSvg_16,
  // STICKY: icons.WarningSvg_16,
  // TABLE: icons.WarningSvg_16,
  // WASHI_TAPE: icons.WarningSvg_16,
};

// | 'layer-animated'
// | 'layer-component'
// | 'layer-ellipse'
// | 'layer-frame'
// | 'layer-frame-cover-art'
// | 'layer-frame-scrolling'
// | 'layer-frame-scrolling-horizontal'
// | 'layer-frame-scrolling-vertical'
// | 'layer-group'
// | 'layer-image'
// | 'layer-instance'
// | 'layer-line'
// | 'layer-mask'
// | 'layer-rectangle'
// | 'layer-slice'
// | 'layer-text'
// | 'layer-vector'
