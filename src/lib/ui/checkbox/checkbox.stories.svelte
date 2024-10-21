<script context="module" lang="ts">
	import { Checkbox } from '$ui';
	import { Story } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'ui/Checkbox',
		component: Checkbox,
		argTypes: {
			checked: { control: 'boolean' },
			disabled: { control: 'boolean' },
			indeterminate: { control: 'boolean' },
			label: { control: 'text' },
			description: { control: 'text' },
			onChange: { action: 'changed' }
		}
	};
</script>

<Story name="WithLabel">
	<Checkbox on:change label="Some Label" />
</Story>

<Story name="WithoutLabel">
	<Checkbox on:change />
</Story>

<Story name="Indeterminate">
	<Checkbox label="Clip content" indeterminate on:change />
</Story>

<Story name="Disabled">
	<Checkbox label="Clip content" disabled on:change />
</Story>

<Story name="DisabledChecked">
	<Checkbox label="Clip content" disabled checked on:change />
</Story>

<Story name="DisabledIndeterminate">
	<Checkbox label="Clip content" disabled indeterminate on:change />
</Story>

<Story name="MultiLineLabel">
	<div style="width: 128px;">
		<Checkbox label="Clip content with label that spans multiple lines" on:change />
	</div>
</Story>

<Story name="Description">
	<div style="max-width: 512px;">
		<Checkbox
			label="Checkbox with description"
			description="Helpful description of the option which may briefly highlight side effects or conditions of the option."
			on:change
		/>
	</div>
</Story>
