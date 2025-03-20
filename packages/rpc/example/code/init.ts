/**
 * Plugin Code - RPC API Initialization
 * 
 * This file sets up the RPC communication system for the plugin's main thread.
 * It imports the API method implementations and registers them with the RPC system.
 * 
 * WHY THIS APPROACH:
 * - Centralizes API setup in a single location
 * - Promotes clean separation between API interface and implementation
 * - Makes implementation straightforward to understand and maintain
 * - Enables modular organization of API methods
 */

import { createAPI } from '@figma-plugin-sdk/rpc';

import type { CodeApi } from '../shared/types';
import * as apiFunctions from './api/index';

// Implement the API methods by importing all API functions
// This object must implement the CodeApi interface from shared/types.ts
export const api: CodeApi = apiFunctions;

// Initialize the API with debug mode enabled
// This registers all methods with the RPC system and enables verbose logging
createAPI(api, { debug: true });

console.log('Plugin API initialized with debug mode');