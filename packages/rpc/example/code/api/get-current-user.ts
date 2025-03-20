/**
 * API Implementation: Get Current User
 * 
 * This file implements the getCurrentUser method of the CodeApi interface.
 * It returns the current user object from the Figma API.
 * 
 * WHY THIS APPROACH:
 * - Modular: Each API method is in its own file
 * - Self-contained: No dependencies on other API methods
 * - Focused: Just handles retrieving user information
 */

export function getCurrentUser() {
  // In a real plugin, this would be: return figma.currentPage.selection;
  return figma.currentUser;
}
