import { chromium } from '@playwright/test';
import { expect, test } from 'vitest';

test('Button visual regression test', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:6006/iframe.html?id=button--default');

  const screenshot = await page.screenshot();
  expect(screenshot).toMatchSnapshot();

  await browser.close();
});

// Add more visual tests as needed
