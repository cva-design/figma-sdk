<script lang="ts">
	import { Icon } from '#ui';

	export let size: 'one' | 'two' | 'three' = 'one';
	export let text = '';
	export let disabled = false;
	export let variant: 'button' | 'border' | 'plain' = 'button';
</script>

{#if variant === 'button'}
	<div class="header--layerNameRow header--layerRowContainer">
		<button
			type="button"
			class="header--copyableLayerName"
			class:header--layerName--levelOne={size === 'one'}
			class:header--layerName--levelTwo={size === 'two'}
			class:header--layerName--levelThree={size === 'three'}
			class:disabled
			{disabled}
		>
			<span>{text}</span><Icon iconName="ChevronDownSvg_16" />
		</button>
	</div>
{:else if variant === 'border'}
	<div class="header--layerNameRow header--layerRowContainer">
		<button
			type="button"
			class="header--copyableLayerName header--border"
			class:header--layerName--levelOne={size === 'one'}
			class:header--layerName--levelTwo={size === 'two'}
			class:header--layerName--levelThree={size === 'three'}
			class:disabled
			{disabled}
		>
			{text}
		</button>
	</div>
{:else}
	<div class="header--layerNameRow header--layerRowContainer">
		<span
			class="header--copyableLayerName header--plain"
			class:header--layerName--levelOne={size === 'one'}
			class:header--layerName--levelTwo={size === 'two'}
			class:header--layerName--levelThree={size === 'three'}
			class:disabled
			aria-disabled={disabled}
		>
			{text}
		</span>
	</div>
{/if}

<style lang="scss">
	.header--layerName--levelOne {
		// padding-left: var(--spacer-2);
		font-family: var(--text-body-large-strong-font-family);
		font-size: var(--text-body-medium-strong-font-size);
		font-weight: var(--text-body-large-strong-font-weight);
		letter-spacing: var(--text-body-large-strong-letter-spacing);
		// line-height: var(--text-body-large-strong-line-height);
	}

	.header--layerName--levelTwo {
		padding-left: var(--spacer-2);
		font-family: var(--text-body-medium-strong-font-family);
		font-size: var(--text-body-medium-strong-font-size);
		font-weight: var(--text-body-medium-strong-font-weight);
		letter-spacing: var(--text-body-medium-strong-letter-spacing);
		line-height: var(--text-body-medium-strong-line-height);
	}

	.header--layerName--levelThree {
		padding-left: var(--spacer-2);
		font-family: var(--text-body-small-strong-font-family);
		font-size: var(--text-body-small-strong-font-size);
		font-weight: var(--text-body-small-strong-font-weight);
		letter-spacing: var(--text-body-small-strong-letter-spacing);
		line-height: var(--text-body-small-strong-line-height);
	}

	.header--layerNameRow {
		// height: 40px;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		// padding: 4px 8px 4px 16px;
	}

	.header--layerRowContainer {
		display: flex;
		gap: 4px;
	}

	.header--copyableLayerName:not(.disabled):not(.header--plain):hover {
		background: var(--color-bg-hover);
		color: var(--color-text);
		border-radius: 6px;
	}

	.disabled {
		color: var(--figma-color-text-disabled);
		pointer-events: none;
	}

	.header--border {
		padding: 2px 8px;
		border: 1px solid #f0f0f0;
		border-radius: 6px;
	}

	.header--copyableLayerName {
		padding: var(--space-1) var(--space-2);
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.header--plain {
		padding: var(--space-1) 0 var(--space-2) 0;
	}
</style>
