<script context="module" lang="ts">
import { Story } from "@storybook/addon-svelte-csf";
import type { Meta } from "@storybook/svelte";
import Input from "./input.svelte";

import type { SvelteComponent } from 'svelte';

export const meta = {
	title: "Input",
	component: Input,
	argTypes: {
		value: { control: "text" },
		placeholder: { control: "text" },
		disabled: { control: "boolean" },
		borders: { control: "boolean" },
		invalid: { control: "boolean" },
		errorMessage: { control: "text" },
		type: {
			control: "select",
			options: ["text", "password", "email", "number"],
		},
		iconUrl: { control: "text" },
		iconText: { control: "text" },
		spin: { control: "boolean" },
	},
} satisfies Meta<SvelteComponent>;;
</script>

<Story name="Default">
	<Input placeholder="Type something..." />
</Story>

<Story name="WithIcon">
	<Input icon="SearchSvg" placeholder="Search..." />
</Story>

<Story name="WithIconText">
	<Input iconText="$" placeholder="Enter amount..." />
</Story>

<Story name="WithBorders">
	<Input borders placeholder="With borders..." />
</Story>

<Story name="Disabled">
	<Input disabled placeholder="Disabled input..." />
</Story>

<Story name="Invalid">
	<Input invalid errorMessage="This field is required" placeholder="Invalid input..." />
</Story>

<Story name="Password">
	<Input type="password" placeholder="Enter password..." />
</Story>

<Story name="SpinningIcon">
	<Input icon="SpinnerSvg" spin placeholder="Loading..." />
</Story>

<Story name="FullWidth">
	<div style="width: 100%;">
		<Input placeholder="Full width input..." />
	</div>
</Story>

<Story name="WithValue">
	<Input value="Prefilled value" />
</Story>
