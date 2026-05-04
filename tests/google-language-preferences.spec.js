const { test, expect } = require('@playwright/test');

test.describe('Google Language Preferences Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to language preferences page
    await page.goto('/setprefs?sig=0_VHzVQN2kQGEqSd15iTC0gyWSXdg%3D&hl=hi&source=homepage&sa=X&ved=0ahUKEwjB6Pmx9p6UAxVtupUCHaHvGMMQ2ZgBCAU');
    await page.waitForLoadState('networkidle');
  });

  test('should load language preferences page', async ({ page }) => {
    // Wait for page to load completely
    await page.waitForTimeout(2000);
    
    // Check if page loaded (may redirect or show preferences)
    const currentUrl = page.url();
    expect(currentUrl).toContain('google.com');
    
    // Look for language-related elements
    const languageElements = page.locator('select[name="hl"], option, label');
    
    // Check if any language elements are present
    const elementCount = await languageElements.count();
    if (elementCount > 0) {
      await expect(languageElements.first()).toBeVisible({ timeout: 10000 });
    }
  });

  test('should display language dropdown if available', async ({ page }) => {
    // Check for language dropdown
    const languageSelect = page.locator('select[name="hl"]');
    
    if (await languageSelect.count() > 0) {
      await expect(languageSelect).toBeVisible({ timeout: 10000 });
      
      // Check if dropdown has options
      const options = languageSelect.locator('option');
      const optionCount = await options.count();
      expect(optionCount).toBeGreaterThan(0);
    }
  });

  test('should display region/language filter dropdown if available', async ({ page }) => {
    // Check for language results filter dropdown
    const languageResultsSelect = page.locator('select[name="lr"]');
    
    if (await languageResultsSelect.count() > 0) {
      await expect(languageResultsSelect).toBeVisible({ timeout: 10000 });
    }
    
    // Check for region dropdown
    const regionSelect = page.locator('select[name="gl"]');
    
    if (await regionSelect.count() > 0) {
      await expect(regionSelect).toBeVisible({ timeout: 10000 });
    }
  });

  test('should display character encoding dropdown if available', async ({ page }) => {
    // Check for character encoding dropdown
    const encodingSelect = page.locator('select[name="cs"]');
    
    if (await encodingSelect.count() > 0) {
      await expect(encodingSelect).toBeVisible({ timeout: 10000 });
    }
  });

  test('should display preference labels in Hindi if available', async ({ page }) => {
    // Look for Hindi text labels
    const hindiLabels = [
      'भाषा',
      'भाषा के हिसाब से, खोज के नतीजे फ़िल्टर करने की सेट',
      'इलाके के हिसाब से, खोज के नतीजे पाने की सेटिंग'
    ];
    
    for (const labelText of hindiLabels) {
      const label = page.locator(`label:has-text("${labelText}")`);
      
      if (await label.count() > 0) {
        await expect(label).toBeVisible({ timeout: 10000 });
      }
    }
  });

  test('should display navigation links in Hindi if available', async ({ page }) => {
    // Check for Hindi navigation links
    const hindiLinks = [
      'सेव नहीं हो रहा है',
      'चालू है',
      'धुंधला करने की सुविधा चालू है',
      'ज़्यादा जानें',
      'सहायता',
      'निजता',
      'शर्तें'
    ];
    
    for (const linkText of hindiLinks) {
      const link = page.locator(`a:has-text("${linkText}")`);
      
      if (await link.count() > 0) {
        await expect(link).toBeVisible({ timeout: 10000 });
      }
    }
  });

  test('should have signature input for security', async ({ page }) => {
    // Check for security signature input
    const sigInput = page.locator('input[name="sig"]');
    
    if (await sigInput.count() > 0) {
      await expect(sigInput).toBeAttached();
      // Signature should have a value for security
      const sigValue = await sigInput.getAttribute('value');
      expect(sigValue).toBeTruthy();
    }
  });

  test('should handle language preference changes if form is available', async ({ page }) => {
    // Check if language select is available
    const languageSelect = page.locator('select[name="hl"]');
    
    if (await languageSelect.count() > 0 && await languageSelect.isVisible()) {
      // Get current value
      const currentValue = await languageSelect.inputValue();
      
      // Try to select a different language option
      const options = languageSelect.locator('option');
      const optionCount = await options.count();
      
      if (optionCount > 1) {
        // Select second option if available
        const secondOption = options.nth(1);
        const optionValue = await secondOption.getAttribute('value');
        
        if (optionValue && optionValue !== currentValue) {
          await languageSelect.selectOption(optionValue);
          
          // Verify selection changed
          await expect(languageSelect).toHaveValue(optionValue);
        }
      }
    }
  });
});