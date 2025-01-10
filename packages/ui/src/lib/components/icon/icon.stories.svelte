<script context="module" lang="ts">
	import { Icon } from '#ui';
	import { Story } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'Icon',
		component: Icon,
		argTypes: {
			icon: { control: 'text' },
			color: { control: 'color' },
			size: { control: 'number' }
		}
	};
</script>

<Story name="Default">
	<Icon iconName="StylesSvg" color="--figma-color-icon" />
</Story>

<Story name="Custom Color (CSS Variable)">
	<Icon iconName="StylesSvg" color="--figma-color-icon-warning" />
</Story>

<Story name="Custom Color (Direct)">
	<Icon iconName="StylesSvg" color="#ff0000" />
</Story>

<Story name="Multiple Icons">
	<div style="display: flex; gap: 16px;">
		<Icon iconName="ArrowLeftSvg_16" />
		<Icon iconName="ArrowLeftRightSvg_16" />
		<Icon iconName="ArrowRightSvg_16" />
	</div>
</Story>
