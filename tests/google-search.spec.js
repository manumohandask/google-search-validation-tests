import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { GoogleSearchPage } from '../page-objects/GoogleSearchPage.js';

// Read settings
const configPath = path.resolve('Config/settings.json');
const settings = JSON.parse(fs.readFileSync(configPath, 'utf8'));

test.describe('Google Search Validations', () => {
  for (const searchConfig of settings.searchPhrases) {
    test(`Validate search results for "${searchConfig.term}"`, async ({ page }) => {
      const google = new GoogleSearchPage(page);

      try {
        console.log(`\nStarting test for: "${searchConfig.term}"`);
        console.log(`Description: ${searchConfig.description}`);
        
        // Navigate to Google
        console.log('Navigating to Google...');
        await google.navigate(settings.baseUrl);
        
        // Take screenshot after navigation
        if (settings.captureScreenshots) {
          await page.screenshot({ 
            path: `screenshots/01_navigation_${searchConfig.term.replace(/\s+/g, '_')}.png`,
            fullPage: true
          });
          console.log('Navigation screenshot captured');
        }

        // Perform search
        console.log('Performing search...');
        await google.searchFor(searchConfig.term);
        
        // Take screenshot after search
        if (settings.captureScreenshots) {
          await page.screenshot({ 
            path: `screenshots/02_search_results_${searchConfig.term.replace(/\s+/g, '_')}.png`,
            fullPage: true
          });
          console.log('Search results screenshot captured');
        }

        // Generic validation with expected keywords
        console.log('Running validations...');
        await google.validateSearchResults(searchConfig.term, searchConfig.expectedKeywords);
        
        // Take final success screenshot
        if (settings.captureScreenshots) {
          await page.screenshot({ 
            path: `screenshots/03_validation_success_${searchConfig.term.replace(/\s+/g, '_')}.png`,
            fullPage: true
          });
          console.log('Validation success screenshot captured');
        }
        
        console.log(`Test completed successfully for "${searchConfig.term}"`);
        
      } catch (error) {
        console.error(`Test failed for "${searchConfig.term}": ${error.message}`);
        
        // Take error screenshot
        if (settings.captureScreenshots) {
          try {
            if (!page.isClosed()) {
              await page.screenshot({ 
                path: `screenshots/99_error_${searchConfig.term.replace(/\s+/g, '_')}.png`,
                fullPage: true
              });
              console.log('Error screenshot captured');
            }
          } catch (screenshotError) {
            console.log('Could not take error screenshot - page closed');
          }
        }
        
        throw error;
      }
    });
  }
});
