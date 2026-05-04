const { test, expect } = require('@playwright/test');

test.describe('Google Homepage Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Google homepage before each test
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load Google homepage successfully', async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle(/Google/);
    
    // Check if search input is visible
    const searchInput = page.locator('input[name="q"]');
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Verify Google logo is present
    const logo = page.locator('img[alt*="Google"]');
    await expect(logo).toBeVisible({ timeout: 10000 });
  });

  test('should display main navigation links', async ({ page }) => {
    // Check Gmail link
    const gmailLink = page.locator('a:has-text("Gmail")');
    await expect(gmailLink).toBeVisible({ timeout: 10000 });
    
    // Check Images link
    const imagesLink = page.locator('a[aria-label*="Search for Images"], a:has-text("Images")');
    await expect(imagesLink).toBeVisible({ timeout: 10000 });
    
    // Check Google apps button
    const appsButton = page.locator('a[aria-label*="Google apps"]');
    await expect(appsButton).toBeVisible({ timeout: 10000 });
    
    // Check Sign in button
    const signInButton = page.locator('a:has-text("Sign in")');
    await expect(signInButton).toBeVisible({ timeout: 10000 });
  });

  test('should display language options', async ({ page }) => {
    // Wait for language links to be available
    await page.waitForTimeout(2000);
    
    // Check for Hindi language option
    const hindiLink = page.locator('a:has-text("हिन्दी")');
    await expect(hindiLink).toBeVisible({ timeout: 10000 });
    
    // Check for other language options (at least one should be visible)
    const languageLinks = page.locator('a[href*="setprefs"]');
    await expect(languageLinks.first()).toBeVisible({ timeout: 10000 });
  });

  test('should display footer links', async ({ page }) => {
    // Scroll to footer to ensure visibility
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check Advertising link
    const advertisingLink = page.locator('a:has-text("Advertising")');
    await expect(advertisingLink).toBeVisible({ timeout: 10000 });
    
    // Check Business Solutions link
    const businessLink = page.locator('a:has-text("Business Solutions")');
    await expect(businessLink).toBeVisible({ timeout: 10000 });
    
    // Check About Google link
    const aboutLink = page.locator('a:has-text("About Google")');
    await expect(aboutLink).toBeVisible({ timeout: 10000 });
    
    // Check Privacy link
    const privacyLink = page.locator('a:has-text("Privacy")');
    await expect(privacyLink).toBeVisible({ timeout: 10000 });
    
    // Check Terms link
    const termsLink = page.locator('a:has-text("Terms")');
    await expect(termsLink).toBeVisible({ timeout: 10000 });
  });

  test('should perform basic search functionality', async ({ page }) => {
    // Locate search input
    const searchInput = page.locator('input[name="q"]');
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Type search query
    await searchInput.fill('Playwright testing');
    
    // Verify text was entered
    await expect(searchInput).toHaveValue('Playwright testing');
    
    // Look for search button and click
    const searchButton = page.locator('input[name="btnG"], button[aria-label*="Google Search"]');
    
    // Wait for search button to be enabled and visible
    await page.waitForTimeout(1000);
    
    // Try to click search button if visible, otherwise press Enter
    try {
      await searchButton.click({ timeout: 5000 });
    } catch {
      await searchInput.press('Enter');
    }
    
    // Wait for search results page to load
    await page.waitForURL(/.*google\.com\/search.*/, { timeout: 15000 });
    
    // Verify we're on search results page
    await expect(page.url()).toContain('search');
  });
});