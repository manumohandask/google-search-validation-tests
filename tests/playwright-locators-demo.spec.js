import { test, expect } from '@playwright/test';

const BASE_URL = 'https://automationexercise.com';

test.describe('1 - CSS Selector', () => {
  test('Locate the navbar logo using a CSS selector', async ({ page }) => {
    await page.goto(BASE_URL);

    const logo = page.locator('#header .logo');

    await expect(logo).toBeVisible();
    console.log('CSS selector: logo found');
  });

  test('Locate multiple product cards with a CSS selector', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    const productCards = page.locator('.product-image-wrapper');

    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);
    console.log(`CSS selector: found ${count} product cards`);
  });
});

test.describe('2 - XPath Selector', () => {
  test('Locate the Home nav link using XPath', async ({ page }) => {
    await page.goto(BASE_URL);

    const homeLink = page.locator("xpath=//a[normalize-space()='Home']");

    await expect(homeLink).toBeVisible();
    console.log('XPath: Home link found');
  });

  test('Locate the 2nd nav item by position using XPath', async ({ page }) => {
    await page.goto(BASE_URL);

    const secondNavItem = page.locator('xpath=//div[@id="navbar"]//li[2]');

    await expect(secondNavItem).toBeVisible();
    console.log('XPath: 2nd nav item found');
  });
});

test.describe('3 - getByRole()', () => {
  test('Locate the Signup / Login link by role', async ({ page }) => {
    await page.goto(BASE_URL);

    const loginLink = page.getByRole('link', { name: 'Signup / Login' });

    await expect(loginLink).toBeVisible();
    console.log('getByRole: Signup/Login link found');
  });

  test('Locate the search submit button by role', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    const searchButton = page.getByRole('button', { name: 'Submit' });

    await expect(searchButton).toBeVisible();
    console.log('getByRole: Submit button found');
  });

  test('Locate the All Products heading by role', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    const heading = page.getByRole('heading', { name: 'All Products' });

    await expect(heading).toBeVisible();
    console.log('getByRole: "All Products" heading found');
  });
});

test.describe('4 - getByText()', () => {
  test('Locate a nav link by exact text match', async ({ page }) => {
    await page.goto(BASE_URL);

    const contactLink = page.getByText('Contact us', { exact: true });

    await expect(contactLink).toBeVisible();
    console.log('getByText (exact): "Contact us" found');
  });

  test('Locate an element by partial text', async ({ page }) => {
    await page.goto(BASE_URL);

    const testCasesLink = page.getByText('Test Cases');

    await expect(testCasesLink.first()).toBeVisible();
    console.log('getByText (partial): "Test Cases" found');
  });
});

test.describe('5 - getByLabel()', () => {
  test('Locate the Name input on Contact Us by label', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact_us`);

    const nameInput = page.getByLabel('Name');

    await expect(nameInput).toBeVisible();
    console.log('getByLabel: Name input found');
  });

  test('Locate the Email input on Contact Us by label', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact_us`);

    const emailInput = page.getByLabel('Email');

    await expect(emailInput).toBeVisible();
    console.log('getByLabel: Email input found');
  });
});

test.describe('6 - getByPlaceholder()', () => {
  test('Locate the search box by placeholder text', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    const searchInput = page.getByPlaceholder('Search Product');

    await expect(searchInput).toBeVisible();
    await searchInput.fill('Top');
    console.log('getByPlaceholder: search input found and filled');
  });

  test('Locate the Name field on the signup page by placeholder', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    const nameField = page.getByPlaceholder('Name');

    await expect(nameField).toBeVisible();
    console.log('getByPlaceholder: Name field found');
  });
});

test.describe('7 - getByAltText()', () => {
  test('Locate the logo image by alt text', async ({ page }) => {
    await page.goto(BASE_URL);

    const logoImage = page.getByAltText('Website for automation practice');

    await expect(logoImage).toBeVisible();
    console.log('getByAltText: logo image found');
  });
});

test.describe('8 - getByTitle()', () => {
  test('Locate an element by its title attribute', async ({ page }) => {
    await page.goto(BASE_URL);

    const titleElement = page.getByTitle('Search');

    const count = await titleElement.count();
    console.log(`getByTitle: found ${count} element(s) with title="Search"`);
  });
});

test.describe('9 - getByTestId()', () => {
  test('Locate an element by data-testid', async ({ page }) => {
    await page.goto(BASE_URL);

    // automationexercise.com has no data-testid attributes, so we inject one
    // to demonstrate the API - the same way you would use it in your own app
    await page.evaluate(() => {
      const logo = document.querySelector('#header .logo');
      if (logo) logo.setAttribute('data-testid', 'site-logo');
    });

    const logoByTestId = page.getByTestId('site-logo');

    await expect(logoByTestId).toBeVisible();
    console.log('getByTestId: element found via data-testid');
  });
});

