import { test, expect } from '@playwright/test';

const BASE_URL = 'https://automationexercise.com';

// -------------------------------------------------------------------
// page.goto() — waitUntil options
// -------------------------------------------------------------------

test.describe('goto() with different waitUntil values', () => {
  test('waitUntil: domcontentloaded — fastest, DOM is parsed', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

    console.log('domcontentloaded: HTML parsed, scripts may still be running');
    await expect(page).toHaveTitle(/Automation Exercise/);
  });

  test('waitUntil: load — all resources including images are done', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'load' });

    console.log('load: all resources (images, stylesheets, scripts) are finished');
    await expect(page).toHaveTitle(/Automation Exercise/);
  });

  test('waitUntil: networkidle — no network requests for 500ms', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    console.log('networkidle: heaviest wait — good for SPAs with lots of async calls');
    await expect(page).toHaveTitle(/Automation Exercise/);
  });

  test('Custom timeout on goto()', async ({ page }) => {
    // Overrides the global timeout just for this navigation
    await page.goto(BASE_URL, { timeout: 30000 });

    console.log('Page loaded within custom 30-second timeout');
  });
});

// -------------------------------------------------------------------
// Checking current URL and title
// -------------------------------------------------------------------

test.describe('page.url() and page.title()', () => {
  test('Read the current URL and title after navigation', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    console.log('URL:  ', page.url());
    console.log('Title:', await page.title());

    await expect(page).toHaveURL(`${BASE_URL}/products`);
    await expect(page).toHaveTitle(/All Products/);
  });

  test('toHaveURL() supports regex and glob patterns', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    await expect(page).toHaveURL(/products/);
    await expect(page).toHaveURL('**/products');
  });
});

// -------------------------------------------------------------------
// History navigation
// -------------------------------------------------------------------

test.describe('goBack(), goForward() and reload()', () => {
  test('Navigate forward and back through browser history', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.goto(`${BASE_URL}/products`);

    console.log('Currently on:', page.url());

    await page.goBack();
    console.log('After goBack():', page.url());
    await expect(page).toHaveURL(`${BASE_URL}/`);

    await page.goForward();
    console.log('After goForward():', page.url());
    await expect(page).toHaveURL(`${BASE_URL}/products`);
  });

  test('reload() refreshes the current page', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    await page.reload();

    await expect(page).toHaveURL(`${BASE_URL}/products`);
    console.log('Page reloaded:', page.url());
  });

  test('reload() with a specific waitUntil', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.reload({ waitUntil: 'domcontentloaded' });

    console.log('Reloaded and waited for domcontentloaded');
  });
});

// -------------------------------------------------------------------
// Waiting for navigation after an action
// -------------------------------------------------------------------

test.describe('waitForURL() and waitForLoadState()', () => {
  test('waitForURL() — waits until the current URL matches', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByRole('link', { name: 'Products' }).click();

    // Wait until the URL contains "products" - supports string, glob and regex
    await page.waitForURL('**/products');

    console.log('URL after waitForURL:', page.url());
    await expect(page).toHaveURL(`${BASE_URL}/products`);
  });

  test('waitForLoadState() — wait for a load event after a click', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByRole('link', { name: 'Products' }).click();
    await page.waitForLoadState('domcontentloaded');

    console.log('DOM content loaded after navigation to:', page.url());
  });

  test('waitForLoadState() — networkidle after navigation', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByRole('link', { name: 'Products' }).click();
    await page.waitForLoadState('networkidle');

    console.log('Network is idle, page fully settled at:', page.url());
  });
});
