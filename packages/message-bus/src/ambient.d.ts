import '@figma/plugin-typings';

/**
 * Extends the global scope with custom properties.
 */
declare global {
  /**
   * Represents the global object, extended with a `TESTING` flag.
   */
  var global: typeof globalThis & {
    /** Optional flag to indicate if the environment is running in test mode. */
    TESTING: boolean | undefined;
  };
}
