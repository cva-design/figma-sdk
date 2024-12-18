import '@figma/plugin-typings';

// #region ------- Plugin API -------

interface PluginAPI {
  on(type: ArgFreeEventType, callback: () => void): void;
  on(type: 'run', callback: (event: RunEvent) => void): void;
  on(type: 'drop', callback: (event: DropEvent) => boolean): void;
  on(
    type: 'documentchange',
    callback: (event: DocumentChangeEvent) => void,
  ): void;
  on(
    type: 'textreview',
    callback: (
      event: TextReviewEvent,
    ) => Promise<TextReviewRange[]> | TextReviewRange[],
  ): void;
  on(type: 'stylechange', callback: (event: StyleChangeEvent) => void): void;
}

// Run Event Types
declare type RunEvent = RunParametersEvent | OpenDevResourcesEvent;

interface RunParametersEvent<ParametersType = ParameterValues | undefined> {
  command: string;
  parameters: ParametersType;
}

interface OpenDevResourcesEvent {
  command: 'open-dev-resource';
  parameters?: undefined;
  link: {
    url: string;
    name: string;
  };
}

// Drop Event Types
interface DropEvent {
  node: BaseNode | SceneNode;
  x: number;
  y: number;
  absoluteX: number;
  absoluteY: number;
  items: DropItem[];
  files: DropFile[];
  dropMetadata?: any;
}

interface DropItem {
  type: string;
  data: string;
}

interface DropFile {
  name: string;
  type: string;
  getBytesAsync(): Promise<Uint8Array>;
  getTextAsync(): Promise<string>;
}

// Style Event Types
interface StyleChangeEvent {
  styleChanges: StyleChange[];
}

declare type StyleChange =
  | StyleCreateChange
  | StyleDeleteChange
  | StylePropertyChange;

declare type BaseStyle = PaintStyle | TextStyle | EffectStyle | GridStyle;

interface BaseStyleChange extends BaseDocumentChange {
  style: BaseStyle | null;
}

interface StyleCreateChange extends BaseStyleChange {
  type: 'STYLE_CREATE';
}

interface StyleDeleteChange extends BaseStyleChange {
  type: 'STYLE_DELETE';
  style: null;
}

interface StylePropertyChange extends BaseStyleChange {
  type: 'STYLE_PROPERTY_CHANGE';
  properties: StyleChangeProperty[];
}

// #endregion

// #region ------- Parameters API -------

interface ParametersAPI {
  on(type: 'input', callback: (event: ParameterInputEvent) => void): void;
  once(type: 'input', callback: (event: ParameterInputEvent) => void): void;
  off(type: 'input', callback: (event: ParameterInputEvent) => void): void;
}

declare type ParameterInputEvent<ParametersType = ParameterValues> = {
  query: string;
  key: string;
  parameters: Partial<ParametersType>;
  result: SuggestionResults;
};

// Document Change Event Types

interface DocumentChangeEvent {
  documentChanges: DocumentChange[];
}

declare type DocumentChange =
  | CreateChange
  | DeleteChange
  | PropertyChange
  | StyleCreateChange
  | StyleDeleteChange
  | StylePropertyChange;

interface BaseDocumentChange {
  id: string;
  origin: 'LOCAL' | 'REMOTE';
}

interface BaseNodeChange extends BaseDocumentChange {
  node: SceneNode | RemovedNode;
}

interface CreateChange extends BaseNodeChange {
  type: 'CREATE';
}

interface DeleteChange extends BaseNodeChange {
  type: 'DELETE';
}

interface PropertyChange extends BaseNodeChange {
  type: 'PROPERTY_CHANGE';
  properties: NodeChangeProperty[];
}

// Node Change Property Types
declare type NodeChangeProperty =
  | 'pointCount'
  | 'name'
  | 'width'
  | 'height'
  | 'minWidth'
  | 'maxWidth'
  | 'minHeight'
  | 'maxHeight'
  | 'parent'
  | 'pluginData'
  | 'constraints'
  | 'locked'
  | 'visible'
  | 'opacity'
  | 'blendMode'
  | 'layoutGrids'
  | 'guides'
  | 'characters'
  | 'openTypeFeatures'
  | 'styledTextSegments'
  | 'vectorNetwork'
  | 'effects'
  | 'exportSettings'
  | 'arcData'
  | 'autoRename'
  | 'fontName'
  | 'innerRadius'
  | 'fontSize'
  | 'lineHeight'
  | 'leadingTrim'
  | 'paragraphIndent'
  | 'paragraphSpacing'
  | 'listSpacing'
  | 'hangingPunctuation'
  | 'hangingList'
  | 'letterSpacing'
  | 'textAlignHorizontal'
  | 'textAlignVertical'
  | 'textCase'
  | 'textDecoration'
  | 'textAutoResize'
  | 'textTruncation'
  | 'maxLines'
  | 'fills'
  | 'topLeftRadius'
  | 'topRightRadius'
  | 'bottomLeftRadius'
  | 'bottomRightRadius'
  | 'constrainProportions'
  | 'strokes'
  | 'strokeWeight'
  | 'strokeAlign'
  | 'strokeCap'
  | 'strokeJoin'
  | 'strokeMiterLimit'
  | 'booleanOperation'
  | 'overflowDirection'
  | 'dashPattern'
  | 'backgrounds'
  | 'handleMirroring'
  | 'cornerRadius'
  | 'cornerSmoothing'
  | 'relativeTransform'
  | 'x'
  | 'y'
  | 'rotation'
  | 'isMask'
  | 'maskType'
  | 'clipsContent'
  | 'type'
  | 'overlayPositionType'
  | 'overlayBackgroundInteraction'
  | 'overlayBackground'
  | 'prototypeStartNode'
  | 'prototypeBackgrounds'
  | 'expanded'
  | 'fillStyleId'
  | 'strokeStyleId'
  | 'backgroundStyleId'
  | 'textStyleId'
  | 'effectStyleId'
  | 'gridStyleId'
  | 'description'
  | 'layoutMode'
  | 'layoutWrap'
  | 'paddingLeft'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingBottom'
  | 'itemSpacing'
  | 'counterAxisSpacing'
  | 'layoutAlign'
  | 'counterAxisSizingMode'
  | 'primaryAxisSizingMode'
  | 'primaryAxisAlignItems'
  | 'counterAxisAlignItems'
  | 'counterAxisAlignContent'
  | 'layoutGrow'
  | 'layoutPositioning'
  | 'itemReverseZIndex'
  | 'hyperlink'
  | 'mediaData'
  | 'stokeTopWeight'
  | 'strokeBottomWeight'
  | 'strokeLeftWeight'
  | 'strokeRightWeight'
  | 'reactions'
  | 'flowStartingPoints'
  | 'shapeType'
  | 'connectorStart'
  | 'connectorEnd'
  | 'connectorLineType'
  | 'connectorStartStrokeCap'
  | 'connectorEndStrokeCap'
  | 'codeLanguage'
  | 'widgetSyncedState'
  | 'componentPropertyDefinitions'
  | 'componentPropertyReferences'
  | 'componentProperties'
  | 'embedData'
  | 'linkUnfurlData'
  | 'text'
  | 'authorVisible'
  | 'authorName'
  | 'code'
  | 'textBackground';

