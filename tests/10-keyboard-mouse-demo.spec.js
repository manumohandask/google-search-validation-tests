import { test, expect } from '@playwright/test';

const BASE_URL = 'https://automationexercise.com';

// -------------------------------------------------------------------
// Keyboard actions
// -------------------------------------------------------------------

test.describe('locator.press() — key on a specific element', () => {
  test('Press Enter to submit a search', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    const searchInput = page.getByPlaceholder('Search Product');
    await searchInput.fill('shirt');
    await searchInput.press('Enter');

    await page.waitForLoadState('domcontentloaded');
    console.log('Enter key pressed on search input, URL:', page.url());
  });

  test('Press Tab to move focus to the next field', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    const emailInput = page.locator('[data-qa="login-email"]');
    await emailInput.click();
    await emailInput.press('Tab');

    // Focus moves to the password field
    const focused = await page.evaluate(() => document.activeElement?.getAttribute('data-qa'));
    console.log('Element in focus after Tab:', focused);
  });
});

test.describe('page.keyboard.press() — global key press', () => {
  test('Tab through the page focus order', async ({ page }) => {
    await page.goto(BASE_URL);

    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
    }

    const focused = await page.evaluate(() => document.activeElement?.tagName);
    console.log('Focused element after 5 Tabs:', focused);
  });

  test('Escape key — dismiss overlays or cancel actions', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.keyboard.press('Escape');
    console.log('Escape key pressed globally');
  });

  test('ArrowDown and ArrowUp — navigate dropdown options', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    const emailInput = page.locator('[data-qa="login-email"]');
    await emailInput.click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');

    console.log('Arrow keys pressed inside input');
  });
});

test.describe('page.keyboard.type() — fire events for each character', () => {
  test('Type into the search box character by character', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    await page.getByPlaceholder('Search Product').click();
    await page.keyboard.type('blue top', { delay: 80 });

    const value = await page.getByPlaceholder('Search Product').inputValue();
    console.log('Typed value:', value);
    expect(value).toBe('blue top');
  });
});

test.describe('Modifier key combinations', () => {
  test('Ctrl+A then Backspace — select all and delete', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    const emailInput = page.locator('[data-qa="login-email"]');
    await emailInput.fill('some existing text');

    await emailInput.press('Control+A');
    await emailInput.press('Backspace');

    const value = await emailInput.inputValue();
    expect(value).toBe('');
    console.log('Field cleared using Ctrl+A + Backspace');
  });

  test('Shift+End — select from cursor to end of line', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    const emailInput = page.locator('[data-qa="login-email"]');
    await emailInput.fill('hello world');

    // Move cursor to start, then select to end
    await emailInput.press('Home');
    await emailInput.press('Shift+End');
    await emailInput.press('Delete');

    const value = await emailInput.inputValue();
    expect(value).toBe('');
    console.log('Text selected with Shift+End and deleted');
  });

  test('Ctrl+Z — undo the last input action', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    const emailInput = page.locator('[data-qa="login-email"]');
    await emailInput.fill('undo-this@example.com');
    await emailInput.press('Control+A');
    await emailInput.press('Control+Z');

    console.log('Ctrl+Z undo triggered on input field');
  });
});

// -------------------------------------------------------------------
// Mouse actions
// -------------------------------------------------------------------

test.describe('locator.hover()', () => {
  test('Hover over a product card to reveal the overlay buttons', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    const firstProduct = page.locator('.single-products').first();
    await firstProduct.hover();

    // Hovering reveals the .choose overlay with View Product / Add to Cart links
    const overlay = firstProduct.locator('.choose');
    await expect(overlay).toBeVisible();
    console.log('Hover triggered — product overlay is now visible');
  });

  test('hover() with a custom position offset', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    const firstProduct = page.locator('.single-products').first();

    // position is relative to the element's top-left corner
    await firstProduct.hover({ position: { x: 10, y: 10 } });

    console.log('Hovered at position (10, 10) within the element');
  });
});

test.describe('page.mouse — low-level mouse API', () => {
  test('page.mouse.move() — move to absolute page coordinates', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.mouse.move(640, 300);
    console.log('Mouse moved to (640, 300)');
  });

  test('page.mouse.click() — click at absolute coordinates', async ({ page }) => {
    await page.goto(BASE_URL);

    // Get the bounding box of an element to calculate its centre
    const logo = page.locator('#header .logo');
    const box = await logo.boundingBox();

    if (box) {
      const centerX = box.x + box.width / 2;
      const centerY = box.y + box.height / 2;
      await page.mouse.click(centerX, centerY);
      console.log(`Mouse clicked at centre of logo: (${centerX}, ${centerY})`);
    }
  });

  test('page.mouse.wheel() — programmatic scroll', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    // Scroll down 600px
    await page.mouse.wheel(0, 600);
    console.log('Scrolled down 600px');

    // Scroll back up
    await page.mouse.wheel(0, -600);
    console.log('Scrolled back up 600px');
  });
});

test.describe('Drag and drop', () => {
  test('locator.dragTo() — high-level drag from source to target', async ({ page }) => {
    await page.goto(BASE_URL);

    // automationexercise.com does not have a dedicated drag-and-drop widget.
    // This shows the dragTo() API — wire it up to your own drag-and-drop pages.
    const source = page.locator('#header .logo');
    const target = page.locator('#header');

    await source.dragTo(target);

    console.log('dragTo() executed — API demonstrated');
  });

  test('Low-level drag using mousedown → move → mouseup', async ({ page }) => {
    await page.goto(BASE_URL);

    const source = page.locator('#header .logo');
    const box = await source.boundingBox();

    if (box) {
      const startX = box.x + box.width / 2;
      const startY = box.y + box.height / 2;

      await page.mouse.move(startX, startY);
      await page.mouse.down();
      // steps: 10 makes the movement smooth (10 intermediate positions)
      await page.mouse.move(startX + 120, startY + 60, { steps: 10 });
      await page.mouse.up();

      console.log('Low-level drag: mousedown → move (10 steps) → mouseup');
    }
  });
});
