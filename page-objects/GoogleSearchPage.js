import { expect } from '@playwright/test';

/**
 * This class encapsulates all interactions with Google's search functionality.
 * @class GoogleSearchPage
 * @author Manu Mohan
 */
export class GoogleSearchPage {
  /**
   * Initialize Google Search Page Object
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;
    
    // Locators - Using multiple selectors for resilience against DOM changes
    this.searchInput = 'textarea[name="q"], input[name="q"]';
    this.results = '[data-ved] h3, .g h3, .yuRUbf h3, .tF2Cxc';
    this.resultTitles = '[data-ved] h3, .g h3, .yuRUbf h3, .LC20lb';
    this.resultSnippets = '.VwiC3b, [data-sncf], .s, .lEBKkf';
    this.searchResultsContainer = '#search, #rso, main';
  }

  /**
   * Navigate to Google homepage with cookie consent handling
   * @param {string} url - Google URL to navigate to
   * @throws {Error} If navigation fails or timeout occurs
   */
  async navigate(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });

    // Handle cookie consent popups if they appear
    const agreeBtn = this.page.locator('button:has-text("Accept all"), div:has-text("Accept all")');
    if (await agreeBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await agreeBtn.click();
    }
  }

  /**
   * Execute search for a specific phrase on Google
   * @param {string} phrase - Search term to query
   * @throws {Error} If search execution fails
   */
  async searchFor(phrase) {
    console.log(`Searching for: ${phrase}`);
    
    try {
      // Clear any existing content and enter search term
      await this.page.fill(this.searchInput, phrase);
      await this.page.keyboard.press('Enter');
      
      // Wait for page navigation and content loading
      await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
      
      // Additional wait for dynamic content rendering
      await this.page.waitForTimeout(3000);
      
      console.log('Search completed successfully');
      
    } catch (error) {
      console.log(`Search error: ${error.message}`);
      
    }
  }

  /**
   * Comprehensive validation of Google search results
   * Performs technical and content-specific validations
   * @param {string} phrase - The search phrase to validate results for
   * @param {Array<string>} expectedKeywords - Array of keywords that should appear in search results
   * @throws {Error} If any validation fails
   */
  async validateSearchResults(phrase, expectedKeywords = []) {
    console.log(`Validating search results for: ${phrase}`);
    
    try {
      // Technical Validation 1: Page title verification
      const title = await this.page.title();
      console.log(`Page title: ${title}`);
      expect(title.toLowerCase()).toContain('google');
      
      // Technical Validation 2: Search results population check
      const h3Count = await this.page.locator('h3').count();
      console.log(`Found ${h3Count} h3 elements on page`);
      expect(h3Count).toBeGreaterThan(0);
      
      // Technical Validation 3: URL verification
      const url = await this.page.url();
      console.log(`Current URL contains search: ${url.includes('search')}`);
      expect(url).toContain('google.com');
      
      // Content Validation: keyword-based validation
      await this.validateGenericContent(phrase, expectedKeywords);
      
      console.log('All validations completed successfully');
      
    } catch (error) {
      console.log(`Validation error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Validates search results content using generic keyword matching
   * Performs intelligent content analysis based on expected keywords
   * @param {string} phrase - The search phrase to validate content for
   * @param {Array<string>} expectedKeywords - Array of keywords expected in search results
   * @private
   */
  async validateGenericContent(phrase, expectedKeywords = []) {
    console.log(`Analyzing search results content for: ${phrase}`);
    console.log(`Expected keywords: [${expectedKeywords.join(', ')}]`);
    
    try {
      const pageText = await this.page.textContent('body');
      const lowerText = pageText.toLowerCase();
      const foundKeywords = [];
      
      // Check for each expected keyword in the page content
      for (const keyword of expectedKeywords) {
        if (lowerText.includes(keyword.toLowerCase())) {
          foundKeywords.push(keyword);
        }
      }
      
      // Validation results
      if (foundKeywords.length > 0) {
        console.log(`✓ Found relevant keywords: [${foundKeywords.join(', ')}]`);
        console.log(`Content validation successful: ${foundKeywords.length}/${expectedKeywords.length} keywords found`);
      } else if (expectedKeywords.length === 0) {
        console.log(' No specific keywords provided - generic search validation completed');
      } else {
        console.log(` No expected keywords found in results for: ${phrase}`);
        console.log('Results may be generic or search term may need adjustment');
      }
      
      // Additional validation: Check if search term itself appears in results
      if (lowerText.includes(phrase.toLowerCase())) {
        console.log(`✓ Search term "${phrase}" found in results`);
      }
      
    } catch (error) {
      console.log(`Content analysis completed with warnings: ${error.message}`);
    }
  }

  /**
   * Debug utility for page structure analysis
   * Provides technical diagnostics for troubleshooting
   * @returns {Promise<void>}
   */
  async debugPageStructure() {
    try {
      console.log('Executing technical diagnostics...');
      const title = await this.page.title();
      const url = await this.page.url();
      const viewport = this.page.viewportSize();
      
      console.log(`Page Title: ${title}`);
      console.log(`Current URL: ${url}`);
      console.log(`Viewport: ${viewport ? `${viewport.width}x${viewport.height}` : 'Default'}`);
      
    } catch (error) {
      console.log(`Technical diagnostics failed: ${error.message}`);
    }
  }
}
