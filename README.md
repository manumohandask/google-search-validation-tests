# Google Search Validation Tests

A comprehensive automated testing framework for validating Google search results using Playwright and the Page Object Model (POM) design pattern.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Understanding the Tests](#understanding-the-tests)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This project automates Google search validation testing with a focus on:
- Search result accuracy and relevance
- Keyword presence in search results
- Page title validation
- Content validation against expected keywords
- Screenshot and video capture capabilities

## ✨ Features

- **Page Object Model (POM)**: Clean, maintainable test architecture
- **Data-Driven Testing**: Configurable search terms and validation criteria
- **Multiple Search Validations**: Test multiple search queries in a single run
- **Keyword Validation**: Verify expected keywords appear in search results
- **Screenshot Capture**: Optional screenshot capture at key test points
- **Video Recording**: Record test execution for debugging
- **HTML Reports**: Detailed test reports with Playwright's built-in reporter
- **Retry Mechanism**: Automatic retry on test failure
- **Chrome Browser**: Tests run on Chrome for consistent results

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/manumohandask/google-search-validation-tests.git
   cd google-search-automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install chrome
   ```

## 📁 Project Structure

```
google-search-automation/
├── Config/
│   └── settings.json           # Test configuration and search phrases
├── page-objects/
│   └── GoogleSearchPage.js     # Page Object Model for Google Search
├── tests/
│   └── google-search.spec.js   # Test specifications
├── playwright-report/          # Generated HTML reports
├── test-results/               # Test execution results and videos
├── screenshots/                # Captured screenshots (if enabled)
├── playwright.config.js        # Playwright configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```

## ⚙️ Configuration

### Playwright Configuration (`playwright.config.js`)

Key settings you can modify:

```javascript
{
  timeout: 60000,              // Test timeout (60 seconds)
  retries: 1,                  // Number of retries on failure
  headless: false,             // Set to true for headless execution
  screenshot: 'on',            // 'on', 'off', or 'only-on-failure'
  video: 'on',                 // 'on', 'off', 'retain-on-failure', 'on-first-retry'
  trace: 'on'                  // 'on', 'off', 'retain-on-failure', 'on-first-retry'
}
```

### Test Configuration (`Config/settings.json`)

Customize your search tests:

```json
{
  "baseUrl": "https://www.google.com",
  "captureScreenshots": false,
  "searchPhrases": [
    {
      "term": "Your Search Term",
      "expectedKeywords": ["keyword1", "keyword2", "keyword3"],
      "description": "Description of what you're testing"
    }
  ]
}
```

**Parameters:**
- `baseUrl`: The Google URL to test against
- `captureScreenshots`: Enable/disable manual screenshots in test code
- `term`: The search query to test
- `expectedKeywords`: Keywords expected in search results
- `description`: Human-readable description of the test

## 🏃 Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in headless mode
```bash
npx playwright test --headed=false
```

### Run specific test file
```bash
npx playwright test tests/google-search.spec.js
```

### Run tests with specific browser
```bash
npx playwright test --project=chromium
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Run tests with UI mode
```bash
npx playwright test --ui
```

## 📊 Test Reports

### View HTML Report
After test execution, view the detailed HTML report:
```bash
npx playwright show-report
```

### View Trace
To debug a specific test run:
```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

## 🧪 Understanding the Tests

### Test Flow

1. **Navigation**: Navigate to Google homepage
2. **Search**: Enter search term and submit
3. **Validation**: 
   - Verify page title contains search term
   - Check URL contains search parameter
   - Count search result elements (h3 tags)
   - Validate content contains expected keywords
   - Confirm search term appears in results

### Validation Logic

The tests validate search results by:
- **Page Title Check**: Ensures the search term appears in the page title
- **URL Verification**: Confirms the URL contains the search query
- **Result Count**: Verifies search results are present (h3 elements)
- **Keyword Matching**: Checks if expected keywords appear in the page content
- **Content Relevance**: Ensures a minimum threshold of keywords are found

## 🎨 Customization

### Adding New Search Tests

1. Open `Config/settings.json`
2. Add a new search phrase object:
```json
{
  "term": "New Search Term",
  "expectedKeywords": ["relevant", "keywords", "here"],
  "description": "What this test validates"
}
```

### Modifying the Page Object

Edit `page-objects/GoogleSearchPage.js` to:
- Add new locators
- Create additional validation methods
- Extend functionality

### Adjusting Timeouts

Modify `playwright.config.js`:
```javascript
timeout: 90000,  // Increase to 90 seconds
```

## 🐛 Troubleshooting

### Tests are failing

1. **Check browser installation**
   ```bash
   npx playwright install chrome
   ```

2. **Clear test artifacts**
   ```bash
   rm -rf test-results playwright-report screenshots
   ```

3. **Run in debug mode**
   ```bash
   npx playwright test --debug
   ```

### Browser not opening

- Ensure `headless: false` in `playwright.config.js`
- Check if Chrome is installed
- Try running with different browser: `npx playwright test --project=chromium`

### Performance issues

- Disable video recording: Set `video: 'off'` in config
- Disable trace: Set `trace: 'off'` in config
- Run in headless mode: Set `headless: true` in config

## 📝 Best Practices

1. **Keep tests independent**: Each test should run standalone
2. **Use meaningful descriptions**: Help others understand test purpose
3. **Update expected keywords**: Keep them relevant to search terms
4. **Review reports regularly**: Check HTML reports for insights
5. **Version control**: Commit configuration changes with clear messages


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Manu Mohan** - *Initial work* - [manumohandask](https://github.com/manumohandask)

## 🙏 Acknowledgments

- Built with [Playwright](https://playwright.dev/)
- Follows Page Object Model design pattern
- Inspired by modern test automation best practices

---

**Happy Testing! 🚀**
