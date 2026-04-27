import { test, expect } from '@playwright/test';
import fs from 'fs';

const BASE_URL = 'https://automationexercise.com';
const SCREENSHOT_DIR = 'screenshots/topic-06';

test.beforeAll(() => {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }
});

// -------------------------------------------------------------------
// Screenshots
// -------------------------------------------------------------------

test.describe('page.screenshot()', () => {
  test('Viewport screenshot — only what is visible in the browser window', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.screenshot({ path: `${SCREENSHOT_DIR}/01-viewport.png` });

    console.log('Viewport screenshot saved to screenshots/topic-06/01-viewport.png');
  });

  test('Full page screenshot — scrolls and stitches the entire page', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/02-full-page.png`,
      fullPage: true,
    });

    console.log('Full page screenshot saved');
  });

  test('Element screenshot — capture a single component', async ({ page }) => {
    await page.goto(BASE_URL);

    const navbar = page.locator('#header');

    await navbar.screenshot({ path: `${SCREENSHOT_DIR}/03-navbar-only.png` });

    console.log('Navbar element screenshot saved');
  });

  test('Clipped screenshot — capture a custom rectangular region', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/04-clipped.png`,
      clip: { x: 0, y: 0, width: 800, height: 300 },
    });

    console.log('Clipped screenshot (top 800x300 region) saved');
  });

  test('Screenshot scale — device vs css pixels', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/05-device-scale.png`,
      scale: 'device',    // 'device' uses devicePixelRatio, 'css' is 1:1
    });

    console.log('Device-scaled screenshot saved');
  });
});

// -------------------------------------------------------------------
// Visual regression with toHaveScreenshot()
// -------------------------------------------------------------------

test.describe('Visual regression — toHaveScreenshot()', () => {
  test('Compare the homepage against a stored baseline', async ({ page }) => {
    await page.goto(BASE_URL);

    // First run: creates the baseline image in __screenshots__/
    // Subsequent runs: pixel-diffs against the baseline and fails if beyond threshold
    await expect(page).toHaveScreenshot('homepage-baseline.png', {
      fullPage: true,
      maxDiffPixels: 200,     // allow up to 200 pixels of difference
    });

    console.log('Visual regression check complete');
  });

  test('Compare a single element against its baseline', async ({ page }) => {
    await page.goto(BASE_URL);

    const logo = page.locator('#header .logo');

    await expect(logo).toHaveScreenshot('logo-baseline.png');

    console.log('Logo visual regression check complete');
  });
});

// -------------------------------------------------------------------
// Video recording
// -------------------------------------------------------------------

test.describe('Video recording', () => {
  test('Video is captured when use.video is set in playwright.config.js', async ({ page }) => {
    // playwright.config.js controls video globally:
    //   use: { video: 'on' }              — always record
    //   use: { video: 'retain-on-failure' } — only keep on failure
    //   use: { video: 'off' }             — never record

    await page.goto(BASE_URL);
    await page.getByRole('link', { name: 'Products' }).click();
    await page.waitForLoadState('domcontentloaded');
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await page.waitForLoadState('domcontentloaded');

    // Retrieve the path of the recorded video (available after test ends)
    const videoPath = await page.video()?.path();
    console.log('Video will be saved to:', videoPath ?? 'see test-results/');
  });
});

// -------------------------------------------------------------------
// Traces
// -------------------------------------------------------------------

test.describe('Traces', () => {
  test('Trace captures screenshots, network, console and DOM snapshots', async ({ page }) => {
    // playwright.config.js controls tracing:
    //   use: { trace: 'on' }                — always trace
    //   use: { trace: 'retain-on-failure' }  — only keep on failure
    //   use: { trace: 'on-first-retry' }     — record on first retry

    // View a trace with:  npx playwright show-trace trace.zip

    await page.goto(BASE_URL);
    await page.getByRole('link', { name: 'Products' }).click();
    await page.waitForLoadState('domcontentloaded');

    console.log('Trace is recording — check test-results/ after the run');
    console.log('Open with: npx playwright show-trace <path-to-trace.zip>');
  });
});
