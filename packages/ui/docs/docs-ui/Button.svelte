<script lang="ts">
import "./button.css";

/**
 * Is this the principal call to action on the page?
 */
export const primary = false;

/**
 * What background color to use
 */
export const backgroundColor: string | undefined = undefined;
/**
 * How large should the button be?
 */
export const size: "small" | "medium" | "large" = "medium";
/**
 * Button contents
 */
export const label = "";

$: mode = primary ? "storybook-button--primary" : "storybook-button--secondary";

$: style = backgroundColor ? `background-color: ${backgroundColor}` : "";
</script>

<button
  type="button"
  class={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
  {style}
  on:click
>
  {label}
</button>
