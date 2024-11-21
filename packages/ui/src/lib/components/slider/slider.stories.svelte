<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import Slider from './slider.svelte';

	export const meta = {
		
		component: Slider,
		argTypes: {
			min: { control: 'number' },
			max: { control: 'number' },
			step: { control: 'number' },
			value: { control: 'number' },
			onChange: { action: 'changed' },
			orientation: { control: 'select', options: ['horizontal', 'vertical'] },
			disabled: { control: 'boolean' }
		}
	};
</script>

<Story name="Default" args={{ min: 0, max: 100, step: 1, value: 50 }}>
	<Slider {...$$props} />
</Story>

<Story name="With Custom Range" args={{ min: 0, max: 1000, step: 10, value: 500 }}>
	<Slider {...$$props} />
</Story>

<Story name="Vertical" args={{ min: 0, max: 100, step: 1, value: 50, orientation: 'vertical' }}>
	<div style="height: 200px;">
		<Slider {...$$props} />
	</div>
</Story>

<Story name="Disabled" args={{ min: 0, max: 100, step: 1, value: 50, disabled: true }}>
	<Slider {...$$props} />
</Story>

<Story name="With Labels">
	<div style="display: flex; flex-direction: column; align-items: center;">
		<Slider min={0} max={100} step={1} />
		<div style="display: flex; justify-content: space-between; width: 100%; margin-top: 8px;">
			<span>0</span>
			<span>50</span>
			<span>100</span>
		</div>
	</div>
</Story>
