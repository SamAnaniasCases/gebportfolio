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

  test("should successfully navigate to all primary routes from the navigation", async ({
    page,
    isMobile,
  }) => {
    const navLinks = [
      { name: "Work", path: "/projects" },
      { name: "About", path: "/about" },
      { name: "Writing", path: "/posts" },
      { name: "Research", path: "/research" },
      { name: "Experience", path: "/experience" },
      { name: "Lab", path: "/experiments" },
      { name: "Contact", path: "/contact" },
    ];

    // Desktop uses the fixed sidebar nav; mobile uses the full-screen overlay
    // nav, which must be opened via the hamburger before each navigation.
    const openMenuIfMobile = async () => {
      if (isMobile) {
        await page.getByRole("button", { name: "Open navigation menu" }).click();
      }
    };
    const navigation = () =>
      page.getByRole("navigation", { name: isMobile ? "Mobile navigation" : "Main navigation" });

    for (const link of navLinks) {
      await openMenuIfMobile();

      // Find navigation link inside the active navigation region
      const navLink = navigation().getByRole("link", { name: link.name, exact: true });
      await expect(navLink).toBeVisible();

      // Click the link and wait for navigation
      await navLink.click();
      await page.waitForURL(`**${link.path}`);

      // Verify URL pathname
      const url = new URL(page.url());
      expect(url.pathname).toBe(link.path);
    }

    // Verify the last visited route is marked as the active link
    await openMenuIfMobile();
    await expect(navigation().getByRole("link", { name: "Contact", exact: true })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });
});
