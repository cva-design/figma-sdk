<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import Checkbox from './checkbox.svelte';

	export const meta = {
		title: 'Components/Checkboxes/melt',
		component: Checkbox
	} satisfies Meta<typeof Checkbox>;
</script>

<Story name="WithLabel">
	<Checkbox label="Clip content" />
</Story>

<Story name="WithoutLabel">
	<Checkbox />
</Story>

<Story name="Indeterminate">
	<Checkbox label="Clip content" indeterminate />
</Story>

<Story name="Disabled">
	<Checkbox label="Clip content" disabled />
</Story>

<Story name="DisabledChecked">
	<Checkbox label="Clip content" disabled checked />
</Story>

<Story name="DisabledIndeterminate">
	<Checkbox label="Clip content" disabled indeterminate />
</Story>

<Story name="MultiLineLabel">
	<div style="width: 128px;">
		<Checkbox label="Clip content with label that spans multiple lines" />
	</div>
</Story>

<Story name="Description">
	<div style="max-width: 512px;">
		<Checkbox label="Checkbox with description">
			<span slot="description">
				Helpful description of the option which may briefly highlight side effects or conditions of
				the option.
			</span>
		</Checkbox>
	</div>
</Story>
