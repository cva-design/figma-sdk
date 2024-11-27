<script context="module" lang="ts">
import { Story } from "@storybook/addon-svelte-csf";
import { Paragraph } from "./index";

export const meta = {
	title: "Paragraph",
	component: Paragraph,
	argTypes: {
		size: {
			control: "select",
			options: ["small", "medium", "large"],
		},
		weight: {
			control: "select",
			options: ["default", "strong"],
		},
		align: {
			control: "select",
			options: ["left", "center", "right"],
		},
		block: { control: "boolean" },
	},
};
</script>

<Story name="Default">
	<Paragraph>Default Paragraph</Paragraph>
</Story>

<Story name="Small">
	<Paragraph size="small">Small Paragraph</Paragraph>
</Story>

<Story name="Large">
	<Paragraph size="large">Large Paragraph</Paragraph>
</Story>

<Story name="Strong">
	<Paragraph weight="strong">Strong Paragraph</Paragraph>
</Story>

<Story name="Centered">
	<Paragraph align="center" block>Centered Paragraph</Paragraph>
</Story>
