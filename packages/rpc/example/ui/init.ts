/**
 * UI Code - RPC Client Initialization
 * 
 * This file demonstrates how to use the RPC client to call methods
 * implemented in the plugin's main thread from the UI.
 * 
 * WHY THIS APPROACH:
 * - Type safety: Using the shared interface ensures type checking
 * - Simplicity: The proxy-based client makes remote calls look like local calls
 * - Error handling: Shows proper error handling with diagnoseRpcError
 * - Async/await: All calls are automatically wrapped in promises
 */

import { createClient, diagnoseRpcError } from '@figma-plugin-sdk/rpc';
import type { CodeApi } from '../shared/types';

try {
  // Create a client for the CodeApi - no stub class needed!
  // The proxy-based implementation automatically handles method calls
  const client = createClient<CodeApi>({ debug: true });
  
  // Example: Get component name by key
  // This will be sent to the plugin's main thread via RPC
  const componentName = await client.getComponentNameByKey('COMPONENT', 'your-component-key');
  console.log('Component name:', componentName);
  
  // Example: Get current user
  // Notice how the call looks just like a regular function call
  const currentUser = await client.getCurrentUser();
  console.log('Current user:', currentUser);
  
  // Example: Send a notification
  // Even methods that don't return promises are automatically promisified
  const result = await client.notify('Hello from UI!', { timeout: 2000 });
  console.log('Notification result:', result); // Should log "OK"
  
  // Example: Error handling with circular references
  // This demonstrates proper error handling for serialization issues
  const circularData: any = { name: 'Test Data' };
  circularData.self = circularData; // Create circular reference
  
  try {
    // This will fail due to circular references
    await client.notify(JSON.stringify(circularData));
  } catch (error) {
    // Use the diagnostic utility for better error messages
    console.error('Error with detailed diagnostics:', diagnoseRpcError(error));
  }
} catch (error) {
  console.error('Error in UI code:', error);
}