# Google Playwright Automation Tests

This project contains comprehensive Playwright automation tests for Google's main pages including the home page, images search, advanced search, and preferences page.

## Project Structure

```
google-playwright-tests/
├── package.json
├── playwright.config.js
├── tests/
│   ├── google-home.spec.js
│   ├── google-images.spec.js
│   ├── google-advanced-search.spec.js
│   └── google-preferences.spec.js
└── README.md
```

## Features

### Test Coverage
- **Google Home Page**: Search functionality, navigation links, language options, footer links
- **Google Images**: Image search functionality, advanced search options, UI elements
- **Advanced Search**: Complex search forms, dropdown selectors, input validation
- **Preferences Page**: Language settings, region preferences, Hindi interface elements

### Best Practices Implemented
- ✅ **Element Visibility Checks**: All elements are verified for visibility before interaction
- ✅ **Increased Timeouts**: Custom timeouts for slow-loading elements (30s navigation, 10s element waits)
- ✅ **Robust Selectors**: Multiple selector strategies including text, attributes, and CSS selectors
- ✅ **Smart Waits**: `networkidle` waits and conditional element checks
- ✅ **Error Handling**: Graceful handling of dynamic content and optional elements

## Installation

1. **Clone or create the project directory**
   ```bash
   mkdir google-playwright-tests
   cd google-playwright-tests
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npm run install:browsers
   ```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (visible browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests with UI mode
```bash
npm run test:ui
```

### Run specific test file
```bash
npx playwright test tests/google-home.spec.js
```

### Run tests on specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Reports

### View HTML report
```bash
npm run test:report
```

### Generate and view report after test run
```bash
npm test && npm run test:report
```

## Configuration

### Playwright Configuration
The `playwright.config.js` includes:
- **Multi-browser support**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Timeouts**: 30s navigation, 30s actions, 10s expectations
- **Retries**: 2 retries on CI, 0 locally
- **Screenshots**: On failure only
- **Videos**: Retained on failure
- **Traces**: On first retry

### Environment Variables
- `CI`: Set to true for CI/CD pipeline optimizations

## Test Structure

Each test file follows a consistent pattern:

1. **beforeEach**: Navigation with proper waits
2. **Element Verification**: Visibility and interactability checks
3. **Functional Testing**: User journey simulation
4. **Assertions**: Comprehensive validation with timeouts

### Example Test Pattern
```javascript
test('should verify element', async ({ page }) => {
  // Wait for element with timeout
  const element = page.locator('selector');
  await expect(element).toBeVisible({ timeout: 10000 });
  
  // Verify element properties
  await expect(element).toBeEditable();
  
  // Perform interactions
  await element.fill('test data');
});
```

## Selectors Strategy

### Robust Selector Patterns
1. **Text-based**: `page.locator('a:has-text("Gmail")')`
2. **Attribute-based**: `page.locator('input[name="q"]')`
3. **ARIA labels**: `page.locator('a[aria-label="Google apps"]')`
4. **Multiple fallbacks**: `page.locator('a:has-text("Business Solutions"), a:has-text("Business")')`
5. **CSS selectors**: `page.locator('img[alt="Google"]')`

## Handling Dynamic Content

### Language-Specific Content
- Tests handle both English and Hindi interfaces
- Conditional checks for language-specific elements
- Unicode text support for international characters

### Optional Elements
```javascript
if (await element.isVisible({ timeout: 5000 })) {
  await expect(element).toBeVisible();
}
```

## Debugging

### Debug Mode
```bash
npm run test:debug
```

### Screenshots and Videos
- Screenshots saved on failure
- Videos recorded on failure
- Traces captured on retry

### Console Output
```bash
npx playwright test --reporter=list
```

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Install dependencies
  run: npm ci
- name: Install Playwright Browsers
  run: npx playwright install --with-deps
- name: Run Playwright tests
  run: npm test
```

## Troubleshooting

### Common Issues
1. **Timeout Errors**: Increase timeout values in configuration
2. **Element Not Found**: Use more robust selectors or add waits
3. **Flaky Tests**: Add proper waits and element visibility checks
4. **Language Issues**: Ensure proper Unicode handling

### Performance Optimization
- Use `networkidle` for heavy pages
- Implement conditional element checks
- Optimize selector strategies
- Use parallel execution wisely

## Contributing

1. Follow existing test patterns
2. Add proper waits and timeouts
3. Use robust selectors
4. Include visibility checks
5. Add meaningful assertions
6. Document complex test scenarios

## License

MIT License - Feel free to use and modify for your testing needs.