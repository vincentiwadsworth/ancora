import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads and displays brand name', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/ANCORA/);
    await expect(page.locator('h1')).toContainText(
      'Administramos tu propiedad',
    );
  });

  test('navigates to services page', async ({ page }) => {
    await page.goto('/');
    await page.click('nav a[href="/services"], a[href="/services"]');
    await expect(page).toHaveURL(/.*services/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('navigates to about page', async ({ page }) => {
    await page.goto('/');
    await page.click('nav a[href="/about"], a[href="/about"]');
    await expect(page).toHaveURL(/.*about/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('navigates to contact page', async ({ page }) => {
    await page.goto('/');
    await page.click('nav a[href="/contact"], a[href="/contact"]');
    await expect(page).toHaveURL(/.*contact/);
    await expect(page.locator('h1')).toBeVisible();
  });
});
