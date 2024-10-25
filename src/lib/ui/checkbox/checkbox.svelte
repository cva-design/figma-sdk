<script lang="ts">
	import Label from '$ui/text/label.svelte';
	import { createCheckbox } from '@melt-ui/svelte';
	import CheckmarkIndeterminateIcon from './assets/checkmark-indeterminate.svelte';
	import CheckmarkIcon from './assets/checkmark.svelte';

	export let checked = false;
	export let indeterminate = false;
	export let disabled = false;
	export let name: string | undefined = undefined;
	export let label: string | undefined = undefined;
	export let value: string | undefined = undefined;
	export let required = false;

	const {
		elements: { root, input },
		helpers: { isChecked, isIndeterminate }
	} = createCheckbox({
		defaultChecked: indeterminate ? 'indeterminate' : checked,
		disabled,
		name,
		value,
		required
	});

	$: checked = $isChecked;
	$: indeterminate = $isIndeterminate;
</script>

<div class="fp-CheckboxRoot" use:root {...$root}>
	<input
		id="checkbox-input"
		class="fp-CheckboxInput"
		use:input
		{...$input}
		aria-labelledby="checkbox-label"
		aria-describedby="checkbox-description"
	/>
	<span class="fp-CheckboxIndicator" aria-hidden="true">
		{#if $isIndeterminate}
			<CheckmarkIndeterminateIcon class="fp-CheckboxIndeterminate" size="4" />
		{:else if $isChecked}
			<CheckmarkIcon class="fp-CheckboxCheckmark" size="4" />
		{/if}
	</span>
	<Label class="fp-CheckboxLabel" for="checkbox-input" aria-hidden="true" id="checkbox-label">
		{label}
	</Label>
	{#if $$slots.description}
		<span class="fp-CheckboxDescription" id="checkbox-description">
			<slot name="description" />
		</span>
	{/if}
</div>

<style src="./checkbox.css"></style>
