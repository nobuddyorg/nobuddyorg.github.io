import { test, expect } from '@playwright/test';

test.describe('NoBuddy main page - cards section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'The Buddy Compendium' })).toBeVisible();
    await expect(page.getByRole('link')).toHaveCount(9);
  });

  test('has exactly 2 enabled card in #tools', async ({ page }) => {
    const enabledCards = page.getByTestId('ready');
    await expect(enabledCards).toHaveCount(2);
    await expect(enabledCards.first()).toBeVisible();
  });

  test('first enabled card has correct href', async ({ page }) => {
    const firstEnabledCardLink = page.locator('#tools a[href^="/tools/"]').first();
    await expect(firstEnabledCardLink).toBeVisible();
    await expect(firstEnabledCardLink).toHaveAttribute('href', /^\/tools\//);
  });

  test('disabled cards exist and are not clickable', async ({ page }) => {
    const disabledCards = page.getByTestId('coming_soon');
    await expect(disabledCards).toHaveCount(1);

    const firstDisabledCard = disabledCards.first();

    const urlBefore = page.url();
    await firstDisabledCard.click({ timeout: 1000 }).catch(() => { });
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