interface NodeChangeEvent {
  nodeChanges: NodeChange[];
}

declare type NodeChange = CreateChange | DeleteChange | PropertyChange;

declare type StyleChangeProperty =
  | 'name'
  | 'pluginData'
  | 'type'
  | 'description'
  | 'remote'
  | 'documentationLinks'
  | 'fontSize'
  | 'textDecoration'
  | 'letterSpacing'
  | 'lineHeight'
  | 'leadingTrim'
  | 'paragraphIndent'
  | 'paragraphSpacing'
  | 'listSpacing'
  | 'hangingPunctuation'
  | 'hangingList'
  | 'textCase'
  | 'paint'
  | 'effects'
  | 'layoutGrids';

declare type TextReviewEvent = {
  text: string;
};

declare type TextReviewRange = {
  start: number;
  end: number;
  suggestions: string[];
  color?: 'RED' | 'GREEN' | 'BLUE';
};

// #endregion

// #region ------- UI API -------

interface UIAPI {
  on(type: 'message', callback: MessageEventHandler): void;
}

declare type MessageEventHandler = (
  pluginMessage: any,
  props: OnMessageProperties,
) => void;

interface OnMessageProperties {
  origin: string;
}

// #endregion

// #region ------- Codegen API -------

interface CodegenAPI {
  on(
    type: 'generate',
    callback: (
      event: CodegenEvent,
    ) => Promise<CodegenResult[]> | CodegenResult[],
  ): void;
  on(
    type: 'preferenceschange',
    callback: (event: CodegenPreferencesEvent) => Promise<void>,
  ): void;
}

declare type CodegenEvent = {
  node: SceneNode;
  language: string;
};

declare type CodegenPreferences = {
  readonly unit: 'pixel' | 'scaled';
  readonly scaleFactor?: number;
  readonly customSettings: Record<string, string>;
};

declare type CodegenPreferencesEvent = {
  propertyName: string;
};

declare type CodegenResult = {
  title: string;
  code: string;
  language:
    | 'TYPESCRIPT'
    | 'CPP'
    | 'RUBY'
    | 'CSS'
    | 'JAVASCRIPT'
    | 'HTML'
    | 'JSON'
    | 'GRAPHQL'
    | 'PYTHON'
    | 'GO'
    | 'SQL'
    | 'SWIFT'
    | 'KOTLIN'
    | 'RUST'
    | 'BASH'
    | 'PLAINTEXT';
};

// #endregion

// #region ------- Dev Resources API -------

interface DevResourcesAPI {
  on(
    type: 'linkpreview',
    callback: (
      event: LinkPreviewEvent,
    ) => Promise<LinkPreviewResult> | LinkPreviewResult,
  ): void;
  on(
    type: 'auth',
    callback: (event: AuthEvent) => Promise<AuthResult> | AuthResult,
  ): void;
  on(type: 'open', callback: (event: DevResourceOpenEvent) => void): void;
}

// common types
interface DevResource {
  readonly name: string;
  readonly url: string;
  readonly inheritedNodeId?: string;
}

// Auth Event Types
declare type AuthEvent = {
  links: DevResource[];
};

// Link Preview Event Types
declare type LinkPreviewEvent = {
  link: DevResource;
};

declare type PlainTextElement = {
  type: 'PLAIN_TEXT';
  text: string;
};

declare type LinkPreviewResult =
  | {
      type: 'AUTH_REQUIRED';
    }
  | PlainTextElement
  | null;

// Dev Resource Open Event Types
declare type DevResourceOpenEvent = {
  devResource: DevResourceWithNodeId;
};

interface DevResourceWithNodeId extends DevResource {
  nodeId: string;
}

// #endregion
