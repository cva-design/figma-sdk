import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';
import { render } from '@testing-library/svelte';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import Button from './button.svelte';

expect.extend({ toMatchImageSnapshot });

describe('Button Visual Tests', () => {
  it('renders correctly', async () => {
    const { container } = render(Button, {
      props: { children: 'Test Button' },
    });
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });

  // Add more visual tests for different variants, sizes, etc.
});

initStoryshots({
  suite: 'Button Visual Regression Tests',
  test: imageSnapshot({
    storybookUrl: 'http://localhost:6007', // Use a different port for Svelte Storybook
  }),
});
