/**
 * Basic usage example for the RPC library
 * 
 * This example demonstrates how to use the RPC library to communicate
 * between a Figma plugin and its UI.
 */

import { createAPI, createClient, diagnoseRpcError } from '../src';

// Define the API interface
interface PluginAPI {
  getData(): Promise<any[]>;
  updateNode(id: string, props: any): Promise<boolean>;
  saveBlueprint(id: string, data: any): Promise<boolean>;
}

// Example: Plugin side (main thread)
function setupPluginSide() {
  // Implement the API methods
  const api: PluginAPI = {
    async getData() {
      // In a real plugin, this would be: return figma.currentPage.selection;
      return [{ id: '123', name: 'Rectangle' }];
    },

    async updateNode(id: string, props: any) {
      console.log(`Updating node ${id} with props:`, props);
      // In a real plugin, this would modify the node
      return true;
    },

    async saveBlueprint(id: string, data: any) {
      console.log(`Saving blueprint ${id}:`, data);
      // In a real plugin, this would save to clientStorage
      return true;
    }
  };

  // Initialize the API with debug mode enabled
  createAPI(api, { debug: true });
  
  console.log('Plugin API initialized with debug mode');
}

// Example: UI side
async function uiExample() {
  try {
    // Create a client for the PluginAPI
    // Note: In a real plugin, you would use a class constructor here
    const client = createClient<new () => PluginAPI>(class PluginAPI {
      getData() { return Promise.resolve([]); }
      updateNode(id: string, props: any) { return Promise.resolve(false); }
      saveBlueprint(id: string, data: any) { return Promise.resolve(false); }
    }, { debug: true });
    
    // Call methods
    const selection = await client.getData();
    console.log('Selection:', selection);
    
    // Update a node
    await client.updateNode('123', { x: 100, y: 100 });
    
    // Try to save a blueprint with circular references (will fail)
    const circularData: any = { name: 'Test Blueprint' };
    circularData.self = circularData; // Create circular reference
    
    try {
      await client.saveBlueprint('123', circularData);
    } catch (error) {
      // Use the diagnostic utility for better error messages
      console.error(diagnoseRpcError(error));
    }
  } catch (error) {
    console.error('Error in UI code:', error);
  }
}

// In a real plugin, these would be in separate files
// setupPluginSide() would be in the plugin code
// uiExample() would be in the UI code 