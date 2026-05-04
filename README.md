# Google.com Playwright Automation Tests

This project contains comprehensive Playwright automation tests for Google.com, covering the main pages and user journeys.

## Project Structure

```
google-playwright-tests/
├── package.json
├── playwright.config.js
├── tests/
│   ├── google-homepage.spec.js
│   ├── google-advanced-search.spec.js
│   ├── google-images.spec.js
│   ├── google-language-preferences.spec.js
│   └── google-user-journey.spec.js
└── README.md
```

## Test Coverage

### 1. Google Homepage Tests (`google-homepage.spec.js`)
- Page load verification
- Navigation links visibility
- Language options display
- Footer links verification
- Basic search functionality

### 2. Advanced Search Tests (`google-advanced-search.spec.js`)
- Advanced search page load
- Search field labels and inputs
- Filter options (language, region, file type)
- Additional search options
- Navigation and help links
- Multi-criteria search execution

### 3. Google Images Tests (`google-images.spec.js`)
- Images page load verification
- Navigation elements
- Footer links
- Search functionality
- Visual search features
- Page structure validation

### 4. Language Preferences Tests (`google-language-preferences.spec.js`)
- Language preferences page load
- Language dropdown functionality
- Region/language filter options
- Character encoding settings
- Hindi interface elements
- Security signature validation

### 5. User Journey Tests (`google-user-journey.spec.js`)
- Complete navigation flow: homepage → search → images → advanced search
- Language switching journey
- Mobile navigation simulation
- Accessibility navigation
- Error handling and recovery

## Setup Instructions

### Prerequisites
- Node.js 16 or higher
- npm or yarn package manager

### Installation

1. Clone or create the project directory:
```bash
mkdir google-playwright-tests
cd google-playwright-tests
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npm run install-browsers
```

## Running Tests

### Run all tests:
```bash
npm test
```

### Run tests in headed mode (visible browser):
```bash
npm run test:headed
```

### Run tests in debug mode:
```bash
npm run test:debug
```

### Run tests with UI mode:
```bash
npm run test:ui
```

### Run specific test file:
```bash
npx playwright test tests/google-homepage.spec.js
```

### Run specific test:
```bash
npx playwright test --grep "should load Google homepage successfully"
```

## Test Configuration

The `playwright.config.js` includes:
- **Multiple browsers**: Chromium, Firefox, WebKit
- **Mobile testing**: Pixel 5, iPhone 12 viewports
- **Timeouts**: Increased for reliable testing
- **Screenshots**: On failure
- **Video recording**: On failure
- **Trace collection**: On retry

## Best Practices Implemented

### 1. Element Visibility Checks
- All tests use `toBeVisible()` with timeout
- Explicit waits for elements before interaction
- Fallback strategies for optional elements

### 2. Increased Timeouts
- Global timeout: 60 seconds
- Action timeout: 30 seconds
- Navigation timeout: 30 seconds
- Expect timeout: 10 seconds

### 3. Selector Best Practices
- Semantic selectors (text content, labels)
- Attribute-based selectors (`name`, `aria-label`)
- CSS selectors as fallback
- Avoiding brittle XPath selectors

### 4. Wait Strategies
- `waitForLoadState('networkidle')` for page loads
- `waitForURL()` for navigation verification
- `waitForTimeout()` for dynamic content
- Element-specific waits with `isVisible()`

### 5. Error Handling
- Try-catch blocks for optional interactions
- Graceful degradation for missing elements
- Alternative navigation paths
- Recovery mechanisms in user journeys

## Reporting

### View test results:
```bash
npm run report
```

This opens the HTML report with:
- Test execution timeline
- Screenshots of failures
- Video recordings
- Trace files for debugging

## Continuous Integration

The configuration is CI-ready with:
- Retry mechanism (2 retries on CI)
- Single worker on CI for stability
- Fail-fast on `test.only` in CI
- Comprehensive reporting

## Troubleshooting

### Common Issues

1. **Browser installation**: Run `npm run install-browsers`
2. **Network timeouts**: Increase timeout values in config
3. **Element not found**: Check selector specificity
4. **Flaky tests**: Add appropriate waits and retries

### Debug Mode
Use debug mode to step through tests:
```bash
npm run test:debug
```

### Trace Viewer
Analyze failed tests with trace viewer:
```bash
npx playwright show-trace trace.zip
```

## Contributing

1. Follow existing test structure and naming conventions
2. Use semantic selectors and proper waits
3. Include both positive and negative test scenarios
4. Add appropriate timeouts and error handling
5. Update README for new test additions

## License

MIT License - See LICENSE file for details