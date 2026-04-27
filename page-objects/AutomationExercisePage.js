import { expect } from '@playwright/test';

/**
 * Page Object Model for Automation Exercise website
 * This class demonstrates how to organize locators and actions for maintainable tests
 */
export class AutomationExercisePage {
  /**
   * Initialize the Page Object with Playwright page instance
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;

    // Navigation locators
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.productsLink = page.getByRole('link', { name: 'Products' });

    // Form locators
    this.emailInput = page.getByLabel('Email Address');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });

    // Search locators
    this.searchField = page.getByPlaceholder('Search Product');
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Content locators
    this.loginToAccountText = page.getByText('Login to your account');
    this.newUserSignupText = page.getByText('New User Signup!');
    this.searchedProductsText = page.getByText(/Searched Products/i);
    this.allProductsText = page.getByText('All Products');
    this.brandsText = page.locator('text=Brands');
    this.logoImage = page.getByAltText(/automation practice/i);

    // XPath locator example
    this.allProductsHeading = page.locator('xpath=//h2[contains(text(), "All Products")]');

    // Chained locator example
    this.productSection = page.locator('section').filter({ hasText: 'Popular Categories' });
  }

  /**
   * Navigate to the Automation Exercise homepage
   */
  async navigateToHome() {
    await this.page.goto('https://automationexercise.com/');
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
  }

  /**
   * Click the Signup/Login link
   */
  async clickSignupLogin() {
    await this.signupLoginLink.click();
  }

  /**
   * Verify login page elements are visible
   */
  async verifyLoginPage() {
    await expect(this.loginToAccountText).toBeVisible();
    await expect(this.newUserSignupText).toBeVisible();
  }

  /**
   * Fill login form with test data
   * @param {string} email - Email address
   * @param {string} password - Password
   */
  async fillLoginForm(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  /**
   * Perform product search
   * @param {string} productName - Product to search for
   */
  async searchForProduct(productName) {
    await this.searchField.fill(productName);
    await this.searchButton.click();
  }

  /**
   * Verify search results page
   */
  async verifySearchResults() {
    await expect(this.searchedProductsText).toBeVisible();
  }

  /**
   * Verify logo is visible
   */
  async verifyLogo() {
    await expect(this.logoImage).toBeVisible();
  }

  /**
   * Navigate to Products page
   */
  async navigateToProducts() {
    await this.productsLink.click();
  }

  /**
   * Verify Products page elements
   */
  async verifyProductsPage() {
    await expect(this.allProductsText).toBeVisible();
    await expect(this.brandsText).toBeVisible();
    await expect(this.allProductsHeading).toBeVisible();
    await expect(this.productSection).toHaveCount(1);
  }
}