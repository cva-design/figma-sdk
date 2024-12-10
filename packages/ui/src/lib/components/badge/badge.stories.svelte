<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import Badge from './badge.svelte';
	import { IconButton } from '../icon-button';
	import { Icon } from '../icon';

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
	<Badge text="Tag Name" color="#7B61FF">
		<svelte:fragment slot="actions">
			<IconButton>
				<Icon icon="AdjustSvg" />
			</IconButton>
			<IconButton>
				<Icon icon="HyperlinkBreakSvg_32" />
			</IconButton>
		</svelte:fragment>
	</Badge>
</Story>

<Story name="Without Actions">
	<Badge text="Simple Tag" color="#ffcc00" showActions={false} />
</Story>

<Story name="Disabled">
	<Badge text="Disabled Tag" color="#1BC47D" disabled={true}>
		<svelte:fragment slot="actions">
			<IconButton>
				<Icon icon="AdjustSvg" />
			</IconButton>
			<IconButton>
				<Icon icon="HyperlinkBreakSvg_32" />
			</IconButton>
		</svelte:fragment>
	</Badge>
</Story>

