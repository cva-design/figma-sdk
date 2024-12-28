<script lang="ts">
	import { cva } from 'class-variance-authority';
	import Input from '../input/input.svelte';
	// Adjust the path as necessary

	export let level: 1 | 2 | 3 = 1;
	export let disabled: boolean = false;
	export let editable: boolean = false;
	export let text: string = '';

	const headingClasses = cva('fps-Heading', {
		variants: {
			level: {
				1: 'fps-Heading--level1',
				2: 'fps-Heading--level2',
				3: 'fps-Heading--level3'
			},
			disabled: {
				true: 'disabled',
				false: ''
			}
		}
	});
</script>

{#if editable}
	<Input quiet bind:value={text} {disabled} class={headingClasses({ level, disabled })} />
{:else}
	<svelte:element
		this={`h${level}`}
		class={headingClasses({ level, disabled })}
		aria-disabled={disabled}
	>
		{text}
	</svelte:element>
{/if}

<style lang="scss">
	.fps-Heading--level1 {
		// padding-left: var(--spacer-2);
		font-family: var(--text-body-large-strong-font-family);
		font-size: var(--text-body-medium-strong-font-size);
		font-weight: var(--text-body-large-strong-font-weight);
		letter-spacing: var(--text-body-large-strong-letter-spacing);
		// line-height: var(--text-body-large-strong-line-height);
	}

	.fps-Heading--level2 {
		padding-left: var(--spacer-2);
		font-family: var(--text-body-medium-strong-font-family);
		font-size: var(--text-body-medium-strong-font-size);
		font-weight: var(--text-body-medium-strong-font-weight);
		letter-spacing: var(--text-body-medium-strong-letter-spacing);
		line-height: var(--text-body-medium-strong-line-height);
	}

	.fps-Heading--level3 {
		padding-left: var(--spacer-2);
		font-family: var(--text-body-small-strong-font-family);
		font-size: var(--text-body-small-strong-font-size);
		font-weight: var(--text-body-small-strong-font-weight);
		letter-spacing: var(--text-body-small-strong-letter-spacing);
		line-height: var(--text-body-small-strong-line-height);
	}

	.disabled {
		color: var(--figma-color-text-disabled);
		pointer-events: none;
	}
</style>
