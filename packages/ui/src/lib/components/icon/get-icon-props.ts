import type { IconProps } from './types';

/**
 * Extracts and validates icon props from a props object, ensuring only one icon type is used.
 *
 * @param props - Object containing potential icon props (icon, iconName, or iconText) and optional color
 * @returns A type-safe IconProps object with only one icon type set, or undefined if no valid icon props
 *
 * @example
 * ```ts
 * // With SVG icon
 * getIconProps({ icon: '<svg>...</svg>', color: 'red' }) // => { icon: '<svg>...</svg>', color: 'red' }
 *
 * // With named icon
 * getIconProps({ iconName: 'CheckboxCheckedSvg_12', color: 'blue' }) // => { iconName: 'CheckboxCheckedSvg_12', color: 'blue' }
 *
 * // With text icon
 * getIconProps({ iconText: '👍', color: 'green' }) // => { iconText: '👍', color: 'green' }
 *
 * // With no icon props
 * getIconProps({}) // => undefined
 * ```
 */
export function getIconProps(props: any): IconProps | undefined {
  return props.icon
    ? { icon: props.icon, color: props.color }
    : props.iconName
      ? { iconName: props.iconName, color: props.color }
      : props.iconText
        ? { iconText: props.iconText, color: props.color }
        : undefined;
}
