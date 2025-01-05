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
	<Icon icon="StylesSvg" color="--figma-color-icon" />
</Story>

<Story name="Custom Color (CSS Variable)">
	<Icon icon="StylesSvg" color="--figma-color-icon-warning" />
</Story>

<Story name="Custom Color (Direct)">
	<Icon icon="StylesSvg" color="#ff0000" />
</Story>

<Story name="Multiple Icons">
	<div style="display: flex; gap: 16px;">
		<Icon icon="ArrowLeftSvg_16" />
		<Icon icon="ArrowLeftRightSvg_16" />
		<Icon icon="ArrowRightSvg_16" />
	</div>
</Story>
