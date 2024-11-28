<script lang="ts">
export let group: any = null;
export const value: any = null;
export const disabled: boolean = false;
export const tabindex: number = 0;
export const className: string = "";
export let checked: boolean = false;
const uniqueId = `radio--${(Math.random() * 10000000).toFixed(0).toString()}`;
$: checked = group === value;

function handleClick(event: MouseEvent) {
	const target = event.target as HTMLInputElement;
	group = target.value;

	target.blur();
}
</script>

<div class={`fp-RadioRoot ${className}`}>
	<input
		type="radio"
		{value}
		{checked}
		{disabled}
		{tabindex}
		id={uniqueId}
		bind:group
		on:click={handleClick}
		on:change
		on:focus
		on:blur
	/>
	<label for={uniqueId}>
		<slot />
	</label>
</div>

<style lang="scss">
div {
  align-items: center;
  cursor: default;
  display: flex;
  position: relative;
}

.fp-RadioRoot {
  opacity: 0;
  width: 10px;
  height: 10px;
  margin: 0;
  padding: 0;
  flex-shrink: 0;
}
.fp-RadioRoot:checked + label:after {
  background-color: var(--figma-color-icon);
}
.fp-RadioRoot:disabled + label {
  opacity: 0.3;
}
.fp-RadioRoot:checked:disabled + label:before {
  border: 1px solid var(--figma-color-icon);
}

label {
  color: var(--figma-color-text);
  display: flex;
  font-family: var(--font-family-default);
  font-size: var(--text-body-medium-font-size);
  font-weight: var(--font-weight-default);
  line-height: var(--font-line-height);
  letter-spacing: var(--font-letter-spacing-pos-xsmall);
  margin-left: -16px;
  padding: var(--spacer-2) var(--spacer-3) var(--spacer-2) var(--spacer-4);
  user-select: none;
}
/* checked dot */
label:after {
  content: '';
  width: 6px;
  height: 6px;
  background-color: transparent;
  border-radius: 50%;
  position: absolute;
  top: 13px;
  left: 13px;
}

/* circle */
label:before {
  border: 1px solid var(--figma-color-icon);
  border-radius: var(--border-radius-small);
  content: '';
  display: block;
  width: 10px;
  height: 10px;
  margin: 2px 10px 0 -8px;
  border-radius: 50%;
  flex-shrink: 0;
}

input:enabled:checked:focus + label:before {
  border: 1px solid var(--figma-color-border-selected);
  box-shadow: 0 0 0 1px var(--figma-color-border-selected);
  border-radius: var(--border-radius-small);
  border-radius: 50%;
}

input:enabled:focus + label:before {
  border: 1px solid var(--figma-color-border-selected);
  box-shadow: 0 0 0 1px var(--figma-color-border-selected);
}
</style>
