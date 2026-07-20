import { test, expect } from "@playwright/test";

test.describe("Theme Toggling & Dark Mode Integration (System Light Preference)", () => {
  test.use({ colorScheme: "light" });

  test("should load light mode by default, toggle to dark, persist in storage, and survive reload", async ({
    page,
  }) => {
    await page.goto("/");

    // 1. Initial State: Light Mode
    const htmlElement = page.locator("html");
    await expect(htmlElement).not.toHaveClass(/dark/);

    // 2. Toggle to Dark Mode
    const themeBtn = page.locator("#theme-toggle");
    await expect(themeBtn).toBeVisible();
    await themeBtn.click({ force: true });

    // Verify root html contains dark class
    await expect(htmlElement).toHaveClass(/dark/);

    // Verify local storage is set to "dark"
    const storageValue = await page.evaluate(() => localStorage.getItem("theme"));
    expect(storageValue).toBe("dark");

    // 3. Reload and Verify Persistence
    await page.reload();
    await expect(htmlElement).toHaveClass(/dark/);
  });
});

test.describe("Theme Toggling & Dark Mode Integration (System Dark Preference)", () => {
  test.use({ colorScheme: "dark" });

  test("should load dark mode by default, toggle to light, persist in storage, and survive reload", async ({
    page,
  }) => {
    await page.goto("/");

    // 1. Initial State: Dark Mode (Matches system preferences)
    const htmlElement = page.locator("html");
    await expect(htmlElement).toHaveClass(/dark/);

    // 2. Toggle to Light Mode
    const themeBtn = page.locator("#theme-toggle");
    await themeBtn.click({ force: true });

    // Verify dark class is removed
    await expect(htmlElement).not.toHaveClass(/dark/);

    // Verify local storage is set to "light"
    const storageValue = await page.evaluate(() => localStorage.getItem("theme"));
    expect(storageValue).toBe("light");

    // 3. Reload and Verify Persistence
    await page.reload();
    await expect(htmlElement).not.toHaveClass(/dark/);
  });
});
