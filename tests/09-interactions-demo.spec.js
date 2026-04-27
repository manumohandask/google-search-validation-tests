import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://automationexercise.com';

// -------------------------------------------------------------------
// Clicking
// -------------------------------------------------------------------

test.describe('Clicking elements', () => {
  test('locator.click() — standard left click', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByRole('link', { name: 'Products' }).click();
    await page.waitForLoadState('domcontentloaded');

    await expect(page).toHaveURL(`${BASE_URL}/products`);
    console.log('Clicked Products link, now on:', page.url());
  });

  test('click() with a delay — useful to slow down rapid clicks', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByRole('link', { name: 'Signup / Login' }).click({ delay: 100 });
    await page.waitForLoadState('domcontentloaded');

    console.log('Clicked with 100ms delay');
  });

  test('force click — bypasses actionability checks (use sparingly)', async ({ page }) => {
    await page.goto(BASE_URL);

    // force: true skips is-visible, is-enabled, is-stable checks
    await page.locator('#header .logo').click({ force: true });

    console.log('Force click executed on logo');
  });

  test('dblclick() — double click an element', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    const firstProductName = page.locator('.productinfo p').first();
    await firstProductName.dblclick();

    console.log('Double clicked on first product name');
  });

  test('right click — opens context menu', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.locator('#header .logo').click({ button: 'right' });

    console.log('Right click (context menu) triggered on logo');
  });
});

// -------------------------------------------------------------------
// Fill and type
// -------------------------------------------------------------------

test.describe('Filling input fields', () => {
  test('fill() — clears the field and sets the value instantly', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    await page.locator('[data-qa="login-email"]').fill('trainer@example.com');
    await page.locator('[data-qa="login-password"]').fill('SecurePass@1');

    console.log('Login form filled with fill()');
  });

  test('pressSequentially() — types one character at a time (simulates real keyboard)', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    const emailInput = page.locator('[data-qa="login-email"]');
    await emailInput.click();
    await emailInput.pressSequentially('trainer@example.com', { delay: 50 });

    console.log('Email typed with pressSequentially() at 50ms per character');
  });

  test('clear() — empties a field before refilling it', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    const emailInput = page.locator('[data-qa="login-email"]');

    await emailInput.fill('old@example.com');
    await emailInput.clear();
    await emailInput.fill('new@example.com');

    const value = await emailInput.inputValue();
    expect(value).toBe('new@example.com');
    console.log('Field cleared and refilled — final value:', value);
  });

  test('inputValue() — read back what is currently in a field', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    await page.locator('[data-qa="login-email"]').fill('read-test@example.com');

    const value = await page.locator('[data-qa="login-email"]').inputValue();
    console.log('Current field value:', value);
    expect(value).toBe('read-test@example.com');
  });
});

// -------------------------------------------------------------------
// Dropdowns — selectOption()
// -------------------------------------------------------------------

// Navigate to the full registration form before each test in this group
async function goToRegistrationForm(page) {
  await page.goto(`${BASE_URL}/login`);
  await page.locator('[data-qa="signup-name"]').fill('Demo Trainer');
  await page.locator('[data-qa="signup-email"]').fill(`trainer${Date.now()}@playwright.test`);
  await page.locator('[data-qa="signup-button"]').click();
  await page.waitForLoadState('domcontentloaded');
}

test.describe('Dropdowns — selectOption()', () => {
  test('Select a day by value attribute', async ({ page }) => {
    await goToRegistrationForm(page);

    await page.locator('[data-qa="days"]').selectOption('15');

    const selected = await page.locator('[data-qa="days"]').inputValue();
    console.log('Selected day (by value):', selected);
    expect(selected).toBe('15');
  });

  test('Select a month by visible label text', async ({ page }) => {
    await goToRegistrationForm(page);

    await page.locator('[data-qa="months"]').selectOption({ label: 'May' });

    const selected = await page.locator('[data-qa="months"]').inputValue();
    console.log('Selected month (by label):', selected);
  });

  test('Select a year by index (0-based)', async ({ page }) => {
    await goToRegistrationForm(page);

    await page.locator('[data-qa="years"]').selectOption({ index: 5 });

    const selected = await page.locator('[data-qa="years"]').inputValue();
    console.log('Selected year at index 5:', selected);
  });
});

// -------------------------------------------------------------------
// Checkboxes and radio buttons
// -------------------------------------------------------------------

test.describe('Checkboxes and radio buttons', () => {
  test('check() and uncheck() a checkbox', async ({ page }) => {
    await goToRegistrationForm(page);

    const newsletter = page.locator('input#newsletter');

    await newsletter.check();
    await expect(newsletter).toBeChecked();
    console.log('Newsletter checkbox: checked');

    await newsletter.uncheck();
    await expect(newsletter).not.toBeChecked();
    console.log('Newsletter checkbox: unchecked');
  });

  test('Check the special offers checkbox', async ({ page }) => {
    await goToRegistrationForm(page);

    const specialOffers = page.locator('input#optin');
    await specialOffers.check();

    await expect(specialOffers).toBeChecked();
    console.log('Special offers checkbox: checked');
  });

  test('Select a radio button with check()', async ({ page }) => {
    await goToRegistrationForm(page);

    const mrRadio = page.locator('input#id_gender1');
    await mrRadio.check();

    await expect(mrRadio).toBeChecked();
    console.log('Mr radio button selected');
  });

  test('isChecked() — read the current state of a checkbox', async ({ page }) => {
    await goToRegistrationForm(page);

    const newsletter = page.locator('input#newsletter');
    const isChecked = await newsletter.isChecked();

    console.log('Newsletter initially checked:', isChecked);
  });
});

// -------------------------------------------------------------------
// File upload
// -------------------------------------------------------------------

test.describe('File upload — setInputFiles()', () => {
  test('Upload a single file via input[type=file]', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact_us`);

    const tempFile = path.resolve('temp-upload-demo.txt');
    fs.writeFileSync(tempFile, 'Playwright file upload demo content');

    const fileInput = page.locator('input[name="upload_file"]');
    await fileInput.setInputFiles(tempFile);

    console.log('Single file uploaded:', tempFile);

    fs.unlinkSync(tempFile);
  });

  test('Upload multiple files at once', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact_us`);

    const file1 = path.resolve('upload-demo-1.txt');
    const file2 = path.resolve('upload-demo-2.txt');
    fs.writeFileSync(file1, 'File one');
    fs.writeFileSync(file2, 'File two');

    const fileInput = page.locator('input[name="upload_file"]');
    await fileInput.setInputFiles([file1, file2]);

    console.log('Two files uploaded');

    fs.unlinkSync(file1);
    fs.unlinkSync(file2);
  });

  test('Clear a file input by passing an empty array', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact_us`);

    const fileInput = page.locator('input[name="upload_file"]');

    // First attach a file, then clear it
    const tempFile = path.resolve('temp-to-clear.txt');
    fs.writeFileSync(tempFile, 'will be cleared');
    await fileInput.setInputFiles(tempFile);

    await fileInput.setInputFiles([]);
    console.log('File input cleared');

    fs.unlinkSync(tempFile);
  });
});
