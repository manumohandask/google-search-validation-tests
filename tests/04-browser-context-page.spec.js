import { test, expect, chromium } from '@playwright/test';

const BASE_URL = 'https://automationexercise.com';

// -------------------------------------------------------------------
// Playwright's test fixture automatically manages browser → context → page.
// These tests show what is happening under the hood.
// -------------------------------------------------------------------

test.describe('Using the default page fixture (recommended)', () => {
  test('Playwright injects browser, context and page automatically', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page).toHaveTitle(/Automation Exercise/);
    console.log('Title:', await page.title());
    console.log('URL:  ', page.url());
  });
});

test.describe('Manual browser → context → page hierarchy', () => {
  test('Launch a browser manually and create a context', async () => {
    // Step 1 — launch the browser process
    const browser = await chromium.launch({ headless: false });

    // Step 2 — create a BrowserContext (isolated session, like an incognito window)
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      locale: 'en-US',
    });

    // Step 3 — open a page (tab) inside that context
    const page = await context.newPage();

    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Automation Exercise/);

    console.log('Browser type:', browser.browserType().name());
    console.log('Open pages in context:', context.pages().length);

    await context.close();
    await browser.close();
  });

  test('Two independent contexts — simulate two users simultaneously', async ({ browser }) => {
    // Each context has its own cookies, localStorage and session state
    const userOneCtx = await browser.newContext();
    const userTwoCtx = await browser.newContext();

    const pageOne = await userOneCtx.newPage();
    const pageTwo = await userTwoCtx.newPage();

    await pageOne.goto(`${BASE_URL}/login`);
    await pageTwo.goto(`${BASE_URL}/products`);

    console.log('User 1 is on:', pageOne.url());
    console.log('User 2 is on:', pageTwo.url());

    // Cookie or login state from user one will never leak into user two
    await userOneCtx.close();
    await userTwoCtx.close();
  });

  test('Multiple pages (tabs) inside the same context', async ({ context }) => {
    const tab1 = await context.newPage();
    const tab2 = await context.newPage();

    await tab1.goto(BASE_URL);
    await tab2.goto(`${BASE_URL}/products`);

    console.log('Tab 1:', tab1.url());
    console.log('Tab 2:', tab2.url());
    console.log('Total open tabs:', context.pages().length);

    await tab2.close();
    console.log('Tabs after closing tab 2:', context.pages().length);
  });

  test('Context options — set viewport, userAgent, permissions', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
      geolocation: { latitude: 35.8997, longitude: 14.5147 },
      permissions: ['geolocation'],
      locale: 'en-MT',
    });

    const page = await context.newPage();
    await page.goto(BASE_URL);

    const viewport = page.viewportSize();
    console.log('Viewport:', viewport);

    await context.close();
  });
});
