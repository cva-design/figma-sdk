<script lang="ts">
	import './slider.css';
	import { createSlider, type SliderOrientation } from '@melt-ui/svelte';

	export let min: number = 0;
	export let max: number = 100;
	export let step: number = 1;
	export let defaultValue: number = 0;
	export let onChange: ((value: number) => void) | undefined = undefined;
	export let orientation: SliderOrientation = 'horizontal';
	export let disabled: boolean = false;

	const {
		elements: { root, range, thumbs },
		states: { value: sliderValue }
	} = createSlider({
		min,
		max,
		step,
		defaultValue: [defaultValue],
		orientation,
		disabled
	});

	$: {
		if ($sliderValue[0] !== defaultValue) {
			defaultValue = $sliderValue[0];
			if (onChange) onChange(defaultValue);
		}
	}
</script>

<span use:root class="fp-SliderRoot" data-orientation={orientation}>
	<span class="fp-SliderTrack">
		<span use:range class="fp-SliderRange" />
	</span>
	<span use:thumbs class="fp-SliderThumb" />
</span>
