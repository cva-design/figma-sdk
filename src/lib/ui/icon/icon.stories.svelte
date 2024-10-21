<script context="module" lang="ts">
	import { Icon } from '$ui';
	import { Story } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'ui/Icon',
		component: Icon,
		argTypes: {
			iconUrl: { control: 'text' },
			color: { control: 'color' },
			size: { control: 'number' }
		}
	};
</script>

<Story name="Default">
	<Icon iconUrl="#icon-default" />
</Story>

<Story name="Custom Color">
	<Icon iconUrl="#icon-default" color="#ff0000" />
</Story>

<Story name="Custom Size">
	<Icon iconUrl="#icon-default" size={48} />
</Story>

<Story name="Multiple Icons">
	<div style="display: flex; gap: 16px;">
		<Icon iconUrl="#icon-arrow-left" />
		<Icon iconUrl="#icon-arrow-right" />
		<Icon iconUrl="#icon-check" />
		<Icon iconUrl="#icon-close" />
	</div>
</Story>
