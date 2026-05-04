const { test, expect } = require('@playwright/test');

test.describe('Google Images Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Google Images page with increased timeout
    await page.goto('/imghp?hl=en&ogbl', { waitUntil: 'networkidle', timeout: 30000 });
  });

  test('should load Google Images page and verify main elements', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Google Images/);
    
    // Verify Google Images logo/text is visible
    const imagesText = page.locator('text=Images');
    await expect(imagesText).toBeVisible({ timeout: 10000 });
    
    // Verify search input is visible and interactable
    const searchInput = page.locator('input[name="q"]');
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    await expect(searchInput).toBeEditable();
    
    // Verify camera icon for image search is present
    const cameraIcon = page.locator('[aria-label="Search by image"], [title="Search by image"]');
    await expect(cameraIcon).toBeVisible({ timeout: 10000 });
  });

  test('should verify navigation elements', async ({ page }) => {
    // Check Google apps menu
    const appsMenu = page.locator('a[aria-label="Google apps"], a:has-text("Google apps")');
    await expect(appsMenu).toBeVisible({ timeout: 10000 });
    
    // Check Sign in link
    const signInLink = page.locator('a:has-text("Sign in")');
    await expect(signInLink).toBeVisible({ timeout: 10000 });
    
    // Check Advanced Image Search link
    const advancedSearchLink = page.locator('a:has-text("Advanced Image Search"), a:has-text("Advanced")');
    await expect(advancedSearchLink).toBeVisible({ timeout: 10000 });
  });

  test('should verify footer links', async ({ page }) => {
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Check Advertising link
    const advertisingLink = page.locator('a:has-text("Advertising")');
    await expect(advertisingLink).toBeVisible({ timeout: 10000 });
    
    // Check Business Solutions link
    const businessLink = page.locator('a:has-text("Business Solutions"), a:has-text("Business")');
    await expect(businessLink).toBeVisible({ timeout: 10000 });
    
    // Check About Google link
    const aboutLink = page.locator('a:has-text("About Google"), a:has-text("About")');
    await expect(aboutLink).toBeVisible({ timeout: 10000 });
    
    // Check Privacy link
    const privacyLink = page.locator('a:has-text("Privacy")');
    await expect(privacyLink).toBeVisible({ timeout: 10000 });
    
    // Check Terms link
    const termsLink = page.locator('a:has-text("Terms")');
    await expect(termsLink).toBeVisible({ timeout: 10000 });
  });

  test('should perform image search functionality', async ({ page }) => {
    // Locate search input
    const searchInput = page.locator('input[name="q"]');
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Type search query
    await searchInput.fill('cats');
    
    // Wait for search suggestions
    await page.waitForTimeout(1000);
    
    // Press Enter to search
    await searchInput.press('Enter');
    
    // Wait for image results page to load
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    
    // Verify we're on image search results page
    await expect(page).toHaveURL(/\/search\?.*tbm=isch/);
    
    // Verify image results are present
    const imageResults = page.locator('img[data-src], img[src]').first();
    await expect(imageResults).toBeVisible({ timeout: 10000 });
  });

  test('should verify hidden form inputs', async ({ page }) => {
    // Check for tbm input (should be 'isch' for images)
    const tbmInput = page.locator('input[name="tbm"]');
    await expect(tbmInput).toBeAttached();
    
    // Check for other hidden inputs
    const ieInput = page.locator('input[name="ie"]');
    await expect(ieInput).toBeAttached();
    
    const hlInput = page.locator('input[name="hl"]');
    await expect(hlInput).toBeAttached();
  });
});