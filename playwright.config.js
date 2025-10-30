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
    screenshot: 'on', 
    video: 'on',      
    trace: 'on'       
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]]
});
