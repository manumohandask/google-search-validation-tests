import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { GoogleSearchPage } from '../page-objects/GoogleSearchPage.js';

// Read settings
const configPath = path.resolve('Config/settings.json');
const settings = JSON.parse(fs.readFileSync(configPath, 'utf8'));

test.describe('Google Search Validations', () => {
  for (const phrase of settings.searchPhrases) {
    test(`Validate search results for "${phrase}"`, async ({ page }) => {
      const google = new GoogleSearchPage(page);

      try {
        console.log(`\nStarting test for: "${phrase}"`);
        
        // Navigate to Google
        console.log('Navigating to Google...');
        await google.navigate(settings.baseUrl);
        
        // Take screenshot after navigation
        await page.screenshot({ 
          path: `screenshots/01_navigation_${phrase.replace(/\s+/g, '_')}.png`,
          fullPage: true
        });
        console.log('Navigation screenshot captured');

        // Perform search
        console.log('Performing search...');
        await google.searchFor(phrase);
        
        // Take screenshot after search
        await page.screenshot({ 
          path: `screenshots/02_search_results_${phrase.replace(/\s+/g, '_')}.png`,
          fullPage: true
        });
        console.log('Search results screenshot captured');

        // Simple validation
        console.log('Running validations...');
        await google.validateSearchResults(phrase);
        
        // Take final success screenshot
        await page.screenshot({ 
          path: `screenshots/03_validation_success_${phrase.replace(/\s+/g, '_')}.png`,
          fullPage: true
        });
        console.log('Validation success screenshot captured');
        
        console.log(`Test completed successfully for "${phrase}"`);
        
      } catch (error) {
        console.error(`Test failed for "${phrase}": ${error.message}`);
        
        // Take error screenshot
        try {
          if (!page.isClosed()) {
            await page.screenshot({ 
              path: `screenshots/99_error_${phrase.replace(/\s+/g, '_')}.png`,
              fullPage: true
            });
            console.log('Error screenshot captured');
          }
        } catch (screenshotError) {
          console.log('Could not take error screenshot - page closed');
        }
        
        throw error;
      }
    });
  }
});
