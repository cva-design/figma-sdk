<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import type { SvelteComponent } from 'svelte';
	import { Button } from '../button';
	import { IconButton } from '../icon-button';
	import ActionGroup from './action-group.svelte';

	export const meta = {
		title: 'ActionGroup',
		component: ActionGroup,
		argTypes: {
			class: { control: 'text' }
		}
	} satisfies Meta<SvelteComponent>;
</script>

<Story name="Default">
	<ActionGroup>
		<Button>Edit</Button>
		<Button>Delete</Button>
		<Button>Save</Button>
	</ActionGroup>
</Story>

<Story name="With Icon Buttons">
	<ActionGroup>
		<IconButton iconName="AdjustSvg" />
		<IconButton iconName="BackSvg" />
		<IconButton iconName="DraftSvg" />
		<IconButton iconName="TimerSvg" />
		<IconButton iconName="StarOnSvg" />
	</ActionGroup>
</Story>

<Story name="Mixed">
	<ActionGroup>
		<Button>Edit</Button>
		<IconButton iconName="StarOnSvg" />
		<Button>Save</Button>
	</ActionGroup>
</Story>

<Story name="With Primary Buttons">
	<ActionGroup>
		<Button variant="primary">Save</Button>
		<Button variant="primary">Cancel</Button>
		<Button variant="primary">Delete</Button>
	</ActionGroup>
</Story>

<Story name="With Secondary Buttons">
	<ActionGroup>
		<Button variant="secondary">Save</Button>
		<Button variant="secondary">Cancel</Button>
		<Button variant="secondary">Delete</Button>
	</ActionGroup>
</Story>

<Story name="With Different Variants">
	<ActionGroup>
		<Button variant="primary">Save</Button>
		<Button variant="destructive">Delete</Button>
		<Button variant="secondary">Cancel</Button>
	</ActionGroup>
</Story>

<Story name="Small Size">
	<ActionGroup>
		<Button size="small">Edit</Button>
		<Button size="small">Delete</Button>
		<Button size="small">Save</Button>
	</ActionGroup>
</Story>

<Story name="Medium Size">
	<ActionGroup>
		<Button size="medium">Edit</Button>
		<Button size="medium">Delete</Button>
		<Button size="medium">Save</Button>
	</ActionGroup>
</Story>

<style>
	/* Add padding around stories for better visibility */
	:global(.sb-show-main) {
		padding: 1rem;
	}
</style>
