<script lang="ts">
	import { cva, cx } from 'class-variance-authority';
	import Input from '../input/input.svelte';

	type $$Props = {
		id?: string;
		level?: 1 | 2 | 3;
		disabled?: boolean;
		editable?: boolean;
		text?: string;
		class?: string;
	};

	let id: string | undefined = $$props.id;
	let level: 1 | 2 | 3 = $$props.level ?? 1;
	let disabled: boolean = $$props.disabled ?? false;
	let editable: boolean = $$props.editable ?? false;
	let text: string = $$props.text ?? '';

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
	<Input
		quiet
		bind:value={text}
		{disabled}
		class={cx(headingClasses({ level, disabled }), $$props.class)}
	/>
{:else}
	<svelte:element
		this={`h${level}`}
		{id}
		class={cx(headingClasses({ level, disabled }), $$props.class)}
		aria-disabled={disabled}
	>
		{text}
		<slot />
	</svelte:element>
{/if}

<style lang="scss">
	.fps-Heading {
		margin-top: 0;
		color: var(--color-text);
		outline: none;

		&:where(.fps-Heading--level1) {
			font-family: var(--text-body-large-strong-font-family);
			font-size: var(--text-body-large-strong-font-size);
			font-weight: var(--text-body-large-strong-font-weight);
			letter-spacing: var(--text-body-large-strong-letter-spacing);
			line-height: var(--text-body-large-strong-line-height);
			margin-block-end: var(--spacer-2);
		}

		&:where(.fps-Heading--level2, .fps-Heading--level3) {
			font-family: var(--text-body-medium-strong-font-family);
			font-size: var(--text-body-medium-strong-font-size);
			font-weight: var(--text-body-medium-strong-font-weight);
			letter-spacing: var(--text-body-medium-strong-letter-spacing);
			line-height: var(--text-body-medium-strong-line-height);
			margin-block-end: var(--spacer-2);
		}

		&:where(.fps-Heading--level3) {
			color: var(--color-text-secondary);
			margin-block-end: var(--spacer-1);
		}
	}

	.disabled {
		color: var(--figma-color-text-disabled);
		pointer-events: none;
	}
</style>
