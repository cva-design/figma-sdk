/**
 * API Methods Index
 * 
 * This file aggregates and re-exports all API method implementations.
 * It uses barrel exports to simplify imports in the main init.ts file.
 * 
 * WHY THIS APPROACH:
 * - Centralized exports: Single place to import all API methods
 * - Discoverability: Easy to see all available API methods
 * - Clean imports: Parent modules only need to import this file
 * - Maintainability: New methods just need to be added here once implemented
 */

//@index('./*', f => `export * from '${f.path}';`)
export * from './get-component-name-by-key';
export * from './get-current-user';
export * from './notify';
//@endindex