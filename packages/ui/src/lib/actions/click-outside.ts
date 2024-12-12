/**
 * Svelte action to detect clicks outside a given element.
 *
 * @param {HTMLElement} element - The target element to detect outside clicks.
 * @param {() => void} callbackFunction - The callback function to execute when an outside click is detected.
 * @returns {Object} An object with update and destroy methods.
 *
 * @example
 * <script lang="ts">
 *   import { clickOutside } from './path/to/clickOutside';
 *   let callback = () => console.log('Clicked outside');
 * </script>
 *
 * <div use:clickOutside={callback}>
 *   Click outside this element
 * </div>
 */
export function clickOutside(
  element: HTMLElement,
  callbackFunction: (event: MouseEvent) => void,
) {
  let callback = callbackFunction;

  const onClick = (event: MouseEvent) => {
    if (!element.contains(event.target as Node)) {
      callback(event);
    }
  };

  document.body.addEventListener('click', onClick);

  return {
    update(newCallbackFunction: (event: MouseEvent) => void) {
      callback = newCallbackFunction;
    },
    destroy() {
      document.body.removeEventListener('click', onClick);
    },
  };
}
