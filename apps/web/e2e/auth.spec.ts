import { test, expect } from '@playwright/test';

test.describe('BambiFound Authentication Flow', () => {
  test('should display landing page with core title', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Find the people who');
    await expect(page.locator('text=Get Started').first()).toBeVisible();
  });

  test('should navigate to registration flow', async ({ page }) => {
    await page.goto('/register');
    await expect(page.locator('h1')).toContainText('What brings you to BambiFound?');
    await page.click('text=Continue to Account Creation');
    await expect(page.locator('h1')).toContainText('Create your account');
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('h1')).toContainText('Welcome back to BambiFound');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });
});
