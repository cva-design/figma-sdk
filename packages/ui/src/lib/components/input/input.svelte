<script lang="ts">
	import { Icon, type IconProps } from '$ui/icon';
	import { createEventDispatcher } from 'svelte';

	type $$Props = Partial<IconProps> & {
		value?: string | null;
		id?: string | null;
		name?: string | null;
		borders?: boolean;
		disabled?: boolean;
		type?: string;
		invalid?: boolean;
		errorMessage?: string;
		placeholder?: string;
	};

	export let value: string | null = null;
	export let id: string | null = null;
	export let name: string | null = null;
	export let borders: boolean = false;
	export let disabled: boolean = false;
	export let type: string = 'text';
	export let invalid: boolean = false;
	export let errorMessage: string = 'Error message';
	export let placeholder: string = 'Input something here...';

	const dispatch = createEventDispatcher();

	const typeAction = (node: HTMLInputElement) => {
		node.type = type;
	};

	function handleInput(event: Event) {
		dispatch('input', event);
	}

	function handleChange(event: Event) {
		dispatch('change', event);
	}

	function handleKeydown(event: KeyboardEvent) {
		dispatch('keydown', event);
	}

	function handleFocus(event: FocusEvent) {
		dispatch('focus', event);
	}

	function handleBlur(event: FocusEvent) {
		dispatch('blur', event);
	}

	const icon = $$props.icon;
	const iconText = $$props.iconText;
	const spin = $$props.spin;
</script>

{#if icon || iconText}
	<div class="input {$$props.class}">
		<div class="icon">
			<Icon {icon} {iconText} {spin} color="--figma-color-icon" />
		</div>
		<input
			use:typeAction
			on:input={handleInput}
			on:change={handleChange}
			on:keydown={handleKeydown}
			on:focus={handleFocus}
			on:blur={handleBlur}
			bind:value
			{id}
			{name}
			{disabled}
			{placeholder}
			class="indent"
			class:borders
			class:invalid
			data-error-message={errorMessage}
		/>
		{#if invalid}
			<div class="error">
				{errorMessage}
			</div>
		{/if}
	</div>
{:else}
	<div class="input {$$props.class}">
		<input
			use:typeAction
			on:input={handleInput}
			on:change={handleChange}
			on:keydown={handleKeydown}
			on:focus={handleFocus}
			on:blur={handleBlur}
			bind:value
			{id}
			{name}
			{disabled}
			{placeholder}
			class:borders
			class:invalid
			data-error-message={errorMessage}
		/>
		{#if invalid}
			<div class="error">
				{errorMessage}
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	.input {
		position: relative;
		transition: flex 0s 0.2s;
	}

	input {
		font-size: var(--font-size-default);
		font-weight: var(--font-weight-default);
		font-family: var(--font-family-default);
		letter-spacing: var(--letter-spacing-default);
		line-height: var(--line-height-default);
		letter-spacing: var(--font-letter-spacing-neg-xsmall);
		line-height: var(--line-height);
		position: relative;
		display: flex;
		overflow: visible;
		align-items: center;
		width: 100%;
		height: var(--space-6);
		padding: var(--spacer-2) var(--spacer-1) var(--spacer-2) var(--spacer-2);
		color: var(--figma-color-text);
		border: 1px solid transparent;
		border-radius: var(--radius-medium);
		outline: none;
		background-color: var(--figma-color-bg-secondary);
	}
	input:hover,
	input:placeholder-shown:hover {
		color: var(--figma-color-text-hover);
		border: 1px solid var(--figma-color-border);
		background-image: none;
	}
	input::selection {
		color: var(--figma-color-text);
		background-color: var(--color-texthighlight);
	}
	input::placeholder {
		color: var(--figma-color-text-tertiary);
		border: 1px solid transparent;
	}
	input:placeholder-shown {
		color: var(--figma-color-text);
		background-image: none;
	}
	input:focus:placeholder-shown {
		border: 1px solid var(--figma-color-border-selected);
		outline-offset: -2px;
	}
	input:disabled:hover {
		border: 1px solid transparent;
	}
	input:active,
	input:focus {
		color: var(--figma-color-text);
		border: 1px solid var(--figma-color-border-selected);
		outline-offset: -2px;
	}
	input:disabled {
		position: relative;
		color: var(--figma-color-text-disabled);
		background-image: none;
	}
	input:disabled:active {
		outline: none;
	}

	.borders {
		border: 1px solid var(--figma-color-border);
		background-image: none;
	}
	.borders:disabled {
		border: 1px solid transparent;
		background-image: none;
	}
	.borders:disabled:placeholder-shown {
		border: 1px solid transparent;
		background-image: none;
	}
	.borders:disabled:placeholder-shown:active {
		border: 1px solid transparent;
		outline: none;
	}
	.borders:placeholder-shown {
		border: 1px solid var(--figma-color-border);
		background-image: none;
	}

	.indent {
		padding-left: 32px;
	}

	.invalid,
	.invalid:hover,
	.invalid:focus {
		border: 1px solid var(--figma-color-border-danger-strong);
	}

	.icon {
		position: absolute;
		top: -4px;
		left: 0;
		width: var(--spacer-5);
		height: var(--spacer-5);
		z-index: 1;
	}

	.error {
		color: var(--figma-color-text-danger);
		font-size: var(--text-body-medium-font-size);
		font-weight: var(--font-weight-default);
		letter-spacing: var(--font-letter-spacing-neg-xsmall);
		line-height: var(--line-height);
		padding-top: var(--spacer-1);
		padding-left: var(--spacer-2);
	}
</style>
