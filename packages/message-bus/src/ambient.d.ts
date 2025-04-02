import '@figma/plugin-typings';

declare global {
  var global: typeof globalThis & {
    TESTING: boolean | undefined;
  };
}
