<script lang="ts">
	export let checked = false;
	export let name = '';
	export let value = '';
	export let disabled = false;
	export { className as class };

	let className = '';
	let uniqueId = `switch--${(Math.random() * 100000000).toFixed(0)}`;
</script>

<div class={`switch ${className}`}>
	<input
		type="checkbox"
		{disabled}
		{name}
		bind:checked
		{value}
		id={uniqueId}
		on:change
		on:focus
		on:blur
		on:mouseover
		on:mouseenter
		on:mouseleave
	/>
	<label for={uniqueId}>
		<span class="switch-track" />
		<span class="switch-thumb" />
		<span class="switch-text"><slot /></span>
	</label>
</div>

<style lang="scss">
.switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}

input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

label {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.switch-track {
  width: 28px;
  height: 16px;
  background-color: var(--figma-color-icon-tertiary);
  border-radius: 8px;
  transition: background-color 0.2s;
}

.switch-thumb {
  position: absolute;
  left: 2px;
  width: 12px;
  height: 12px;
  background-color: var(--figma-color-icon-onbrand);
  border-radius: 50%;
  transition: transform 0.2s;
}

input:checked + label .switch-track {
  background-color: var(--figma-color-bg-brand);
}

input:checked + label .switch-thumb {
  transform: translateX(12px);
}

input:disabled + label {
  opacity: 0.5;
  cursor: not-allowed;
}

input:focus + label .switch-track {
  //box-shadow: 0 0 0 2px var(--figma-color-border-selected);
}

.switch-text {
  margin-left: 8px;
  font-family: var(--font-family-default);
  font-weight: var(--font-weight-default);
  font-size: var(--text-body-medium-font-size);
  line-height: var(--font-lineHeight);
  letter-spacing: var(--font-letter-spacing-pos-xsmall);
  color: var(--figma-color-text);
}</style>
