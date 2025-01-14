<script context="module" lang="ts">
	import { Icon } from '#ui/icon';
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
	<IconButton aria-label="Star" on:click={() => alert('clicked')}>
		<Icon iconName="AlertSvg" />
	</IconButton>
</Story>

<Story name="Sizes">
	<div style="display: flex; gap: 8px;">
		<IconButton aria-label="Star" size="small" on:click={() => alert('clicked')}>
			<Icon iconName="Break_12Svg" size="small" />
		</IconButton>
		<IconButton aria-label="Star" size="medium" on:click={() => alert('clicked')}>
			<Icon iconName="Break_16Svg" size="medium" />
		</IconButton>
		<IconButton aria-label="Star" size="large" on:click={() => alert('clicked')}>
			<Icon iconName="Break_24Svg" size="large" />
		</IconButton>
	</div>
</Story>

<Story name="Solid">
	<IconButton aria-label="Star" activeAppearance="solid" on:click={() => alert('clicked')}>
		<Icon iconName="StylesSvg_32" />
	</IconButton>
</Story>

<Story name="Custom Tooltip">
	<IconButton aria-label="Star" tooltipContent="Add to favorites" on:click={() => alert('clicked')}>
		<Icon iconName="StylesSvg" />
	</IconButton>
</Story>

<Story name="Disabled">
	<IconButton aria-label="Star" disabled on:click={() => alert('clicked')}>
		<Icon iconName="StylesSvg" />
	</IconButton>
</Story>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-2);
	}

	.section {
		padding: var(--space-2);
	}
</style>
