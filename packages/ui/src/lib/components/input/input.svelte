<script lang="ts">
	import './input.css';
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
