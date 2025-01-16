<script lang="ts">
	export let group: any = null;
	export let value: any = null;
	export let disabled: boolean = false;
	export let tabindex: number = 0;
	export let className: string = '';
	export let checked: boolean = false;
	const uniqueId = `radio--${(Math.random() * 10000000).toFixed(0).toString()}`;

	function handleClick(event: MouseEvent) {
		const target = event.target as HTMLInputElement;
		group = value;
	}
</script>

<div class={`fp-RadioRoot ${className}`}>
	<input
		type="radio"
		{value}
		bind:group
		{disabled}
		{tabindex}
		{checked}
		id={uniqueId}
		on:click={handleClick}
		on:change
		on:focus
		on:blur
	/>
	<label for={uniqueId}>
		<slot />
	</label>
</div>

<style lang="scss">
	div {
		align-items: center;
		cursor: default;
		display: flex;
		position: relative;
	}

	.fp-RadioRoot input {
		opacity: 0;
		width: 10px;
		height: 10px;
		margin: 0;
		padding: 0;
		flex-shrink: 0;
	}
	.fp-RadioRoot input:checked + label:after {
		background-color: var(--figma-color-icon);
	}
	.fp-RadioRoot input:disabled + label {
		opacity: 0.3;
	}
	.fp-RadioRoot input:checked:disabled + label:before {
		border: 1px solid var(--figma-color-icon);
	}

	label {
		color: var(--figma-color-text);
		display: flex;
		font-family: var(--font-family-default);
		font-size: var(--text-body-medium-font-size);
		font-weight: var(--font-weight-default);
		line-height: var(--font-line-height);
		letter-spacing: var(--font-letter-spacing-pos-xsmall);
		margin-left: -16px;
		padding: var(--spacer-2) var(--spacer-3) var(--spacer-2) var(--spacer-3);
		user-select: none;
	}
	/* checked dot */
	label:after {
		content: '';
		width: 6px;
		height: 6px;
		background-color: transparent;
		border-radius: 50%;
		position: absolute;
		top: 13px;
		left: 13px;
	}

	/* circle */
	label:before {
		border: 1px solid var(--figma-color-icon);
		border-radius: var(--border-radius-small);
		content: '';
		display: block;
		width: 10px;
		height: 10px;
		margin: 2px 10px 0 -8px;
		border-radius: 50%;
		flex-shrink: 0;
	}
</style>
