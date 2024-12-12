<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import { clickOutside } from './click-outside';

	export const meta = {
		title: 'clickOutside',
		parameters: {
			docs: {
				description: {
					component:
						'A Svelte action that detects clicks outside an element and triggers a callback'
				}
			},
			dualTheme: false
		}
	};
</script>

<script lang="ts">
	let count = 0;
	const handleClickOutside = () => count++;
</script>

<Story name="Default">
	<div class="demo">
		<div use:clickOutside={handleClickOutside} class="target">
			Click outside this box
			<p>Times clicked outside: {count}</p>
		</div>
	</div>
</Story>

<style>
	.demo {
		padding: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.target {
		padding: 2rem;
		background: #eee;
		border-radius: 8px;
		text-align: center;
	}
</style>
