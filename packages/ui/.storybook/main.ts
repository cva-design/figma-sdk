import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|ts|svelte)'],

    addons: [
        '@storybook/addon-svelte-csf',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',
        '@storybook/addon-mdx-gfm'
    ],

    framework: {
		name: '@storybook/sveltekit',
		options: {}
	},

    docs: {}
};
export default config;
