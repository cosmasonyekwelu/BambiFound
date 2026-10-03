import { test, expect } from '@playwright/test';

test.describe('BambiFound E2E Critical Authentication Flow', () => {
  const timestamp = Date.now();
  const email = `e2etest_${timestamp}@example.com`;
  const password = 'Password123!';
  const fullName = 'E2E Tester';

  test('Complete Authentication Lifecycle', async ({ page }) => {
    // 1. Landing page loads
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Find the people who help you build.');

    // 2. User opens registration and verifies social OAuth buttons
    await page.goto('/auth/register');
    await expect(page.locator('h1')).toContainText('Create your account');
    await expect(page.locator('button:has-text("Continue with Google")')).toBeVisible();
    await expect(page.locator('button:has-text("Continue with GitHub")')).toBeVisible();

    // 3. User registers
    await page.fill('input[id="fullName"]', fullName);
    await page.fill('input[id="email"]', email);
    await page.fill('input[id="password"]', password);
    await page.click('button[type="submit"]');

    // 4. Authenticated state is established (new user lands on /onboarding)
    await expect(page).toHaveURL(/\/onboarding/);
    await expect(page.locator('header')).toContainText(fullName);

    // Take screenshot of authenticated state
    await page.screenshot({ path: 'e2e-authenticated.png' });

    // 5. User can log out
    await page.click('button:has-text("Log Out")');
    await expect(page.locator('header')).toContainText('Log In');

    // 6. User can log in again, verifying OAuth buttons on login page
    await page.click('a:has-text("Log In")');
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.locator('button:has-text("Continue with Google")')).toBeVisible();
    await expect(page.locator('button:has-text("Continue with GitHub")')).toBeVisible();

    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);
    await page.click('button[type="submit"]');

    // Authenticated state re-established (routed to /onboarding because incomplete)
    await expect(page).toHaveURL(/\/onboarding/);
    await expect(page.locator('header')).toContainText(fullName);
  });
});
