<script lang="ts">
import { createCheckbox } from "@melt-ui/svelte";
import CheckmarkIndeterminateIcon from "./assets/checkmark-indeterminate.svelte";
import CheckmarkIcon from "./assets/checkmark.svelte";

export const className = "";
export let checked = false;
export let indeterminate = false;
export const disabled = false;
export const required = false;
export const name: string | undefined = undefined;
export const value: string | undefined = undefined;
export const id: string | undefined = undefined;
export const label: string | undefined = undefined;

const {
	elements: { root, input },
	states: { checked: checkedState },
	helpers: { isChecked, isIndeterminate },
} = createCheckbox({
	defaultChecked: indeterminate ? "indeterminate" : checked,
	disabled,
	required,
	name,
	value,
	id,
});

$: {
	if (indeterminate) {
		checkedState.set("indeterminate");
	} else {
		checkedState.set(checked);
	}
}

$: checked = $isChecked;
$: indeterminate = $isIndeterminate;

const labelId = `checkbox-label-${id ?? ""}`;
const descriptionId = `checkbox-description-${id ?? ""}`;
</script>

<div class="fp-CheckboxRoot {className}" use:root {...$root}>
	<input
		{...$$restProps}
		class="fp-CheckboxInput fp-CheckboxHiddenInput"
		use:input
		{...$input}
		aria-labelledby={labelId}
		aria-describedby={descriptionId}
	/>
	<div class="fp-CheckboxCustomInput" aria-hidden="true">
		<span class="fp-CheckboxIndicator">
			{#if $isIndeterminate}
				<CheckmarkIndeterminateIcon />
			{:else if $isChecked}
				<CheckmarkIcon />
			{/if}
		</span>
	</div>

	{#if label}
		<label class="fp-Text fp-CheckboxLabel" for={id} aria-hidden="true" id={labelId}>
			{label}
		</label>
	{/if}
	{#if $$slots.description}
		<span class="fp-CheckboxDescription" id={descriptionId}>
			<slot name="description" />
		</span>
	{/if}
</div>

<style lang="scss">
	.fp-CheckboxRoot {
		position: relative;
		display: grid;
		grid-template-columns: var(--space-4) auto;
		min-height: 24px;
		gap: var(--space-1) var(--space-2);
	}

	.fp-CheckboxHiddenInput {
		position: absolute;
		opacity: 0;
		pointer-events: none;
		margin: 0;
		transform: translateX(-100%);
	}

	.fp-CheckboxCustomInput {
		box-sizing: border-box;
		display: block;
		width: var(--space-4);
		height: var(--space-4);
		margin: var(--space-1) 0;
		background-color: transparent;
		border: 1px solid var(--figma-color-border-strong);
		border-radius: var(--radius-medium);
		flex-shrink: 0;
		position: relative;
	}

	:global(.fp-CheckboxHiddenInput:focus-visible) ~ .fp-CheckboxCustomInput {
		outline-offset: -1px;
		outline: 1px solid var(--figma-color-border-selected);
	}

	:global(.fp-CheckboxHiddenInput:focus-visible:checked) ~ .fp-CheckboxCustomInput {
		outline-offset: 0;
		outline: 1px solid var(--figma-color-border-selected-strong);
		border-color: var(--figma-color-icon-onbrand);
	}

	:global(.fp-CheckboxHiddenInput:checked) ~ .fp-CheckboxCustomInput {
		background-color: var(--figma-color-bg-brand);
		border-color: transparent;
	}

	:global(.fp-CheckboxHiddenInput:disabled) ~ .fp-CheckboxCustomInput {
		border-color: var(--figma-color-border-disabled-strong);
	}

	:global(.fp-CheckboxHiddenInput:disabled:checked) ~ .fp-CheckboxCustomInput {
		border-color: transparent;
		background-color: var(--figma-color-border-disabled-strong);
	}

	.fp-CheckboxIndicator {
		display: block;
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;

		// Make sure SVG icons are hidden by default
		:global(svg) {
			display: none;
		}
	}

	// Show checkmark when checked
	:global(.fp-CheckboxHiddenInput:checked) ~ .fp-CheckboxCustomInput .fp-CheckboxIndicator :global(svg) {
		--color-icon: var(--figma-color-icon-onbrand);
		display: block;
	}

	// Show indeterminate icon when in indeterminate state
	:global(.fp-CheckboxHiddenInput:indeterminate) ~ .fp-CheckboxCustomInput .fp-CheckboxIndicator :global(svg) {
		--color-icon: var(--figma-color-icon-onbrand);
		display: block;
	}

	// Style for disabled state
	:global(.fp-CheckboxHiddenInput:disabled:checked) ~ .fp-CheckboxCustomInput .fp-CheckboxIndicator :global(svg),
	:global(.fp-CheckboxHiddenInput:disabled:indeterminate) ~ .fp-CheckboxCustomInput .fp-CheckboxIndicator :global(svg) {
		--color-icon: var(--figma-color-icon-disabled);
	}

	.fp-CheckboxLabel {
		margin-top: var(--space-1);
	}

	.fp-CheckboxInput:disabled ~ .fp-CheckboxLabel {
		color: var(--figma-color-text-disabled);
	}

	.fp-CheckboxDescription {
		color: var(--figma-color-text-secondary);
		grid-area: 2 / 2;
	}
</style>
