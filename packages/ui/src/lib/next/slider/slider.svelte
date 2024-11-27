<script lang="ts">
import { type SliderOrientation, createSlider } from "@melt-ui/svelte";

export const min = 0;
export const max = 100;
export const step = 1;
export let defaultValue = 0;
export const onChange: ((value: number) => void) | undefined = undefined;
export const orientation: SliderOrientation = "horizontal";
export const disabled = false;

const {
	elements: { root, range, thumbs },
	states: { value: sliderValue },
} = createSlider({
	min,
	max,
	step,
	defaultValue: [defaultValue],
	orientation,
	disabled,
});

$: {
	if ($sliderValue[0] !== defaultValue) {
		defaultValue = $sliderValue[0];
		if (onChange) onChange(defaultValue);
	}
}
</script>

<span use:root class="fps-SliderRoot" data-orientation={orientation}>
	<span class="fps-SliderTrack">
		<span use:range class="fps-SliderRange" />
	</span>
	<span use:thumbs class="fps-SliderThumb" />
</span>

<style lang="scss">
	:root,
	.light,
	.light-theme {
		--slider-root-size: var(--space-6);
		--slider-track-size: var(--space-4);
		--slider-thumb-width: var(--space-4);
		--slider-track-border-color: #0000001a;
		--slider-track-bg: var(--figma-color-bg-secondary);
		--slider-thumb-bg: transparent;
	}

	.figma-dark {
		--slider-track-border-color: #ffffff1a;
	}

	.fps-SliderRoot {
		position: relative;
		display: flex;
		align-items: center;
		flex-grow: 1;
		outline: 0;
		border-color: transparent;
		border-style: solid;

		&[data-orientation='horizontal'] {
			height: var(--slider-root-size);
			border-width: 0 calc(var(--slider-thumb-width) / 2);
		}

		&[data-orientation='vertical'] {
			flex-direction: column;
			width: var(--slider-root-size);
			border-width: calc(var(--slider-thumb-width) / 2) 0;
		}
	}

	.fps-SliderTrack {
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
		flex-grow: 1;
		background: var(--slider-track-bg);
		border-radius: var(--radius-full);
		outline: 1px solid var(--slider-track-border-color);
		outline-offset: -1px;

		&[data-orientation='horizontal'] {
			margin-left: calc(var(--slider-thumb-width) / 2 * -1);
			margin-right: calc(var(--slider-thumb-width) / 2 * -1);
			height: var(--slider-track-size);
		}

		&[data-orientation='vertical'] {
			margin-top: calc(var(--slider-thumb-width) / 2 * -1);
			margin-bottom: calc(var(--slider-thumb-width) / 2 * -1);
			width: var(--slider-track-size);
		}
	}

	.fps-SliderRange {
		position: absolute;
		display: block;
		background-color: var(--figma-color-bg-brand);
		border-radius: var(--radius-full);

		&[data-orientation='horizontal'] {
			height: var(--slider-track-size);
			margin-left: calc(var(--slider-thumb-width) / 2 * -1);
			margin-right: calc(var(--slider-thumb-width) / 2 * -1);
		}

		&[data-orientation='vertical'] {
			width: var(--slider-track-size);
			margin-top: calc(var(--slider-thumb-width) / 2 * -1);
			margin-bottom: calc(var(--slider-thumb-width) / 2 * -1);
		}

		&[data-disabled] {
			background-color: var(--figma-color-bg-disabled);
		}
	}

	.fps-SliderThumb {
		box-sizing: border-box;
		display: block;
		width: var(--slider-track-size);
		height: var(--slider-track-size);
		background-color: var(--slider-thumb-bg);
		border: 4px solid var(--figma-color-icon-onbrand);
		border-radius: var(--radius-full);
		box-shadow: var(--elevation-200);
		outline: 0;

		&[data-disabled] {
			background-color: var(--figma-color-bg-disabled-secondary);
			border: 0;
			box-shadow: none;
		}

		&.fps-SliderThumb-focusVisible:focus-visible {
			outline: 1px solid var(--figma-color-border-selected);
		}

		&.fps-SliderThumb-baseValue {
			--slider-thumb-bg: var(--figma-color-icon-onbrand);
		}
	}

	.fps-SliderHint {
		position: absolute;
		display: block;
		width: var(--space-1);
		height: var(--space-1);
		background-color: var(--figma-color-icon-tertiary);
		border-radius: var(--radius-full);

		&[data-orientation='horizontal'] {
			top: 50%;
			transform: translateY(-50%);
		}

		&[data-orientation='vertical'] {
			left: 50%;
			transform: translateX(-50%);
		}

		&.fps-SliderHint-baseValue {
			background-color: var(--figma-color-icon);
		}
	}
</style>
