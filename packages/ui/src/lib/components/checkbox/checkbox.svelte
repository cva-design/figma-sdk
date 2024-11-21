<script lang="ts">
	import './checkbox.css';
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

<div class="fp-CheckboxRoot {className}" use:root {...$root}>
	<input
		{...$$restProps}
		class="fp-CheckboxInput"
		use:input
		{...$input}
		aria-labelledby={labelId}
		aria-describedby={descriptionId}
	/>
	<span class="fp-CheckboxIndicator" aria-hidden="true">
		{#if $isIndeterminate}
			<CheckmarkIndeterminateIcon />
		{:else if $isChecked}
			<CheckmarkIcon />
		{/if}
	</span>

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
