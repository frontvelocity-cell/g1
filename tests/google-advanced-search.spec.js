const { test, expect } = require('@playwright/test');

test.describe('Google Advanced Search Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Advanced Search page
    await page.goto('/advanced_search?hl=en-IN&authuser=0');
    await page.waitForLoadState('networkidle');
  });

  test('should load Advanced Search page successfully', async ({ page }) => {
    // Verify page title contains Advanced Search
    await expect(page).toHaveTitle(/Advanced Search/);
    
    // Check for Advanced Search heading
    const heading = page.locator('text="Advanced Search"');
    await expect(heading).toBeVisible({ timeout: 10000 });
    
    // Verify Go to Google Home link is present
    const homeLink = page.locator('a:has-text("Go to Google Home")');
    await expect(homeLink).toBeVisible({ timeout: 10000 });
  });

  test('should display all search field labels', async ({ page }) => {
    // Check for "all these words" field
    const allWordsLabel = page.locator('label:has-text("all these words")');
    await expect(allWordsLabel).toBeVisible({ timeout: 10000 });
    
    // Check for "this exact word or phrase" field
    const exactPhraseLabel = page.locator('label:has-text("this exact word or phrase")');
    await expect(exactPhraseLabel).toBeVisible({ timeout: 10000 });
    
    // Check for "any of these words" field
    const anyWordsLabel = page.locator('label:has-text("any of these words")');
    await expect(anyWordsLabel).toBeVisible({ timeout: 10000 });
    
    // Check for "none of these words" field
    const noneWordsLabel = page.locator('label:has-text("none of these words")');
    await expect(noneWordsLabel).toBeVisible({ timeout: 10000 });
  });

  test('should display search input fields', async ({ page }) => {
    // Check "all these words" input
    const allWordsInput = page.locator('input[name="as_q"]');
    await expect(allWordsInput).toBeVisible({ timeout: 10000 });
    
    // Check "exact phrase" input
    const exactPhraseInput = page.locator('input[name="as_epq"]');
    await expect(exactPhraseInput).toBeVisible({ timeout: 10000 });
    
    // Check "any of these words" input
    const anyWordsInput = page.locator('input[name="as_oq"]');
    await expect(anyWordsInput).toBeVisible({ timeout: 10000 });
    
    // Check "none of these words" input
    const noneWordsInput = page.locator('input[name="as_eq"]');
    await expect(noneWordsInput).toBeVisible({ timeout: 10000 });
  });

  test('should display filter options', async ({ page }) => {
    // Check language dropdown
    const languageSelect = page.locator('select[name="lr"]');
    await expect(languageSelect).toBeVisible({ timeout: 10000 });
    
    // Check region dropdown
    const regionSelect = page.locator('select[name="cr"]');
    await expect(regionSelect).toBeVisible({ timeout: 10000 });
    
    // Check last update dropdown
    const updateSelect = page.locator('select[name="as_qdr"]');
    await expect(updateSelect).toBeVisible({ timeout: 10000 });
    
    // Check file type dropdown
    const fileTypeSelect = page.locator('select[name="as_filetype"]');
    await expect(fileTypeSelect).toBeVisible({ timeout: 10000 });
  });

  test('should display additional search options', async ({ page }) => {
    // Check site or domain input
    const siteInput = page.locator('input[name="as_sitesearch"]');
    await expect(siteInput).toBeVisible({ timeout: 10000 });
    
    // Check numbers ranging from inputs
    const numberFromInput = page.locator('input[name="as_nlo"]');
    await expect(numberFromInput).toBeVisible({ timeout: 10000 });
    
    const numberToInput = page.locator('input[name="as_nhi"]');
    await expect(numberToInput).toBeVisible({ timeout: 10000 });
    
    // Check terms appearing dropdown
    const termsSelect = page.locator('select[name="as_occt"]');
    await expect(termsSelect).toBeVisible({ timeout: 10000 });
  });

  test('should display navigation and help links', async ({ page }) => {
    // Check Google apps link
    const appsLink = page.locator('a[aria-label*="Google apps"]');
    await expect(appsLink).toBeVisible({ timeout: 10000 });
    
    // Check Sign in link
    const signInLink = page.locator('a:has-text("Sign in")');
    await expect(signInLink).toBeVisible({ timeout: 10000 });
    
    // Check Help link
    const helpLink = page.locator('a:has-text("Help")');
    await expect(helpLink).toBeVisible({ timeout: 10000 });
    
    // Check usage rights link
    const usageRightsLink = page.locator('a:has-text("usage rights")');
    await expect(usageRightsLink).toBeVisible({ timeout: 10000 });
  });

  test('should perform advanced search with multiple criteria', async ({ page }) => {
    // Fill in "all these words" field
    const allWordsInput = page.locator('input[name="as_q"]');
    await allWordsInput.fill('playwright automation');
    
    // Fill in "exact phrase" field
    const exactPhraseInput = page.locator('input[name="as_epq"]');
    await exactPhraseInput.fill('test automation');
    
    // Select language filter
    const languageSelect = page.locator('select[name="lr"]');
    await languageSelect.selectOption('lang_en');
    
    // Verify fields are filled
    await expect(allWordsInput).toHaveValue('playwright automation');
    await expect(exactPhraseInput).toHaveValue('test automation');
    
    // Submit the search (look for Advanced Search button)
    const searchButton = page.locator('input[type="submit"], button[type="submit"]');
    
    if (await searchButton.isVisible({ timeout: 5000 })) {
      await searchButton.click();
      
      // Wait for search results
      await page.waitForURL(/.*google\.com\/search.*/, { timeout: 15000 });
      
      // Verify we're on search results page
      await expect(page.url()).toContain('search');
    }
  });
});