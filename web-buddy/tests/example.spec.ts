import { test, expect } from '@playwright/test';

test('should have the correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Procrastination Buddy/);
});

test('should navigate to the about page', async ({ page }) => {
  await page.goto('/');
  await page.click('text=About');
  await expect(page).toHaveURL('/about');
  await expect(page.locator('h1')).toHaveText('About Procrastination Buddy');
});
