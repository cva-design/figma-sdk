//@index('./*/index.ts', f => `export * from '${f.path.replace(/\/index$/, '')}';`)

//@endindex

//@index('./*.ts', f => `export * from '${f.path}';`)
export * from './ambient.d';
export * from './figma-events';
export * from './message-handling';
export * from './messages';
export type {
  CommandRegistry,
  EventRegistry,
} from './registries';
export * from './utils';
//@endindex
