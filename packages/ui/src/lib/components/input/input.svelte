<script lang="ts">
	import type { IconProps } from '#ui/icon';
	import { getIconProps, Icon } from '#ui/icon';
	import { cva, type VariantProps } from 'class-variance-authority';
	import { createEventDispatcher } from 'svelte';

	const input = cva('input-base', {
		variants: {
			quiet: {
				true: 'quiet'
			},
			bordered: {
				true: 'bordered'
			},
			state: {
				invalid: 'invalid',
				disabled: 'disabled'
			},
			hasIcon: {
				true: 'indent'
			},
			textStyle: {
				strong: 'fps-text-strong',
				large: 'fps-text-large'
			}
		},
		defaultVariants: {
			state: undefined,
			hasIcon: undefined,
			textStyle: undefined
		}
	});

	type InputVariants = VariantProps<typeof input>;
	type InputState = NonNullable<InputVariants['state']>;

	type $$Props = {
		value?: string | null;
		id?: string | null;
		name?: string | null;
		bordered?: boolean;
		disabled?: boolean;
		type?: string;
		invalid?: boolean;
		errorMessage?: string;
		placeholder?: string;
		quiet?: boolean;
		spin?: boolean;
		class?: string;
		'aria-label'?: string;
		'aria-describedby'?: string;
		textStyle?: 'strong' | 'large';
	} & Partial<IconProps>;

	export let value: string | null = null;
	export let id: string | null = null;
	export let name: string | null = null;
	export let disabled: boolean = false;
	export let type: string = 'text';
	export let invalid: boolean = false;
	export let errorMessage: string = 'Error message';
	export let placeholder: string = 'Input something here...';
	export let spin = false;

	$: iconProps = getIconProps({ ...$$props, color: '--figma-color-icon' });
	const hasIcon = !!iconProps;

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

	$: state = invalid
		? ('invalid' as InputState)
		: disabled
			? ('disabled' as InputState)
			: undefined;

	$: inputClass = input({
		...$$props,
		state,
		hasIcon
	});
</script>

<div class="input-wrapper {$$props.class}">
	{#if hasIcon}
		<div class="icon">
			<Icon {...iconProps} {spin} />
		</div>
	{/if}
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
		aria-invalid={invalid}
		aria-label={$$props['aria-label']}
		aria-describedby={invalid ? `${id}-error` : $$props['aria-describedby']}
	/>
	{#if invalid}
		<div class="error" id="{id}-error" role="alert">
			{errorMessage}
		</div>
	{/if}
</div>

<style lang="scss">
	.input-wrapper {
		position: relative;
		transition: flex 0s 0.2s;
		width: 100%;
	}

	.input-base {
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

		&:where(.disabled) {
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

		&:where(.fps-text-large) {
			font-family: var(--text-body-large-strong-font-family);
			font-size: var(--text-body-large-strong-font-size);
			font-weight: var(--text-body-large-strong-font-weight);
			letter-spacing: var(--text-body-large-strong-letter-spacing);
			line-height: var(--text-body-large-strong-line-height);
		}

		&:where(.fps-text-strong) {
			font-family: var(--text-body-medium-strong-font-family);
			font-size: var(--text-body-medium-strong-font-size);
			font-weight: var(--text-body-medium-strong-font-weight);
			letter-spacing: var(--text-body-medium-strong-letter-spacing);
			line-height: var(--text-body-medium-strong-line-height);
		}

		&:where(.bordered) {
			border: 1px solid var(--figma-color-border);
			background-image: none;
		}

		&:where(.quiet) {
			background-color: transparent;
			padding-left: calc(var(--spacer-2) - 1px);
			margin-left: calc(0px - var(--spacer-2));

			&:not(:where(.disabled)):hover {
				border: 1px solid var(--figma-color-border);
			}
		}

		&:where(.indent) {
			padding-left: 32px;
		}

		&:where(.invalid),
		&:where(.invalid:hover),
		&:where(.invalid:focus) {
			border: 1px solid var(--figma-color-border-danger-strong);
		}
	}

	.icon {
		position: absolute;
		top: 50%;
		left: var(--spacer-2);
		transform: translateY(-50%);
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
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
