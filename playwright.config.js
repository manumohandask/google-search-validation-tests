import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 1,
  use: {
    headless: false, 
    viewport: { width: 1280, height: 800 },
    launchOptions: {
      args: ['--disable-blink-features=AutomationControlled', '--start-maximized'],
      channel: 'chrome'
    },
    screenshot: 'on', // Take screenshots for all tests
    video: 'on',      // Record videos for all tests
    trace: 'on'       // Enable tracing for all tests
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]]
});
