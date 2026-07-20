import { test, expect } from "@playwright/test";

test.describe("Global Navigation & Header Verification", () => {
  test.beforeEach(async ({ page }) => {
    // Visit the home page before each test
    await page.goto("/");
  });

  test("should render the home page with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Sam Ananias/);
  });

  test("should support accessible skip link keyboard focus and targeting", async ({
    page,
    browserName,
  }) => {
    // Initially skip link is screen-reader only (hidden visually)
    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await expect(skipLink).toHaveClass(/sr-only/);

    // Tab onto the page to focus the skip link (skip focus check on Webkit due to native link tab-focus limitations)
    if (browserName !== "webkit") {
      await page.keyboard.press("Tab");
      await expect(skipLink).toBeFocused();
    }

    // Verify skip link has target `#main-content`
    const href = await skipLink.getAttribute("href");
    expect(href).toBe("#main-content");
  });

  test("should successfully navigate to all primary routes from the header", async ({ page }) => {
    const navLinks = [
      { name: "Work", path: "/projects" },
      { name: "About", path: "/about" },
      { name: "Writing", path: "/posts" },
      { name: "Research", path: "/research" },
      { name: "Experience", path: "/experience" },
      { name: "Lab", path: "/experiments" },
      { name: "Contact", path: "/contact" },
    ];

    for (const link of navLinks) {
      // Find navigation link inside the header
      const headerNavLink = page.locator("header nav").getByRole("link", { name: link.name });
      await expect(headerNavLink).toBeVisible();

      // Click the link and wait for navigation
      await headerNavLink.click({ force: true });
      await page.waitForURL(`**${link.path}`);

      // Verify URL pathname
      const url = new URL(page.url());
      expect(url.pathname).toBe(link.path);

      // Verify the link is active (has bold/primary styling)
      await expect(headerNavLink).toHaveClass(/text-primary/);
      await expect(headerNavLink).toHaveClass(/font-semibold/);
    }
  });
});
