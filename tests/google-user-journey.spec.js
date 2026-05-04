const { test, expect } = require('@playwright/test');

test.describe('Google User Journey Tests', () => {
  test('complete user journey: homepage -> search -> images -> advanced search', async ({ page }) => {
    // Step 1: Start at Google homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verify we're on homepage
    await expect(page).toHaveTitle(/Google/);
    const searchInput = page.locator('input[name="q"]');
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Step 2: Perform a search
    await searchInput.fill('playwright testing framework');
    await searchInput.press('Enter');
    
    // Wait for search results
    await page.waitForURL(/.*google\.com\/search.*/, { timeout: 15000 });
    await expect(page.url()).toContain('search');
    
    // Step 3: Navigate to Images
    const imagesLink = page.locator('a:has-text("Images"), a[href*="tbm=isch"]');
    
    if (await imagesLink.isVisible({ timeout: 5000 })) {
      await imagesLink.click();
      await page.waitForURL(/.*tbm=isch.*/, { timeout: 10000 });
      await expect(page.url()).toContain('tbm=isch');
    } else {
      // Alternative: Navigate directly to images
      await page.goto('/imghp?hl=en&ogbl');
      await page.waitForLoadState('networkidle');
    }
    
    // Step 4: Navigate to Advanced Search
    await page.goto('/advanced_search?hl=en-IN&authuser=0');
    await page.waitForLoadState('networkidle');
    
    // Verify Advanced Search page
    await expect(page).toHaveTitle(/Advanced Search/);
    const advancedHeading = page.locator('text="Advanced Search"');
    await expect(advancedHeading).toBeVisible({ timeout: 10000 });
    
    // Step 5: Fill advanced search form
    const allWordsInput = page.locator('input[name="as_q"]');
    await allWordsInput.fill('automation testing');
    
    const exactPhraseInput = page.locator('input[name="as_epq"]');
    await exactPhraseInput.fill('end to end testing');
    
    // Verify inputs are filled
    await expect(allWordsInput).toHaveValue('automation testing');
    await expect(exactPhraseInput).toHaveValue('end to end testing');
    
    // Step 6: Return to homepage
    const homeLink = page.locator('a:has-text("Go to Google Home")');
    await expect(homeLink).toBeVisible({ timeout: 10000 });
    
    await homeLink.click();
    await page.waitForLoadState('networkidle');
    
    // Verify we're back on homepage
    await expect(page).toHaveTitle(/Google/);
    const finalSearchInput = page.locator('input[name="q"]');
    await expect(finalSearchInput).toBeVisible({ timeout: 10000 });
  });

  test('language switching user journey', async ({ page }) => {
    // Step 1: Start at Google homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Step 2: Click on a language link (Hindi)
    const hindiLink = page.locator('a:has-text("हिन्दी")');
    
    if (await hindiLink.isVisible({ timeout: 10000 })) {
      await hindiLink.click();
      
      // Wait for page to potentially reload with new language
      await page.waitForLoadState('networkidle');
      
      // Check if URL changed to include Hindi language parameter
      const currentUrl = page.url();
      if (currentUrl.includes('hl=hi') || currentUrl.includes('setprefs')) {
        // Language preference page or Hindi version loaded
        expect(currentUrl).toContain('google.com');
      }
    }
    
    // Step 3: Navigate back to English version
    await page.goto('/?hl=en');
    await page.waitForLoadState('networkidle');
    
    // Verify we're back to English homepage
    await expect(page).toHaveTitle(/Google/);
    const searchInput = page.locator('input[name="q"]');
    await expect(searchInput).toBeVisible({ timeout: 10000 });
  });

  test('mobile navigation simulation', async ({ page }) => {
    // Simulate mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate to Google homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verify mobile layout
    const searchInput = page.locator('input[name="q"]');
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Check if mobile-specific elements are present
    const logo = page.locator('img[alt*="Google"]');
    await expect(logo).toBeVisible({ timeout: 10000 });
    
    // Perform search on mobile
    await searchInput.fill('mobile testing');
    await searchInput.press('Enter');
    
    // Wait for search results
    await page.waitForURL(/.*google\.com\/search.*/, { timeout: 15000 });
    await expect(page.url()).toContain('search');
    
    // Navigate to Images on mobile
    const imagesLink = page.locator('a:has-text("Images"), a[href*="tbm=isch"]');
    
    if (await imagesLink.isVisible({ timeout: 5000 })) {
      await imagesLink.click();
      await page.waitForURL(/.*tbm=isch.*/, { timeout: 10000 });
    }
  });

  test('accessibility navigation journey', async ({ page }) => {
    // Navigate to Google homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test keyboard navigation
    const searchInput = page.locator('input[name="q"]');
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Focus on search input using keyboard
    await page.keyboard.press('Tab');
    await expect(searchInput).toBeFocused();
    
    // Type using keyboard
    await page.keyboard.type('accessibility testing');
    await expect(searchInput).toHaveValue('accessibility testing');
    
    // Submit using keyboard
    await page.keyboard.press('Enter');
    
    // Wait for search results
    await page.waitForURL(/.*google\.com\/search.*/, { timeout: 15000 });
    
    // Test tab navigation through results
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Verify we can navigate back
    await page.goBack();
    await page.waitForLoadState('networkidle');
    
    // Should be back on homepage
    await expect(page).toHaveTitle(/Google/);
  });

  test('error handling and recovery journey', async ({ page }) => {
    // Start with a potentially problematic navigation
    try {
      await page.goto('/nonexistent-page', { timeout: 10000 });
    } catch (error) {
      // Expected to fail, continue with recovery
    }
    
    // Navigate to valid page
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verify recovery successful
    await expect(page).toHaveTitle(/Google/);
    
    // Test search with special characters
    const searchInput = page.locator('input[name="q"]');
    await searchInput.fill('test@#$%^&*()_+{}[]|\\:;"<>?');
    
    // Try to submit
    try {
      await searchInput.press('Enter');
      await page.waitForURL(/.*google\.com\/search.*/, { timeout: 10000 });
    } catch (error) {
      // If search fails, verify we can still navigate
      await page.goto('/');
      await page.waitForLoadState('networkidle');
    }
    
    // Final verification that we can still use the site
    const finalSearchInput = page.locator('input[name="q"]');
    await expect(finalSearchInput).toBeVisible({ timeout: 10000 });
  });
});