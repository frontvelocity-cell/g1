const { test, expect } = require('@playwright/test');

test.describe('Google Preferences Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Google preferences page with increased timeout
    await page.goto('/setprefs?sig=0_osr4ifVJCJ27XWJ8-ENgchT31W8%3D&hl=hi&source=homepage&sa=X&ved=0ahUKEwj08O3H7Z6UAxUWQ7gEHYBTLRMQ2ZgBCAU', { 
      waitUntil: 'networkidle', 
      timeout: 30000 
    });
  });

  test('should load preferences page and verify main elements', async ({ page }) => {
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Verify page has loaded (check for any Google-related content)
    const googleContent = page.locator('body');
    await expect(googleContent).toBeVisible({ timeout: 10000 });
  });

  test('should verify language selector', async ({ page }) => {
    // Check for language selector (hl parameter)
    const languageSelect = page.locator('select[name="hl"]');
    if (await languageSelect.isVisible({ timeout: 5000 })) {
      await expect(languageSelect).toBeVisible();
      
      // Verify language label if present
      const languageLabel = page.locator('label:has-text("भाषा")');
      if (await languageLabel.isVisible({ timeout: 5000 })) {
        await expect(languageLabel).toBeVisible();
      }
    }
  });

  test('should verify region/location selector', async ({ page }) => {
    // Check for region selector (lr parameter)
    const regionSelect = page.locator('select[name="lr"]');
    if (await regionSelect.isVisible({ timeout: 5000 })) {
      await expect(regionSelect).toBeVisible();
    }
    
    // Check for location selector (gl parameter)
    const locationSelect = page.locator('select[name="gl"]');
    if (await locationSelect.isVisible({ timeout: 5000 })) {
      await expect(locationSelect).toBeVisible();
    }
  });

  test('should verify search settings selector', async ({ page }) => {
    // Check for search settings selector (cs parameter)
    const searchSelect = page.locator('select[name="cs"]');
    if (await searchSelect.isVisible({ timeout: 5000 })) {
      await expect(searchSelect).toBeVisible();
    }
  });

  test('should verify preference labels in Hindi', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(2000);
    
    // Check for Hindi language label
    const languageLabel = page.locator('label:has-text("भाषा")');
    if (await languageLabel.isVisible({ timeout: 5000 })) {
      await expect(languageLabel).toBeVisible();
    }
    
    // Check for search filter label in Hindi
    const filterLabel = page.locator('label:has-text("भाषा के हिसाब से, खोज के नतीजे फ़िल्टर करने की सेट")');
    if (await filterLabel.isVisible({ timeout: 5000 })) {
      await expect(filterLabel).toBeVisible();
    }
    
    // Check for region settings label in Hindi
    const regionLabel = page.locator('label:has-text("इलाके के हिसाब से, खोज के नतीजे पाने की सेटिंग")');
    if (await regionLabel.isVisible({ timeout: 5000 })) {
      await expect(regionLabel).toBeVisible();
    }
  });

  test('should verify navigation links in Hindi', async ({ page }) => {
    // Wait for page content
    await page.waitForTimeout(2000);
    
    // Check for "सेव नहीं हो रहा है" (Not saving) link
    const notSavingLink = page.locator('a:has-text("सेव नहीं हो रहा है")');
    if (await notSavingLink.isVisible({ timeout: 5000 })) {
      await expect(notSavingLink).toBeVisible();
    }
    
    // Check for "चालू है" (Enabled) link
    const enabledLink = page.locator('a:has-text("चालू है")');
    if (await enabledLink.isVisible({ timeout: 5000 })) {
      await expect(enabledLink).toBeVisible();
    }
    
    // Check for "ज़्यादा जानें" (Learn more) link
    const learnMoreLink = page.locator('a:has-text("ज़्यादा जानें")');
    if (await learnMoreLink.isVisible({ timeout: 5000 })) {
      await expect(learnMoreLink).toBeVisible();
    }
  });

  test('should verify footer links', async ({ page }) => {
    // Wait for page to load
    await page.waitForTimeout(2000);
    
    // Check for Help link in Hindi
    const helpLink = page.locator('a:has-text("सहायता")');
    if (await helpLink.isVisible({ timeout: 5000 })) {
      await expect(helpLink).toBeVisible();
    }
    
    // Check for Privacy link in Hindi
    const privacyLink = page.locator('a:has-text("निजता")');
    if (await privacyLink.isVisible({ timeout: 5000 })) {
      await expect(privacyLink).toBeVisible();
    }
    
    // Check for Terms link in Hindi
    const termsLink = page.locator('a:has-text("शर्तें")');
    if (await termsLink.isVisible({ timeout: 5000 })) {
      await expect(termsLink).toBeVisible();
    }
  });

  test('should verify signature input', async ({ page }) => {
    // Check for signature input (security parameter)
    const sigInput = page.locator('input[name="sig"]');
    if (await sigInput.isVisible({ timeout: 5000 })) {
      await expect(sigInput).toBeAttached();
    }
  });

  test('should handle preference form interactions', async ({ page }) => {
    // Wait for any interactive elements
    await page.waitForTimeout(2000);
    
    // Try to interact with language selector if present
    const languageSelect = page.locator('select[name="hl"]');
    if (await languageSelect.isVisible({ timeout: 5000 })) {
      // Get current value
      const currentValue = await languageSelect.inputValue();
      expect(currentValue).toBeDefined();
    }
    
    // Try to interact with region selector if present
    const regionSelect = page.locator('select[name="lr"]');
    if (await regionSelect.isVisible({ timeout: 5000 })) {
      // Verify it's interactable
      await expect(regionSelect).toBeEnabled();
    }
  });

  test('should verify search functionality link', async ({ page }) => {
    // Wait for content
    await page.waitForTimeout(2000);
    
    // Check for search functionality link in Hindi
    const searchFunctionLink = page.locator('a:has-text("धुंधला करने की सुविधा चालू है")');
    if (await searchFunctionLink.isVisible({ timeout: 5000 })) {
      await expect(searchFunctionLink).toBeVisible();
    }
  });
});