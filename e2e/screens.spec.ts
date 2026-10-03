import { test, expect } from '@playwright/test';

test.describe('BambiFound New Stitch Screens Navigation & Functionality', () => {
  const getUniqueUser = (prefix: string) => {
    const timestamp = Date.now() + Math.floor(Math.random() * 10000);
    return {
      fullName: `User ${prefix}`,
      email: `${prefix}_${timestamp}@example.com`,
      password: 'Password123!',
    };
  };

  test('Dashboard loads command center and match cards', async ({ page }) => {
    const user = getUniqueUser('dash');
    await page.goto('/auth/register');
    await page.fill('input[id="fullName"]', user.fullName);
    await page.fill('input[id="email"]', user.email);
    await page.fill('input[id="password"]', user.password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/onboarding/);
    await page.getByRole('button', { name: 'Skip for now' }).first().click();
    await page.click('button:has-text("Skip to Dashboard")');
    await expect(page).toHaveURL(/\/dashboard/);

    await expect(page.locator('h1')).toContainText(`Welcome, ${user.fullName}!`);
    await expect(page.getByRole('link', { name: 'Elena Vance' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Marcus Thorne' }).first()).toBeVisible();
  });

  test('Discover Builders screen search and filtering', async ({ page }) => {
    const user = getUniqueUser('disc');
    await page.goto('/auth/register');
    await page.fill('input[id="fullName"]', user.fullName);
    await page.fill('input[id="email"]', user.email);
    await page.fill('input[id="password"]', user.password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/onboarding/);
    await page.getByRole('button', { name: 'Skip for now' }).first().click();
    await page.click('button:has-text("Skip to Dashboard")');

    await page.goto('/discover');
    await expect(page.locator('h1')).toContainText('Discover Curated Builders');

    // Search filter
    await page.fill('input[placeholder="Search skills, roles, names..."]', 'Elena');
    await expect(page.getByRole('link', { name: 'Elena Vance' }).first()).toBeVisible();
  });

  test('Venture Listings screen listing new venture', async ({ page }) => {
    const user = getUniqueUser('vent');
    await page.goto('/auth/register');
    await page.fill('input[id="fullName"]', user.fullName);
    await page.fill('input[id="email"]', user.email);
    await page.fill('input[id="password"]', user.password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/onboarding/);
    await page.getByRole('button', { name: 'Skip for now' }).first().click();
    await page.click('button:has-text("Skip to Dashboard")');

    await page.goto('/ventures');
    await expect(page.locator('h1')).toContainText('Your Venture Listings');

    // Open new venture modal
    await page.click('button:has-text("Spin Out or List Venture")');
    await page.fill('input[placeholder="e.g. Apex Compute"]', 'Apex Compute AI');
    await page.fill('input[placeholder="e.g. Autonomous GPU compute marketplace"]', 'GPU compute orchestration engine');
    await page.click('button:has-text("Publish Venture Listing")');

    // Verify venture appears
    await expect(page.getByRole('heading', { name: 'Apex Compute AI' })).toBeVisible();
  });

  test('Intros & Messages interface sends message', async ({ page }) => {
    const user = getUniqueUser('msg');
    await page.goto('/auth/register');
    await page.fill('input[id="fullName"]', user.fullName);
    await page.fill('input[id="email"]', user.email);
    await page.fill('input[id="password"]', user.password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/onboarding/);
    await page.getByRole('button', { name: 'Skip for now' }).first().click();
    await page.click('button:has-text("Skip to Dashboard")');

    await page.goto('/messages');
    await expect(page.locator('h1')).toContainText('Intros & Dialogue');
    await expect(page.getByRole('heading', { name: 'Elena Vance' })).toBeVisible();

    // Send a message in chat
    await page.fill('input[placeholder^="Message"]', 'Hello from E2E test!');
    await page.click('button:has-text("Send")');

    await expect(page.getByText('Hello from E2E test!').first()).toBeVisible();
  });

  test('Peer Profile screen displays match insights and triggers intro modal', async ({ page }) => {
    const user = getUniqueUser('peer');
    await page.goto('/auth/register');
    await page.fill('input[id="fullName"]', user.fullName);
    await page.fill('input[id="email"]', user.email);
    await page.fill('input[id="password"]', user.password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/onboarding/);
    await page.getByRole('button', { name: 'Skip for now' }).first().click();
    await page.click('button:has-text("Skip to Dashboard")');

    await page.goto('/profile/elena-vance');
    await expect(page.locator('h1').first()).toContainText('Elena Vance');

    // Trigger Request Intro modal
    await page.click('button:has-text("Request Intro")');
    await expect(page.getByRole('heading', { name: 'Request Intro to Elena Vance' })).toBeVisible();
  });

  test('Profile Edit screen updates user profile information', async ({ page }) => {
    const user = getUniqueUser('edit');
    await page.goto('/auth/register');
    await page.fill('input[id="fullName"]', user.fullName);
    await page.fill('input[id="email"]', user.email);
    await page.fill('input[id="password"]', user.password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/onboarding/);
    await page.getByRole('button', { name: 'Skip for now' }).first().click();
    await page.click('button:has-text("Skip to Dashboard")');

    await page.goto('/profile/edit');
    await expect(page.locator('h1')).toContainText('Edit Your Builder Profile');

    await page.fill('input[value="' + user.fullName + '"]', user.fullName + ' Updated');
    await page.click('button:has-text("Save Profile Changes")');

    await expect(page.getByText('Profile changes saved successfully!')).toBeVisible();
  });
});
