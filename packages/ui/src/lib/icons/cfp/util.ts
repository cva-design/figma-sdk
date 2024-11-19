import type { IconName, SizeForIcon } from './icon-types.js';

/**
 * Gets the path to an icon of a given size.
 *
 * @param iconName IconName
 * @param size IconSize
 * @returns string
 */
export function getIconPath<T extends IconName>(
  iconName: T,
  size: SizeForIcon<T>,
): string {
  return `src/lib/icons/cfp/size-${size}/${iconName}-${size}.svg`;
}
