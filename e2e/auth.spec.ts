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

    // 2. User opens registration
    await page.click('text=Get Started — Free');
    await expect(page).toHaveURL(/\/auth\/register/);
    await expect(page.locator('h1')).toContainText('Create your account');

    // 3. User registers
    await page.fill('input[placeholder="Ada Lovelace"]', fullName);
    await page.fill('input[placeholder="ada@startup.com"]', email);
    await page.fill('input[placeholder="At least 8 characters"]', password);
    await page.click('button[type="submit"]');

    // 4. Authenticated state is established
    await expect(page).toHaveURL('/');
    await expect(page.locator('header')).toContainText(fullName);

    // Take screenshot of authenticated state
    await page.screenshot({ path: 'e2e-authenticated.png' });

    // 5. User can log out
    await page.click('button:has-text("Log Out")');
    await expect(page.locator('header')).toContainText('Log In');

    // 6. User can log in again
    await page.click('a:has-text("Log In")');
    await expect(page).toHaveURL(/\/auth\/login/);
    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);
    await page.click('button[type="submit"]');

    // Authenticated state re-established
    await expect(page).toHaveURL('/');
    await expect(page.locator('header')).toContainText(fullName);
  });
});
