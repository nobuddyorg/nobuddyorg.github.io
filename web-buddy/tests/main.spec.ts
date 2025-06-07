import { test, expect } from '@playwright/test';

test.describe('NoBuddy main page - cards section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has exactly 1 enabled card in #tools', async ({ page }) => {
    const enabledCards = page.locator('#tools a[href^="/tools/"] > div.group.block.rounded-2xl');
    await expect(enabledCards).toHaveCount(1);
    await expect(enabledCards.first()).toBeVisible();
  });

  test('first enabled card has correct href', async ({ page }) => {
    const firstEnabledCardLink = page.locator('#tools a[href^="/tools/"]').first();
    await expect(firstEnabledCardLink).toBeVisible();
    await expect(firstEnabledCardLink).toHaveAttribute('href', /^\/tools\//);
  });

  test('disabled cards exist and are not clickable', async ({ page }) => {
    const disabledCards = page.locator('#tools > div > div.cursor-not-allowed');
    const count = await disabledCards.count();
    await expect(disabledCards).toHaveCount(2);

    const firstDisabledCard = disabledCards.first();
    await expect(firstDisabledCard).toHaveClass(/cursor-not-allowed/);

    const urlBefore = page.url();
    await firstDisabledCard.click({ timeout: 1000 }).catch(() => {});
    await expect(page).toHaveURL(urlBefore);
  });

  test('clicking the first enabled card navigates and shows content', async ({ page }) => {
    const firstEnabledCardLink = page.locator('#tools a[href^="/tools/"]').first();
    await expect(firstEnabledCardLink).toBeVisible();

    await firstEnabledCardLink.click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/\/tools\/.+/);
    await expect(page.locator('h1')).toContainText(/Procrastination Buddy/i);
  });
});
