<script lang="ts">
	import { Icon, type IconProps } from '$ui/icon';
	import { cva, type VariantProps } from 'class-variance-authority';
	import { createEventDispatcher } from 'svelte';

	const input = cva('input-base', {
		variants: {
			variant: {
				default: '',
				quiet: 'quiet',
				bordered: 'borders'
			},
			state: {
				invalid: 'invalid',
				disabled: 'disabled'
			},
			hasIcon: {
				true: 'indent'
			}
		},
		defaultVariants: {
			variant: 'default',
			state: undefined,
			hasIcon: undefined
		}
	});

	type InputVariants = VariantProps<typeof input>;
	type InputVariant = NonNullable<InputVariants['variant']>;
	type InputState = NonNullable<InputVariants['state']>;

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
		quiet?: boolean;
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
	export let quiet: boolean = false;

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

	$: variant = borders
		? ('bordered' as InputVariant)
		: quiet
			? ('quiet' as InputVariant)
			: ('default' as InputVariant);
	$: state = invalid
		? ('invalid' as InputState)
		: disabled
			? ('disabled' as InputState)
			: undefined;
	$: inputClass = input({
		variant,
		state,
		hasIcon: !!icon || !!iconText || undefined
	});
</script>

{#if icon || iconText}
	<div class="input-wrapper {$$props.class}">
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
			class={inputClass}
			data-error-message={errorMessage}
		/>
		{#if invalid}
			<div class="error">
				{errorMessage}
			</div>
		{/if}
	</div>
{:else}
	<div class="input-wrapper {$$props.class}">
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
			class={inputClass}
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
	.input-wrapper {
		position: relative;
		transition: flex 0s 0.2s;
		width: 100%;
	}

	:global(.input-base) {
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

		&:hover,
		&:placeholder-shown:hover {
			color: var(--figma-color-text-hover);
			border: 1px solid var(--figma-color-border);
			background-image: none;
		}

		&::selection {
			color: var(--figma-color-text);
			background-color: var(--figma-color-bg-selected-pressed);
		}

		&::placeholder {
			color: var(--figma-color-text-tertiary);
			border: 1px solid transparent;
		}

		&:placeholder-shown {
			color: var(--figma-color-text);
			background-image: none;
		}

		&:focus:placeholder-shown {
			border: 1px solid var(--figma-color-border-selected);
			outline-offset: -2px;
		}

		&:active,
		&:focus {
			color: var(--figma-color-text);
			border: 1px solid var(--figma-color-border-selected);
			outline-offset: -2px;
		}

		&.disabled {
			position: relative;
			color: var(--figma-color-text-disabled);
			background-image: none;

			&:hover {
				border: 1px solid transparent;
			}

			&:active {
				outline: none;
			}

			&:placeholder-shown {
				border: 1px solid transparent;
				background-image: none;

				&:active {
					border: 1px solid transparent;
					outline: none;
				}
			}
		}
	}

	:global(.borders) {
		border: 1px solid var(--figma-color-border);
		background-image: none;
	}

	:global(.quiet:not(.disabled):hover) {
		border: 1px solid var(--figma-color-border);
	}

	:global(.indent) {
		padding-left: 32px;
	}

	:global(.invalid),
	:global(.invalid:hover),
	:global(.invalid:focus) {
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
