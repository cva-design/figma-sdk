<script context="module" lang="ts">
import { Story } from "@storybook/addon-svelte-csf";
import type { Meta } from "@storybook/svelte";
import { ActionGroup } from "../action-group";
import { Button } from "../button";
import DialogTitle from "./dialog-title.svelte";
import Dialog from "./dialog.svelte";

export const meta = {
	component: Dialog,
	argTypes: {
		open: { control: "boolean" },
		onClose: { action: "close" },
	},
} satisfies Meta<typeof Dialog>;
</script>

<script lang="ts">
	let isOpen = false;
	let isLongContentOpen = false;
	let isDestructiveOpen = false;
	let isCustomOpen = false;
</script>

<Story name="Default">
	<div class="story-wrapper">
		<Button on:click={() => isOpen = true}>Open Dialog</Button>
		<Dialog open={isOpen} class="dialog-test">
			<DialogTitle>Default Dialog</DialogTitle>
			<p>This is a basic dialog with a title and some content.</p>
			<ActionGroup>
				<Button variant="secondary" on:click={() => isOpen = false}>Cancel</Button>
				<Button variant="primary" on:click={() => isOpen = false}>Confirm</Button>
			</ActionGroup>
		</Dialog>
	</div>
</Story>

<Story name="WithLongContent">
	<div class="story-wrapper">
		<Button on:click={() => isLongContentOpen = true}>Open Dialog</Button>
		<Dialog open={isLongContentOpen} >
			<DialogTitle>Dialog with Long Content</DialogTitle>
			<div class="content">
				<p>This dialog contains a longer content section to demonstrate scrolling behavior.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
				<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
			</div>
			<ActionGroup>
				<Button variant="secondary" on:click={() => isLongContentOpen = false}>Cancel</Button>
				<Button variant="primary" on:click={() => isLongContentOpen = false}>Confirm</Button>
			</ActionGroup>
		</Dialog>
	</div>
</Story>

<Story name="WithDestructiveAction">
	<div class="story-wrapper">
		<Button on:click={() => isDestructiveOpen = true}>Open Dialog</Button>
		<Dialog open={isDestructiveOpen} >
			<DialogTitle>Confirm Deletion</DialogTitle>
			<p>Are you sure you want to delete this item? This action cannot be undone.</p>
			<ActionGroup>
				<Button variant="secondary" on:click={() => isDestructiveOpen = false}>Cancel</Button>
				<Button variant="destructive" on:click={() => isDestructiveOpen = false}>Delete</Button>
			</ActionGroup>
		</Dialog>
	</div>
</Story>

<Story name="WithCustomButtons">
	<div class="story-wrapper">
		<Button on:click={() => isCustomOpen = true}>Open Dialog</Button>
		<Dialog open={isCustomOpen} class="background-color: var(--figma-color-bg-brand-tertiary);">
			<DialogTitle>Custom Actions</DialogTitle>
			<p>This dialog shows different button variants and arrangements.</p>
			<ActionGroup>
				<Button variant="text" on:click={() => isCustomOpen = false}>Skip</Button>
				<Button variant="secondary" on:click={() => isCustomOpen = false}>Back</Button>
				<Button variant="primary" on:click={() => isCustomOpen = false}>Next</Button>
			</ActionGroup>
		</Dialog>
	</div>
</Story>

<style>
	.story-wrapper {
		/* Add padding and center the dialog in the preview */
		padding: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 300px;
		background-color: var(--figma-color-bg);
	}

	.dialog-test {
		background-color: var(--figma-color-bg-brand-tertiary);
	}

	.content {
		margin: 1rem 0;
	}

	p {
		margin: 0.5rem 0;
		color: var(--figma-color-text);
	}
</style>
