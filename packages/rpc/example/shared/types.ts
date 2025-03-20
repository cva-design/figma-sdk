/**
 * Shared type definitions for RPC communication
 * 
 * This file serves as the contract between the plugin code and UI code.
 * It defines the interface that both sides will use to communicate.
 * 
 * WHY IT'S IMPORTANT:
 * - Creates a single source of truth for the API shape
 * - Ensures type safety across plugin and UI
 * - Provides auto-completion and type checking for both implementations and consumers
 * - Located in a shared folder accessible to both contexts
 */

// Define the API interface
export interface CodeApi {
  /**
   * Gets a component name by its key identifier
   * 
   * @param type - The type of component (COMPONENT or COMPONENT_SET)
   * @param key - The component key string
   * @returns Promise that resolves to the component name
   */
  getComponentNameByKey: (type: "COMPONENT" | "COMPONENT_SET", key: string) => Promise<string>;
  
  /**
   * Gets the current user information
   * 
   * @returns The current user object or null if not available
   */
  getCurrentUser: () => User | null;
  
  /**
   * Shows a notification message in the Figma UI
   * 
   * @param message - The message to display
   * @param options - Optional notification settings
   * @returns "OK" when the notification is shown
   */
  notify: (message: string, options?: NotificationOptions) => "OK";
}