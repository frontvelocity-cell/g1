const { test, expect } = require('@playwright/test');

test.describe('Google Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Google home page with increased timeout
    await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
  });

  test('should load Google home page and verify main elements', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Google/);
    
    // Verify Google logo is visible
    const logo = page.locator('img[alt="Google"]');
    await expect(logo).toBeVisible({ timeout: 10000 });
    
    // Verify search input is visible and interactable
    const searchInput = page.locator('input[name="q"]');
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    await expect(searchInput).toBeEditable();
    
    // Verify search buttons are present
    const searchButton = page.locator('input[name="btnG"]');
    const luckyButton = page.locator('input[name="btnI"]');
    
    // Wait for buttons to be visible
    await expect(searchButton).toBeVisible({ timeout: 10000 });
    await expect(luckyButton).toBeVisible({ timeout: 10000 });
  });

  test('should verify navigation links in header', async ({ page }) => {
    // Check Gmail link
    const gmailLink = page.locator('a:has-text("Gmail")');
    await expect(gmailLink).toBeVisible({ timeout: 10000 });
    await expect(gmailLink).toHaveAttribute('href', /mail\.google/);
    
    // Check Images link
    const imagesLink = page.locator('a[href*="/imghp"]');
    await expect(imagesLink).toBeVisible({ timeout: 10000 });
    
    // Check Google apps menu
    const appsMenu = page.locator('a[aria-label="Google apps"], a:has-text("Google apps")');
    await expect(appsMenu).toBeVisible({ timeout: 10000 });
    
    // Check Sign in link
    const signInLink = page.locator('a:has-text("Sign in")');
    await expect(signInLink).toBeVisible({ timeout: 10000 });
  });

  test('should verify language links in footer', async ({ page }) => {
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Check for Hindi language link
    const hindiLink = page.locator('a:has-text("हिन्दी")');
    await expect(hindiLink).toBeVisible({ timeout: 10000 });
    
    // Check for Bengali language link
    const bengaliLink = page.locator('a:has-text("বাংলা")');
    await expect(bengaliLink).toBeVisible({ timeout: 10000 });
    
    // Check for other language links
    const teluguLink = page.locator('a:has-text("తెలుగు")');
    await expect(teluguLink).toBeVisible({ timeout: 10000 });
  });

  test('should verify footer links', async ({ page }) => {
    // Wait for footer to load
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

  test('should perform basic search functionality', async ({ page }) => {
    // Locate search input
    const searchInput = page.locator('input[name="q"]');
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Type search query
    await searchInput.fill('playwright automation');
    
    // Wait for search suggestions to appear
    await page.waitForTimeout(1000);
    
    // Press Enter to search
    await searchInput.press('Enter');
    
    // Wait for search results page to load
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    
    // Verify we're on search results page
    await expect(page).toHaveURL(/\/search\?/);
    
    // Verify search results are present
    const results = page.locator('#search');
    await expect(results).toBeVisible({ timeout: 10000 });
  });
});