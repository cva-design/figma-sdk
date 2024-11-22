<script lang="ts">
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

<style lang="scss">
.fp-CheckboxRoot {
  position: relative;
  display: grid;
  grid-template-columns: var(--space-4) auto;
  min-height: 24px;
  gap: var(--space-1) var(--space-2);
}

.fp-CheckboxInput {
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

.fp-CheckboxIndicator {
  display: block;
  pointer-events: none;
  position: absolute;
  top: var(--space-1);
}

.fp-CheckboxCheckmark,
.fp-CheckboxIndeterminate {
  display: none;
}

.fp-CheckboxInput:checked ~ .fp-CheckboxIndicator .fp-CheckboxCheckmark {
  --color-icon: var(--figma-color-icon-onbrand);
  display: block;
}

.fp-CheckboxInput:indeterminate ~ .fp-CheckboxIndicator .fp-CheckboxIndeterminate {
  --color-icon: var(--figma-color-icon);
  display: block;
}

.fp-CheckboxInput:disabled:indeterminate ~ .fp-CheckboxIndicator .fp-CheckboxIndeterminate {
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
