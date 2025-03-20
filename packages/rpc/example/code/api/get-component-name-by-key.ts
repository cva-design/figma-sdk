/**
 * API Implementation: Get Component Name By Key
 * 
 * This file implements the getComponentNameByKey method of the CodeApi interface.
 * It retrieves a component's name using its unique key identifier.
 * 
 * WHY THIS APPROACH:
 * - Single responsibility: This file only handles one API method
 * - Clean separation of concerns: Implementation details are isolated
 * - Easier testing: Each API function can be tested independently
 */

export async function getComponentNameByKey(type: 'COMPONENT' | 'COMPONENT_SET', key: string): Promise<string> {
  const component = type === 'COMPONENT' ? await figma.importComponentByKeyAsync(key) : await figma.importComponentSetByKeyAsync(key);
  return component.name;
}
