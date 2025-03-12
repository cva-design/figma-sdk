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

//@index(['./*.ts', './*/index.ts'], f => `export * from "${f.path}";`)
export * from './createAPI';
export * from './createClient';
export * from './errors';
export * from './rpc';
export * from './types';
export * from './utils';
//@endindex

/**
 * Utility function to diagnose RPC issues
 *
 * @param error The error object from a failed RPC call
 * @returns A formatted diagnostic message
 */
export function diagnoseRpcError(error: any): string {
  // Check if it's an RPC error
  if (error?.name?.includes('Error')) {
    let message = `RPC Error: ${error.name}: ${error.message}\n`;

    // Add detailed information if available
    if (error.data) {
      message += '\nError Data:\n';
      message += JSON.stringify(error.data, null, 2);
    }

    // Add detailed message if available
    if (error.detailedMessage) {
      message += '\n\nDetailed Message:\n';
      message += error.detailedMessage;
    }

    // Add stack trace if available
    if (error.stack) {
      message += '\n\nStack Trace:\n';
      message += error.stack;
    }

    // Add specific advice based on error type
    if (error.name === 'MethodNotFound') {
      message += '\n\nPossible solutions:';
      message += '\n1. Make sure the method is registered on the receiving end';
      message += '\n2. Check for typos in the method name';
      message += '\n3. Verify that the API is properly initialized';

      // Add available methods if present
      if (error.data?.availableMethods) {
        message += `\n\nAvailable methods: ${error.data.availableMethods.join(', ')}`;
      }
    } else if (error.name === 'InvalidRequest') {
      message += '\n\nPossible solutions:';
      message += '\n1. Check the parameters being passed to the method';
      message += '\n2. Ensure all required parameters are provided';
      message += '\n3. Verify that complex objects can be properly serialized';
    } else if (error.name === 'InternalError') {
      message += '\n\nPossible solutions:';
      message += '\n1. Check for errors in the method implementation';
      message += '\n2. Verify that the method is handling exceptions properly';
      message += '\n3. Look for circular references or non-serializable data';

      // Add specific advice for serialization errors
      if (
        error.message.includes('circular') ||
        error.message.includes('serialize')
      ) {
        message +=
          '\n\nThis appears to be a serialization error. Make sure your objects:';
        message += "\n- Don't contain circular references";
        message +=
          "\n- Don't include DOM nodes or other non-serializable types";
        message += '\n- Remove or null out complex properties before sending';
      }
    }

    return message;
  }

  // If it's not an RPC error, return a generic message
  return `Error: ${error?.message || error || 'Unknown error'}`;
}
