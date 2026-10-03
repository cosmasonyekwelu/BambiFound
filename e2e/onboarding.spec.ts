import { test, expect } from '@playwright/test';

test.describe('BambiFound End-to-End Onboarding Flow & Guards', () => {
  const getUniqueUser = (prefix: string) => {
    const timestamp = Date.now() + Math.floor(Math.random() * 10000);
    return {
      fullName: `User ${prefix}`,
      email: `${prefix}_${timestamp}@example.com`,
      password: 'Password123!',
    };
  };

  test('Flow 1: Full Onboarding Completion (Step 1 -> 2 -> 3 -> 4 -> Complete -> Dashboard)', async ({ page }) => {
    const user = getUniqueUser('complete');

    // 1. Register
    await page.goto('/auth/register');
    await page.fill('input[id="fullName"]', user.fullName);
    await page.fill('input[id="email"]', user.email);
    await page.fill('input[id="password"]', user.password);
    await page.click('button[type="submit"]');

    // 2. Redirected to /onboarding (Step 1)
    await expect(page).toHaveURL(/\/onboarding/);
    await expect(page.locator('h1')).toContainText('What brings you to BambiFound?');
    await expect(page.getByText('Step 01 of 04')).toBeVisible();

    // Select intent card and continue
    await page.click('text=I’m building a venture or project');
    await page.click('button:has-text("Continue to Skills & Strengths")');

    // 3. Step 2 (Skills & Strengths)
    await expect(page.locator('h1')).toContainText('What are your core builder strengths?');
    await expect(page.getByText('Step 02 of 04')).toBeVisible();
    await page.click('button:has-text("Continue to Experience")');

    // 4. Step 3 (Experience)
    await expect(page.locator('h1')).toContainText('Where have you built, and what\'s next?');
    await expect(page.getByText('Step 03 of 04')).toBeVisible();
    await page.click('button:has-text("Continue to Profile Summary")');

    // 5. Step 4 (Matching Matrix)
    await expect(page.locator('h1')).toContainText('Here’s what BambiFound understood about you');
    await expect(page.getByText('Step 04 of 04')).toBeVisible();

    // Click Enter Ecosystem / Complete
    await page.click('button:has-text("Enter BambiFound Ecosystem")');

    // 6. Arrive at /dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator('h1')).toContainText(`Welcome, ${user.fullName}!`);
    await expect(page.getByText('Your dashboard is under construction.')).toBeVisible();
  });

  test('Flow 2: Skip Onboarding & Resume from Dashboard', async ({ page }) => {
    const user = getUniqueUser('skip');

    // 1. Register
    await page.goto('/auth/register');
    await page.fill('input[id="fullName"]', user.fullName);
    await page.fill('input[id="email"]', user.email);
    await page.fill('input[id="password"]', user.password);
    await page.click('button[type="submit"]');

    // 2. Arrive at /onboarding -> Click "Skip for now"
    await expect(page).toHaveURL(/\/onboarding/);
    await page.getByRole('button', { name: 'Skip for now' }).first().click();

    // Modal appears -> Confirm skip
    await expect(page.getByRole('heading', { name: 'Skip onboarding for now?' })).toBeVisible();
    await page.click('button:has-text("Skip to Dashboard")');

    // 3. Arrive at /dashboard with Skipped Banner
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator('h1')).toContainText(`Welcome, ${user.fullName}!`);
    await expect(page.getByText('Onboarding Skipped')).toBeVisible();

    // 4. Click "Complete Onboarding" link from banner
    await page.click('a:has-text("Complete Onboarding")');
    await expect(page).toHaveURL(/\/onboarding/);
  });

  test('Flow 3: Incomplete Onboarding Login & Step Persistence across sessions', async ({ page }) => {
    const user = getUniqueUser('persist');

    // 1. Register
    await page.goto('/auth/register');
    await page.fill('input[id="fullName"]', user.fullName);
    await page.fill('input[id="email"]', user.email);
    await page.fill('input[id="password"]', user.password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/onboarding/);
    await expect(page.getByText('Step 01 of 04')).toBeVisible();

    // Advance to Step 2
    await page.click('button:has-text("Continue to Skills & Strengths")');
    await expect(page.getByText('Step 02 of 04')).toBeVisible();

    // Try navigating directly to /dashboard -> Guard redirects back to /onboarding at Step 2
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/onboarding/);
    await expect(page.getByText('Step 02 of 04')).toBeVisible();

    // Log out
    await page.click('button:has-text("Log Out")');
    await expect(page.locator('header')).toContainText('Log In');

    // Log in again
    await page.click('a:has-text("Log In")');
    await page.fill('input[type="email"]', user.email);
    await page.fill('input[type="password"]', user.password);
    await page.click('button[type="submit"]');

    // Should return to /onboarding at Step 2
    await expect(page).toHaveURL(/\/onboarding/);
    await expect(page.getByText('Step 02 of 04')).toBeVisible();
  });

  test('Flow 4: Skip option present on all steps', async ({ page }) => {
    const user = getUniqueUser('skip_all');

    await page.goto('/auth/register');
    await page.fill('input[id="fullName"]', user.fullName);
    await page.fill('input[id="email"]', user.email);
    await page.fill('input[id="password"]', user.password);
    await page.click('button[type="submit"]');

    // Step 1: Skip present
    await expect(page.getByRole('button', { name: 'Skip for now' }).first()).toBeVisible();
    await page.click('button:has-text("Continue to Skills & Strengths")');

    // Step 2: Skip present
    await expect(page.getByRole('button', { name: 'Skip for now' }).first()).toBeVisible();
    await page.click('button:has-text("Continue to Experience")');

    // Step 3: Skip present
    await expect(page.getByRole('button', { name: 'Skip for now' }).first()).toBeVisible();
    await page.click('button:has-text("Continue to Profile Summary")');

    // Step 4: Skip present
    await expect(page.getByRole('button', { name: 'Skip for now' }).first()).toBeVisible();
    await page.getByRole('button', { name: 'Skip for now' }).first().click();
    await page.click('button:has-text("Skip to Dashboard")');

    await expect(page).toHaveURL(/\/dashboard/);
  });
});
