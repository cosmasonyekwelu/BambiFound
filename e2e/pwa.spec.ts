import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('PWA Requirements & Installability', () => {
  test('Manifest file exists, is valid JSON, and contains required PWA fields', async () => {
    const manifestPath = path.resolve('client/dist/manifest.webmanifest');
    expect(fs.existsSync(manifestPath)).toBe(true);

    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    const manifest = JSON.parse(manifestContent);

    expect(manifest.name).toBe('BambiFound — Find the people who help you build');
    expect(manifest.short_name).toBe('BambiFound');
    expect(manifest.start_url).toBe('/');
    expect(manifest.display).toBe('standalone');
    expect(manifest.theme_color).toBe('#14281d');
    expect(manifest.background_color).toBe('#f7faf5');
    expect(Array.isArray(manifest.icons)).toBe(true);
    expect(manifest.icons.length).toBeGreaterThanOrEqual(3);

    // Verify icons exist on disk
    for (const icon of manifest.icons) {
      const iconPath = path.resolve('client/dist', icon.src.replace(/^\//, ''));
      expect(fs.existsSync(iconPath)).toBe(true);
      expect(fs.statSync(iconPath).size).toBeGreaterThan(0);
    }
  });

  test('Service worker file exists and contains security and lifecycle logic', async () => {
    const swPath = path.resolve('client/dist/sw.js');
    expect(fs.existsSync(swPath)).toBe(true);

    const swContent = fs.readFileSync(swPath, 'utf8');
    expect(swContent).toContain("url.pathname.startsWith('/api')");
    expect(swContent).toContain("self.skipWaiting()");
    expect(swContent).toContain("self.clients.claim()");
  });

  test('Web App Manifest and Service Worker load successfully on the client', async ({ page }) => {
    // Intercept and monitor console error messages
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Navigate to root
    const response = await page.goto('/', { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);

    // Check manifest link element
    const manifestLink = await page.locator('link[rel="manifest"]').getAttribute('href');
    expect(manifestLink).toBe('/manifest.webmanifest');

    // Fetch manifest endpoint over network
    const manifestResponse = await page.request.get('/manifest.webmanifest');
    expect(manifestResponse.status()).toBe(200);
    const manifestJson = await manifestResponse.json();
    expect(manifestJson.short_name).toBe('BambiFound');

    // Fetch SW endpoint over network
    const swResponse = await page.request.get('/sw.js');
    expect(swResponse.status()).toBe(200);

    // Verify Service Worker is registered in window.navigator
    const isSwRegistered = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return false;
      const regs = await navigator.serviceWorker.getRegistrations();
      return regs.length > 0;
    });

    expect(isSwRegistered).toBe(true);

    // Filter out expected backend offline or 401 errors
    const criticalErrors = errors.filter(
      (e) => !e.includes('401') && !e.includes('ERR_CONNECTION_REFUSED') && !e.includes('/api/')
    );
    expect(criticalErrors).toHaveLength(0);
  });
});
