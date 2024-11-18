<script lang="ts">
	import { Icon } from '$ui/icon';
	import { createEventDispatcher } from 'svelte';

	export let id: string | null = null;
	export let value: string | null = null;
	export let name: string | null = null;
	export let iconText: string | null = null;
	export let icon: string | null = null;
	export let borders = false;
	export let disabled = false;
	export let iconName: string | null = null;
	export let spin: boolean = false;
	export let type = 'text';
	export let invalid = false;
	export let errorMessage = 'Error message';
	export let placeholder = 'Input something here...';
	export { className as class };

	let className = '';
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
</script>

{#if icon || iconName || iconText}
	<div class="input {className}">
		<div class="icon">
			<Icon icon={icon} {iconText} spin={spin} color="--figma-color-icon" />
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
	<div class="input {className}">
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

<style>
	.input {
		position: relative;
		transition: flex 0s 0.2s;
	}

	input {
		font-size: var(--text-body-medium-font-size);
		font-weight: var(--font-weight-default);
		letter-spacing: var(--font-letter-spacing-neg-xsmall);
		line-height: var(--line-height);
		position: relative;
		display: flex;
		overflow: visible;
		align-items: center;
		width: 100%;
		height: 30px;
		margin: 1px 0 1px 0;
		padding: var(--spacer-2) var(--spacer-1) var(--spacer-2) var(--spacer-2);
		color: var(--figma-color-text);
		border: 1px solid transparent;
		border-radius: var(--border-radius-small);
		outline: none;
		background-color: var(--figma-color-bg);
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
		border: 1px solid var(--figma-color-border);
		background-image: none;
	}
	input:focus:placeholder-shown {
		border: 1px solid var(--figma-color-border-selected);
		outline: 1px solid var(--figma-color-border-selected);
		outline-offset: -2px;
	}
	input:disabled:hover {
		border: 1px solid transparent;
	}
	input:active,
	input:focus {
		color: var(--figma-color-text);
		border: 1px solid var(--figma-color-border-selected);
		outline: 1px solid var(--figma-color-border-selected);
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
		outline: 1px solid var(--figma-color-border-danger-strong);
		outline-offset: -2px;
	}

	.icon {
		position: absolute;
		top: -1px;
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
