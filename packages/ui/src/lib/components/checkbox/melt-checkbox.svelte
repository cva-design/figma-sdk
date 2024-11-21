<script lang="ts">
	import './melt-checkbox.css';
	import { createCheckbox, melt } from '@melt-ui/svelte';
	import Label from '../text/label.svelte';
	import CheckmarkIndeterminateIcon from './assets/checkmark-indeterminate.svelte';
	import CheckmarkIcon from './assets/checkmark.svelte';

	export let className = '';
	export let checked = false;
	export let indeterminate = false;
	export let disabled = false;
	export let required = false;
	export let name: string | undefined = undefined;
	export let value: string | undefined = undefined;
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
</script>

<div class="fp-CheckboxRoot {className}">
	<button use:melt={$root} class="fp-CheckboxInput">
		<input use:melt={$input} />
		<span class="fp-CheckboxIndicator">
			{#if $isIndeterminate}
				<CheckmarkIndeterminateIcon />
			{:else if $isChecked}
				<CheckmarkIcon />
			{/if}
		</span>
	</button>
	{#if label}
		<Label class="fp-CheckboxLabel" for={input.name}>{label}</Label>
	{/if}

	{#if $$slots.description}
		<span class="fp-CheckboxDescription">
			<slot name="description" />
		</span>
	{/if}
</div>
