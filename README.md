# Google Search Test Automation Suite

[![Playwright Tests](https://img.shields.io/badge/tests-Playwright-45ba4b.svg)](https://playwright.dev/)
[![JavaScript](https://img.shields.io/badge/language-JavaScript-yellow.svg)](https://javascript.info/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com)

## 🎯 Executive Summary

This is a **professional-grade test automation framework** built with Playwright for validating Google search functionality across multiple search terms. The project demonstrates **industry-standard test automation practices**, clean code architecture, and comprehensive reporting capabilities suitable for enterprise environments.

### Key Differentiators
- ✅ **Enterprise-Ready Architecture** - Page Object Model with separation of concerns
- ✅ **Comprehensive Test Coverage** - Functional, visual, and content validation
- ✅ **Professional Reporting** - HTML reports with screenshots, videos, and traces  
- ✅ **CI/CD Integration Ready** - GitHub Actions compatible with artifact collection
- ✅ **Quality Assurance Standards** - ESLint, error handling, and retry mechanisms
- ✅ **Production-Grade Configuration** - Environment-based settings and browser optimization

## 🧪 Test Scenarios

### Primary Test Cases
1. **Valletta Search Test**
   - Validates search results for Malta's capital city
   - Checks for keywords: malta, capital, city, unesco
   - Verifies geographical and historical context

2. **The Multiple Search Test**
   - Tests search for The Multiple digital agency
   - Validates agency-related keywords: digital, marketing, creative
   - Ensures business context relevance

3. **Ftira Search Test**
   - Searches for traditional Maltese bread
   - Validates cultural keywords: malta, bread, traditional, food
   - Checks culinary context accuracy

### Advanced Test Suites
- **Comprehensive Multi-Search Test** - Runs all searches sequentially with detailed reporting
- **Performance & Reliability Test** - Measures response times and consistency
- **Cross-Browser Compatibility** - Tests across multiple browsers and devices

## 🏗️ Project Structure

```
google-search-automation/
├── 📁 page-objects/           # Page Object Model classes
│   └── GoogleSearchPage.js    # Google search page interactions
├── 📁 tests/                  # Test specifications
│   └── google-search.spec.js  # Main test suite
├── 📄 playwright.config.js    # Playwright configuration
├── 📄 package.json            # Project dependencies
└── 📄 README.md               # This documentation
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd google-search-automation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

4. **Setup test directories:**
   ```bash
   node setup.js
   ```

## 🎮 Running Tests

### Basic Test Execution

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with UI mode for debugging
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

### Advanced Test Execution

```bash
# Run specific test file
npx playwright test tests/google-search.spec.js

# Run tests on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run tests on mobile devices
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"

# Run with specific grep pattern
npx playwright test --grep "Valletta"
npx playwright test --grep "Comprehensive"
```

### Generating Reports

```bash
# View HTML test report
npm run test:report

# Generate and open HTML report after test run
npx playwright test && npx playwright show-report
```

## 📊 Test Reports & Artifacts

### Report Types Generated:
1. **HTML Report** - Interactive test results viewer
2. **JSON Report** - Machine-readable test data
3. **JUnit XML** - CI/CD integration format
4. **Extent Report** - Professional test reporting
5. **Screenshots** - Visual evidence of test execution
6. **Videos** - Test execution recordings (on failure)
7. **Traces** - Detailed debugging information

### Accessing Reports:
- HTML reports: `test-results/html-report/index.html`
- Extent reports: `test-results/extent-report.html`
- Screenshots: `test-results/screenshots/`
- JSON data: `test-results/results.json`

## 🔍 Test Features & Validations

### Search Functionality Tests:
- ✅ **Search Input Interaction** - Verify search field accepts input
- ✅ **Search Execution** - Confirm search submits and loads results
- ✅ **Results Display** - Validate search results are visible
- ✅ **URL Verification** - Check search terms appear in URL
- ✅ **Cookie Handling** - Automatic cookie acceptance

### Content Validation:
- ✅ **Relevancy Scoring** - Calculate result relevance percentage
- ✅ **Keyword Validation** - Check for expected terms in results
- ✅ **Title Analysis** - Validate search terms in result titles
- ✅ **Description Analysis** - Check content descriptions
- ✅ **Result Count** - Ensure minimum number of results

### Performance Metrics:
- ✅ **Search Response Time** - Measure search execution speed
- ✅ **Page Load Performance** - Track page loading times
- ✅ **Element Visibility** - Verify UI element response times
- ✅ **Cross-Browser Performance** - Compare speeds across browsers

## 🛠️ Configuration

### Playwright Configuration (`playwright.config.js`):
- **Multi-browser support** (Chrome, Firefox, Safari, Edge)
- **Mobile device testing** (iOS, Android)
- **Retry logic** for flaky tests
- **Parallel execution** for faster test runs
- **Screenshot on failure**
- **Video recording** for failed tests
- **Trace collection** for debugging

### Environment Variables:
Create `.env` file for custom configuration:
```env
BASE_URL=https://www.google.com
TIMEOUT=30000
RETRIES=2
HEADLESS=true
```
