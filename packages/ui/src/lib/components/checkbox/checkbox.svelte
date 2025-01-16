<script lang="ts">
	import { createCheckbox } from '@melt-ui/svelte';
	import { Icon } from '../icon';
	import Text from '../typography/text.svelte';

	export let className: string = '';
	export let checked: boolean = false;
	export let indeterminate: boolean = false;
	export let disabled: boolean = false;
	export let required: boolean = false;
	export let name: string | undefined = undefined;
	export let value: string | undefined = undefined;
	export let id: string | undefined = undefined;
	export let label: string | undefined = undefined;

	const {
		elements: { root, input },
		states: { checked: checkedState },
		helpers: { isChecked, isIndeterminate }
	} = createCheckbox({
		defaultChecked: indeterminate ? 'indeterminate' : checked,
		disabled,
		required,
		name,
		value
	});

	$: {
		if (indeterminate) {
			checkedState.set('indeterminate');
		} else {
			checkedState.set(checked);
		}
	}

	$: checked = $isChecked;
	$: indeterminate = $isIndeterminate;

	const labelId = `checkbox-label-${id ?? ''}`;
	const descriptionId = `checkbox-description-${id ?? ''}`;
</script>

<div class="fp-CheckboxRoot {className}" use:root {...$root}>
	<input
		{...$$restProps}
		class="fp-CheckboxInput fp-CheckboxHiddenInput"
		use:input
		{...$input}
		aria-labelledby={labelId}
		aria-describedby={descriptionId}
		on:change
		on:click
		on:keydown
		on:keyup
		on:focus
		on:blur
	/>
	<div class="fp-CheckboxCustomInput" aria-hidden="true">
		<span class="fp-CheckboxIndicator">
			{#if $isIndeterminate}
				<Icon iconName="CheckboxMixedSvg_12" color="var(--figma-color-icon-onbrand)" />
			{:else if $isChecked}
				<Icon iconName="CheckboxCheckedSvg_12" color="var(--figma-color-icon-onbrand)" />
			{/if}
		</span>
	</div>

	{#if label}
		<label class="fp-CheckboxLabel" for={id} aria-hidden="true" id={labelId}>
			<Text>{label}</Text>
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
		grid-template-columns: var(--spacer-3) auto;
		min-height: 24px;
		gap: var(--spacer-1) var(--spacer-2);
		cursor: pointer;

		&:has(.fp-CheckboxHiddenInput:disabled) {
			cursor: not-allowed;
		}
	}

	.fp-CheckboxHiddenInput {
		position: absolute;
		opacity: 0;
		margin: 0;
		// Create a larger touch target while keeping it invisible
		width: var(--spacer-11); // 44px
		height: var(--spacer-11); // 44px
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		cursor: inherit;

		&:focus-visible ~ .fp-CheckboxCustomInput {
			outline: 2px solid var(--figma-color-border-selected);
			outline-offset: 2px;
			border-color: var(--figma-color-border-selected-strong);
		}

		&:checked ~ .fp-CheckboxCustomInput {
			background-color: var(--figma-color-bg-brand);
			border-color: var(--figma-color-bg-brand);

			.fp-CheckboxIndicator svg {
				opacity: 1;
				transform: scale(1);
				color: white;
			}
		}

		&:disabled ~ .fp-CheckboxCustomInput {
			background-color: var(--figma-color-bg-disabled);
			border-color: var(--figma-color-border-disabled);

			.fp-CheckboxIndicator {
				color: var(--figma-color-icon-disabled);
			}
		}

		&:disabled:checked ~ .fp-CheckboxCustomInput {
			background-color: var(--figma-color-border-disabled);
			border-color: transparent;
		}

		&:disabled ~ .fp-CheckboxDescription {
			color: var(--figma-color-text-disabled);
		}
	}

	.fp-CheckboxCustomInput {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--spacer-3);
		height: var(--spacer-3);
		margin: var(--spacer-1) 0;
		background-color: var(--figma-color-bg);
		border: 1px solid var(--figma-color-border-strong);
		border-radius: var(--radius-medium);
		flex-shrink: 0;
		position: relative;
		transition: all 100ms ease-out;
	}

	// Hover states
	@media (hover: hover) {
		.fp-CheckboxRoot:hover:not(:has(.fp-CheckboxHiddenInput:disabled)) .fp-CheckboxCustomInput {
			border-color: var(--figma-color-border-selected-strong);
			background-color: var(--figma-color-bg-hover);
		}

		.fp-CheckboxRoot:hover:not(:has(.fp-CheckboxHiddenInput:disabled))
			.fp-CheckboxHiddenInput:checked
			~ .fp-CheckboxCustomInput {
			background-color: var(--figma-color-bg-brand-hover);
			border-color: var(--figma-color-bg-brand-hover);
		}
	}

	.fp-CheckboxIndicator {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		inset: 0;
		color: var(--figma-color-icon-onbrand);
		pointer-events: none;

		svg {
			opacity: 0;
			transform: scale(0.8);
			transition: all 100ms ease-out;
		}
	}

	.fp-CheckboxLabel {
		margin-top: var(--spacer-1);
		cursor: inherit;
	}

	.fp-CheckboxDescription {
		color: var(--figma-color-text-secondary);
		grid-area: 2 / 2;
		cursor: inherit;
	}
</style>
