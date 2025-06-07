import { test, expect } from '@playwright/test';

test.describe('NoBuddy main page - cards section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has at least 1 enabled card in #tools', async ({ page }) => {
    const enabledCards = page.locator('#tools a[href^="/tools/"] > div.group.block.rounded-2xl');
    await expect(enabledCards.first()).toBeVisible();
  });

  test('first enabled card has correct href', async ({ page }) => {
    const firstEnabledCardLink = page.locator('#tools a[href^="/tools/"]').first();
    await expect(firstEnabledCardLink).toBeVisible();
    await expect(firstEnabledCardLink).toHaveAttribute('href', /^\/tools\//);
  });

  test('disabled cards exist and are not clickable', async ({ page }) => {
    const disabledCards = page.locator('#tools > div > div.cursor-not-allowed');
    expect(await disabledCards.count()).toBeGreaterThan(0);

    const firstDisabledCard = disabledCards.first();
    await expect(firstDisabledCard).toHaveClass(/cursor-not-allowed/);

    const urlBefore = page.url();
    await firstDisabledCard.click({ timeout: 1000 }).catch(() => {});
    const urlAfter = page.url();
    expect(urlAfter).toBe(urlBefore);
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
