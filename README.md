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
├── 📁 utils/                  # Utility functions
│   └── TestUtils.js           # Test helpers and validations
├── 📁 test-results/           # Generated test reports and artifacts
│   ├── html-report/           # Playwright HTML reports
│   ├── screenshots/           # Test screenshots
│   ├── videos/                # Test execution videos
│   └── traces/                # Playwright traces for debugging
├── 📄 playwright.config.js    # Playwright configuration
├── 📄 package.json            # Project dependencies
├── 📄 setup.js                # Initial setup script
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

## 🎯 Test Strategy & Approach

### 1. Page Object Model (POM)
- **Maintainable code structure**
- **Reusable page interactions**
- **Centralized element selectors**
- **Method-based operations**

### 2. Data-Driven Testing
- **Parameterized test inputs**
- **Expected result validation**
- **Keyword-based verification**
- **Flexible test scenarios**

### 3. Comprehensive Reporting
- **Multiple report formats**
- **Visual documentation**
- **Performance metrics**
- **Failure analysis**

### 4. Cross-Platform Testing
- **Multi-browser compatibility**
- **Mobile device testing**
- **Responsive design validation**
- **Performance across platforms**

## 🚨 Troubleshooting

### Common Issues:

**Browser Installation Issues:**
```bash
# Reinstall Playwright browsers
npx playwright install --force
```

**Permission Issues:**
```bash
# Run with elevated permissions (Windows)
# Right-click terminal -> Run as Administrator
```

**Test Timeouts:**
- Increase timeout values in `playwright.config.js`
- Check internet connectivity
- Verify Google accessibility

**Element Not Found:**
- Run in headed mode to see browser interactions
- Check if Google has updated their UI
- Update selectors in `GoogleSearchPage.js`

### Debug Mode:
```bash
# Run single test in debug mode
npx playwright test tests/google-search.spec.js --debug --grep "Valletta"

# Run with Playwright Inspector
npx playwright test --ui
```

## 📈 CI/CD Integration

This project is ready for CI/CD pipelines with:
- **GitHub Actions** configuration ready
- **Docker** support available
- **JUnit XML** reports for CI tools
- **JSON** exports for custom processing
- **Exit codes** for build status

### Example GitHub Actions workflow:
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
    - run: npm ci
    - run: npx playwright install
    - run: npm test
```

## 🎓 Learning & Skills Demonstrated

This project showcases:
- **Advanced JavaScript/Node.js** proficiency
- **Playwright framework** expertise
- **Test automation** best practices
- **Page Object Model** implementation
- **Comprehensive validation** strategies
- **Professional reporting** setup
- **Cross-browser testing** knowledge
- **Performance testing** capabilities
- **CI/CD readiness**
- **Documentation** skills

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Resources

- [Playwright Documentation](https://playwright.dev/)
- [JavaScript Testing Guide](https://javascript.info/testing)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Test Automation Best Practices](https://playwright.dev/docs/best-practices)

## 📞 Contact & Support

Created for **The Multiple Group** technical assessment.

**Project Features:**
- ✅ Comprehensive Google search testing
- ✅ Professional reporting with extent reports
- ✅ Advanced validations and assertions
- ✅ Cross-browser and mobile testing
- ✅ Performance and reliability testing
- ✅ Professional documentation
- ✅ CI/CD ready configuration
- ✅ Industry best practices implementation

---

**Built with ❤️ and Playwright for The Multiple Group**