test.describe('10 - locator.filter()', () => {
  test('Filter product cards to find "Blue Top"', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    const blueTop = page.locator('.productinfo').filter({ hasText: 'Blue Top' });

    await expect(blueTop.first()).toBeVisible();
    console.log('filter(hasText): "Blue Top" product card found');
  });

  test('Filter navbar links to isolate the Cart link', async ({ page }) => {
    await page.goto(BASE_URL);

    const cartLink = page.locator('#navbar a').filter({ hasText: 'Cart' });

    await expect(cartLink).toBeVisible();
    console.log('filter(hasText): Cart nav link found');
  });
});

test.describe('11 - locator.nth()', () => {
  test('Select the 3rd product card by index', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    const thirdProduct = page.locator('.productinfo').nth(2);

    await expect(thirdProduct).toBeVisible();
    const name = await thirdProduct.locator('p').textContent();
    console.log(`nth(2): 3rd product is "${name?.trim()}"`);
  });
});

test.describe('12 - locator.first() and locator.last()', () => {
  test('Grab the first product on the listing page', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    const firstProduct = page.locator('.productinfo').first();

    await expect(firstProduct).toBeVisible();
    const name = await firstProduct.locator('p').textContent();
    console.log(`first(): "${name?.trim()}"`);
  });

  test('Grab the last product on the listing page', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    const lastProduct = page.locator('.productinfo').last();

    await expect(lastProduct).toBeVisible();
    const name = await lastProduct.locator('p').textContent();
    console.log(`last(): "${name?.trim()}"`);
  });
});

test.describe('13 - Chained locator', () => {
  test('Find the Add to Cart button scoped inside the first product card', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    const firstCard = page.locator('.single-products').first();
    const addToCartBtn = firstCard.locator('.add-to-cart');

    await expect(addToCartBtn).toBeVisible();
    console.log('Chained locator: "Add to cart" found inside first card');
  });
});

test.describe('14 - locator with has: option', () => {
  test('Find a product card that contains a paragraph with "Blue Top"', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    const blueTopCard = page.locator('.productinfo', {
      has: page.locator('p', { hasText: 'Blue Top' })
    });

    await expect(blueTopCard.first()).toBeVisible();
    console.log('has: option - productinfo containing "Blue Top" found');
  });
});

test.describe('15 - locator with hasText: option', () => {
  test('Find a navbar list item that contains "Products"', async ({ page }) => {
    await page.goto(BASE_URL);

    const productsNavItem = page.locator('#navbar li', { hasText: 'Products' });

    await expect(productsNavItem.first()).toBeVisible();
    console.log('hasText option: nav item with "Products" found');
  });
});

test.describe('16 - locator.and()', () => {
  test('Match the Cart link using both a CSS and a role locator', async ({ page }) => {
    await page.goto(BASE_URL);

    const cartLink = page.locator('#navbar a').and(page.getByRole('link', { name: 'Cart' }));

    await expect(cartLink).toBeVisible();
    console.log('locator.and(): Cart link matched by CSS + role');
  });
});

test.describe('17 - Legacy page.$() and page.$$()', () => {
  test('page.$() returns a single ElementHandle', async ({ page }) => {
    await page.goto(BASE_URL);

    const logoHandle = await page.$('#header .logo');

    expect(logoHandle).not.toBeNull();
    const isVisible = await logoHandle.isVisible();
    expect(isVisible).toBe(true);
    console.log('page.$(): logo ElementHandle retrieved');
  });

  test('page.$$() returns an array of ElementHandles', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    const productHandles = await page.$$('.productinfo');

    expect(productHandles.length).toBeGreaterThan(0);
    console.log(`page.$$(): ${productHandles.length} product handles retrieved`);
  });
});

test.describe('BONUS - locator.or()', () => {
  test('Handle two possible consent buttons using or()', async ({ page }) => {
    await page.goto(BASE_URL);

    const acceptBtn = page.getByRole('button', { name: 'Accept' });
    const dismissBtn = page.getByRole('button', { name: 'Got it' });
    const consentButton = acceptBtn.or(dismissBtn);

    if (await consentButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await consentButton.click();
      console.log('locator.or(): consent button clicked');
    } else {
      console.log('locator.or(): no consent banner shown - skipped');
    }
  });
});
