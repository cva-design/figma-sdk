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
    const target = event.target as Element;

    // For modals: trigger if click is on the dialog backdrop
    if (element.nodeName === 'DIALOG' && target === element) {
      callback(event);
      return;
    }

    // For other elements: trigger if click is outside the element
    if (!element.contains(target) && target !== element) {
      callback(event);
    }
  };

  // Use window for event listening to catch all clicks
  window.addEventListener('click', onClick, true);

  return {
    update(newCallbackFunction: (event: MouseEvent) => void) {
      callback = newCallbackFunction;
    },
    destroy() {
      window.removeEventListener('click', onClick, true);
    },
  };
}
