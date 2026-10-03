import { test, expect } from '@playwright/test';

test.describe('BambiFound Payment & Membership Subscription Flow', () => {
  const timestamp = Date.now();
  const email = `paytest_${timestamp}@example.com`;
  const password = 'Password123!';
  const fullName = 'Payment Tester';

  test('User subscribes to Plus tier via Paystack flow', async ({ page }) => {
    // 1. Register & Skip Onboarding to go to Dashboard
    await page.goto('/auth/register');
    await page.fill('input[id="fullName"]', fullName);
    await page.fill('input[id="email"]', email);
    await page.fill('input[id="password"]', password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/onboarding/);
    await page.getByRole('button', { name: 'Skip for now' }).first().click();
    await page.click('button:has-text("Skip to Dashboard")');
    await expect(page).toHaveURL(/\/dashboard/);

    // 2. Navigate to Membership Plans Settings
    await page.goto('/settings/membership');
    await expect(page.locator('h1')).toContainText('Settings & Workspace');
    await expect(page.getByText('Current Plan: BambiFound FREE Tier')).toBeVisible();

    // 3. Click Subscribe to Plus
    await page.click('button:has-text("Subscribe to Plus")');

    // 4. Verification modal appears
    await expect(page.getByRole('heading', { name: 'Payment Successful!' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Your account has been upgraded to BambiFound PLUS')).toBeVisible();

    // 5. Click Go to Dashboard
    await page.click('button:has-text("Go to Dashboard")');
    await expect(page).toHaveURL(/\/dashboard/);

    // 6. Verify header badge updated to PLUS TIER
    await expect(page.locator('header')).toContainText('PLUS TIER');
  });
});
