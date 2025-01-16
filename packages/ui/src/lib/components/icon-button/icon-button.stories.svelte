<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import IconButton from './icon-button.svelte';

	export const meta = {
		title: 'IconButton',
		component: IconButton,
		argTypes: {
			size: {
				control: 'select',
				options: ['small', 'medium']
			},
			activeAppearance: {
				control: 'select',
				options: ['subtle', 'solid']
			},
			disableTooltip: {
				control: 'boolean'
			}
		}
	};
</script>

<Story name="Default">
	<IconButton iconName="AlertSvg" on:click={() => alert('clicked')} />
</Story>

<Story name="Sizes">
	<div style="display: flex; gap: 8px;">
		<IconButton iconName="Break_12Svg" size="tiny" on:click={() => alert('clicked')} />
		<IconButton iconName="Break_16Svg" size="small" on:click={() => alert('clicked')} />
		<IconButton iconName="Break_24Svg" size="medium" on:click={() => alert('clicked')} />
		<IconButton iconName="BellSvg_32" size="large" on:click={() => alert('clicked')} />
	</div>
</Story>

<Story name="Solid">
	<IconButton iconName="StylesSvg_32" activeAppearance="solid" on:click={() => alert('clicked')} />
</Story>

<Story name="Custom Tooltip">
	<IconButton
		iconName="StylesSvg"
		tooltipContent="Add to favorites"
		on:click={() => alert('clicked')}
	/>
</Story>

<Story name="Disabled">
	<IconButton iconName="StylesSvg" disabled on:click={() => alert('clicked')} />
</Story>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacer-2);
	}

	.section {
		padding: var(--spacer-2);
	}
</style>
