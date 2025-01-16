<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import { IconButton } from '../icon-button';
	import Badge from './badge.svelte';

	export const meta = {
		title: 'Badge',
		component: Badge,
		argTypes: {
			text: { control: 'text' },
			color: { control: 'color' },
			disabled: { control: 'boolean' },
			showActions: { control: 'boolean' }
		}
	};
</script>

<Story name="Default">
	<Badge text="Tag Name" color="#7B61FF" size="small">
		<svelte:fragment slot="actions">
			<IconButton iconName="AdjustSvg" />
			<IconButton iconName="BreakSvg" />
		</svelte:fragment>
	</Badge>
</Story>

<Story name="Sizes">
	<div style="display: flex; flex-direction: column; gap: 8px;">
		<Badge text="Small Badge" color="#7B61FF" size="small">
			<svelte:fragment slot="actions">
				<IconButton size="small" iconName="Break_12Svg" />
			</svelte:fragment>
		</Badge>
		<Badge text="Medium Badge" color="#7B61FF" size="medium">
			<svelte:fragment slot="actions">
				<IconButton size="medium" iconName="Break_16Svg" />
			</svelte:fragment>
		</Badge>
	</div>
</Story>

<Story name="Without Actions">
	<Badge text="Simple Tag" color="#ffcc00" />
</Story>

<Story name="Text Only">
	<Badge text="Simple Tag" no-dot on:click={() => alert('clicked')} />
</Story>

<Story name="With Icon">
	<div style="display: flex; gap: 8px;">
		<Badge text="Named Icon" iconName="AdjustSvg" color="#7B61FF" size="small" />
		<Badge text="Text Icon" iconText="🎨" color="#1BC47D" />
		<Badge
			size="medium"
			text="SVG Icon"
			icon="<svg width='16' height='16' viewBox='0 0 16 16' fill='none'><circle cx='8' cy='8' r='4' fill='currentColor'/></svg>"
			color="#ffcc00"
		/>
		<Badge text="Spinning Icon" iconName="CircleInfoSvg_16" color="lightblue" spin size="medium" />
	</div>
</Story>

<Story name="Disabled">
	<Badge text="Disabled Tag" color="#1BC47D" size="small">
		<svelte:fragment slot="actions">
			<IconButton size="small" iconName="AdjustSvg" />
			<IconButton size="small" iconName="BreakSvg" />
		</svelte:fragment>
	</Badge>
</Story>
