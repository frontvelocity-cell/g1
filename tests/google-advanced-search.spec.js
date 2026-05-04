const { test, expect } = require('@playwright/test');

test.describe('Google Advanced Search Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Google Advanced Search page with increased timeout
    await page.goto('/advanced_search?hl=en-IN&authuser=0', { waitUntil: 'networkidle', timeout: 30000 });
  });

  test('should load Advanced Search page and verify main elements', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Advanced Search/);
    
    // Verify Advanced Search heading
    const heading = page.locator('text=Advanced Search, label:has-text("Advanced Search")');
    await expect(heading.first()).toBeVisible({ timeout: 10000 });
    
    // Verify "Go to Google Home" link
    const homeLink = page.locator('a:has-text("Go to Google Home")');
    await expect(homeLink.first()).toBeVisible({ timeout: 10000 });
  });

  test('should verify search form inputs', async ({ page }) => {
    // Check "all these words" input
    const allWordsInput = page.locator('input[name="as_q"]');
    await expect(allWordsInput).toBeVisible({ timeout: 10000 });
    await expect(allWordsInput).toBeEditable();
    
    // Check "this exact word or phrase" input
    const exactPhraseInput = page.locator('input[name="as_epq"]');
    await expect(exactPhraseInput).toBeVisible({ timeout: 10000 });
    await expect(exactPhraseInput).toBeEditable();
    
    // Check "any of these words" input
    const anyWordsInput = page.locator('input[name="as_oq"]');
    await expect(anyWordsInput).toBeVisible({ timeout: 10000 });
    await expect(anyWordsInput).toBeEditable();
    
    // Check "none of these words" input
    const noneWordsInput = page.locator('input[name="as_eq"]');
    await expect(noneWordsInput).toBeVisible({ timeout: 10000 });
    await expect(noneWordsInput).toBeEditable();
  });

  test('should verify numeric range inputs', async ({ page }) => {
    // Check number range inputs
    const numberFromInput = page.locator('input[name="as_nlo"]');
    await expect(numberFromInput).toBeVisible({ timeout: 10000 });
    
    const numberToInput = page.locator('input[name="as_nhi"]');
    await expect(numberToInput).toBeVisible({ timeout: 10000 });
    
    // Verify labels for number range
    const numberRangeLabel = page.locator('label:has-text("numbers ranging from")');
    await expect(numberRangeLabel).toBeVisible({ timeout: 10000 });
  });

  test('should verify dropdown selectors', async ({ page }) => {
    // Check language selector
    const languageSelect = page.locator('select[name="lr"]');
    await expect(languageSelect).toBeVisible({ timeout: 10000 });
    
    // Check region selector
    const regionSelect = page.locator('select[name="cr"]');
    await expect(regionSelect).toBeVisible({ timeout: 10000 });
    
    // Check last update selector
    const lastUpdateSelect = page.locator('select[name="as_qdr"]');
    await expect(lastUpdateSelect).toBeVisible({ timeout: 10000 });
    
    // Check file type selector
    const fileTypeSelect = page.locator('select[name="as_filetype"]');
    await expect(fileTypeSelect).toBeVisible({ timeout: 10000 });
    
    // Check usage rights selector
    const usageRightsSelect = page.locator('select[name="as_rights"]');
    await expect(usageRightsSelect).toBeVisible({ timeout: 10000 });
  });

  test('should verify form labels', async ({ page }) => {
    // Check various form labels
    const labels = [
      'all these words:',
      'this exact word or phrase:',
      'any of these words:',
      'none of these words:',
      'language:',
      'region:',
      'last update:',
      'site or domain:',
      'file type:'
    ];
    
    for (const labelText of labels) {
      const label = page.locator(`label:has-text("${labelText}")`).first();
      await expect(label).toBeVisible({ timeout: 10000 });
    }
  });

  test('should verify site/domain search input', async ({ page }) => {
    // Check site or domain input
    const siteInput = page.locator('input[name="as_sitesearch"]');
    await expect(siteInput).toBeVisible({ timeout: 10000 });
    await expect(siteInput).toBeEditable();
    
    // Check site or domain label
    const siteLabel = page.locator('label:has-text("site or domain:")');
    await expect(siteLabel).toBeVisible({ timeout: 10000 });
  });

  test('should verify navigation links', async ({ page }) => {
    // Check Google apps menu
    const appsMenu = page.locator('a[aria-label="Google apps"], a:has-text("Google apps")');
    await expect(appsMenu).toBeVisible({ timeout: 10000 });
    
    // Check Sign in link
    const signInLink = page.locator('a:has-text("Sign in")');
    await expect(signInLink).toBeVisible({ timeout: 10000 });
    
    // Check Help link
    const helpLink = page.locator('a:has-text("Help")');
    await expect(helpLink).toBeVisible({ timeout: 10000 });
  });

  test('should verify footer links', async ({ page }) => {
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Check Privacy link
    const privacyLink = page.locator('a:has-text("Privacy")');
    await expect(privacyLink).toBeVisible({ timeout: 10000 });
    
    // Check Terms link
    const termsLink = page.locator('a:has-text("Terms")');
    await expect(termsLink).toBeVisible({ timeout: 10000 });
  });

  test('should perform advanced search', async ({ page }) => {
    // Fill in search criteria
    await page.locator('input[name="as_q"]').fill('playwright');
    await page.locator('input[name="as_epq"]').fill('automation testing');
    
    // Select language (English)
    await page.locator('select[name="lr"]').selectOption('lang_en');
    
    // Submit the form by pressing Enter on one of the inputs
    await page.locator('input[name="as_q"]').press('Enter');
    
    // Wait for search results
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    
    // Verify we're on search results page
    await expect(page).toHaveURL(/\/search\?/);
  });

  test('should verify helper links', async ({ page }) => {
    // Check usage rights link
    const usageRightsLink = page.locator('a:has-text("usage rights")');
    await expect(usageRightsLink).toBeVisible({ timeout: 10000 });
    
    // Check search operators link
    const operatorsLink = page.locator('a:has-text("Use operators in the search box")');
    await expect(operatorsLink).toBeVisible({ timeout: 10000 });
    
    // Check search settings link
    const settingsLink = page.locator('a:has-text("Customise your search settings")');
    await expect(settingsLink).toBeVisible({ timeout: 10000 });
  });
});