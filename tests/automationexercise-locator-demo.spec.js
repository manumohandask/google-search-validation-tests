import { test, expect } from '@playwright/test';
import { AutomationExercisePage } from '../page-objects/AutomationExercisePage.js';

test.describe('Automation Exercise locator demo - Page Object Model', () => {
  test('uses Playwright locator APIs with POM design pattern', async ({ page }) => {
    // Create Page Object instance
    const aePage = new AutomationExercisePage(page);

    // Navigate to homepage
    await aePage.navigateToHome();

    // Verify home link is visible
    await expect(aePage.homeLink).toBeVisible();

    // Click Signup/Login and verify login page
    await aePage.clickSignupLogin();
    await aePage.verifyLoginPage();

    // Fill login form
    await aePage.fillLoginForm('testuser@example.com', 'password123');
    await expect(aePage.loginButton).toBeVisible();

    // Go back to home and perform search
    await aePage.homeLink.click();
    await expect(page).toHaveURL(/automationexercise\.com\/?$/i);

    await aePage.searchForProduct('T-Shirt');
    await aePage.verifySearchResults();

    // Verify logo
    await aePage.verifyLogo();

    // Navigate to Products page
    await aePage.navigateToProducts();
    await aePage.verifyProductsPage();
  });
});
