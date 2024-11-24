<script lang="ts">
	import { createCheckbox } from '@melt-ui/svelte';
	import CheckmarkIndeterminateIcon from './assets/checkmark-indeterminate.svelte';
	import CheckmarkIcon from './assets/checkmark.svelte';

	export let className = '';
	export let checked = false;
	export let indeterminate = false;
	export let disabled = false;
	export let required = false;
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
		value,
		id
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

<div class="fps-CheckboxRoot {className}" use:root {...$root}>
	<input
		{...$$restProps}
		class="fps-CheckboxInput"
		use:input
		{...$input}
		aria-labelledby={labelId}
		aria-describedby={descriptionId}
	/>
	<span class="fps-CheckboxIndicator" aria-hidden="true">
		{#if $isIndeterminate}
			<CheckmarkIndeterminateIcon />
		{:else if $isChecked}
			<CheckmarkIcon />
		{/if}
	</span>

	{#if label}
		<label class="fps-Text fps-CheckboxLabel" for={id} aria-hidden="true" id={labelId}>
			{label}
		</label>
	{/if}
	{#if $$slots.description}
		<span class="fps-CheckboxDescription" id={descriptionId}>
			<slot name="description" />
		</span>
	{/if}
</div>

<style lang="scss">
	.fps-CheckboxRoot {
		position: relative;
		display: grid;
		grid-template-columns: var(--space-4) auto;
		min-height: 24px;
		gap: var(--space-1) var(--space-2);
	}

	.fps-CheckboxInput {
		all: unset;
		box-sizing: border-box;
		display: block;
		width: var(--space-4);
		height: var(--space-4);
		margin: var(--space-1) 0;
		background-color: transparent;
		border: 1px solid var(--figma-color-border-strong);
		border-radius: var(--radius-medium);
		flex-shrink: 0;

		&:focus-visible {
			outline-offset: -1px;
			outline: 1px solid var(--figma-color-border-selected);
		}

		&:focus-visible:checked {
			outline-offset: 0;
			outline: 1px solid var(--figma-color-border-selected-strong);
			border-color: var(--figma-color-icon-onbrand);
		}

		&:checked {
			background-color: var(--figma-color-bg-brand);
			border-color: transparent;
		}

		&:disabled {
			border-color: var(--figma-color-border-disabled-strong);
		}

		&:disabled:checked {
			border-color: transparent;
			background-color: var(--figma-color-border-disabled-strong);
		}
	}

	.fps-CheckboxIndicator {
		display: block;
		pointer-events: none;
		position: absolute;
		top: var(--space-1);
	}

	.fps-CheckboxCheckmark,
	.fps-CheckboxIndeterminate {
		display: none;
	}

	.fps-CheckboxInput:checked ~ .fps-CheckboxIndicator .fps-CheckboxCheckmark {
		--color-icon: var(--figma-color-icon-onbrand);
		display: block;
	}

	.fps-CheckboxInput:indeterminate ~ .fps-CheckboxIndicator .fps-CheckboxIndeterminate {
		--color-icon: var(--figma-color-icon);
		display: block;
	}

	.fps-CheckboxInput:disabled:indeterminate ~ .fps-CheckboxIndicator .fps-CheckboxIndeterminate {
		--color-icon: var(--figma-color-icon-disabled);
	}

	.fps-CheckboxLabel {
		margin-top: var(--space-1);
	}

	.fps-CheckboxInput:disabled ~ .fps-CheckboxLabel {
		color: var(--figma-color-text-disabled);
	}

	.fps-CheckboxDescription {
		color: var(--figma-color-text-secondary);
		grid-area: 2 / 2;
	}
</style>
