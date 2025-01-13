<div class="theme-split">
	<div class="themed figma-light" data-preferred-theme="light">
		<slot />
	</div>
	<div class="themed figma-dark" data-preferred-theme="dark">
		<slot />
	</div>
</div>

<style>
	:global(body) {
		margin: 0 !important;
		padding: 0 !important;
	}

	:global(#storybook-root) {
		display: flex;
		margin: 0 !important;
		padding: 0 !important;
		height: 100vh;
		min-height: 60px !important;
		min-width: 100% !important;
		flex: 1; /* Ensures equal space distribution */
	}

	:global(#storybook-root[hidden='true']) {
		display: none;
	}

	:global(.docs-story #storybook-root) {
		height: 400px;
	}

	.theme-split {
		display: flex;
		width: 100vw;
		height: 100%;
		min-height: 60px !important;
		/* background-color: var(--figma-color-bg-component); */
	}

	:global(.docs-story > div:first-child) {
		padding: 0 0 25px 0 !important;
	}

	.themed {
		background-color: var(--figma-color-bg);
		height: 100%;
		padding: 30px;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
