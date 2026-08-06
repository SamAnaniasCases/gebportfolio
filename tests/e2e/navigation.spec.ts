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
      { name: "Home", path: "/" },
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
        await page.waitForLoadState("domcontentloaded");
        const openBtn = page.getByRole("button", { name: "Open navigation menu" });
        await expect(openBtn).toBeVisible();
        const mobileMenu = page.getByRole("navigation", { name: "Mobile navigation" });
        if (!(await mobileMenu.isVisible())) {
          await openBtn.click();
        }
        await expect(mobileMenu).toBeVisible();
      }
    };
    const navigation = () =>
      page.getByRole("navigation", { name: isMobile ? "Mobile navigation" : "Main navigation" });

    for (const link of navLinks) {
      await openMenuIfMobile();

      // Find navigation link inside the active navigation region
      const navLink = navigation().locator(`a[href="${link.path}"]`).first();
      await expect(navLink).toBeVisible();

      // Click link and await URL navigation concurrently
      if (link.path === "/") {
        await navLink.click();
      } else {
        await Promise.all([page.waitForURL(`**${link.path}**`), navLink.click()]);
      }

      // Verify URL pathname (strip trailing slashes for static output compatibility)
      const url = new URL(page.url());
      const cleanPath =
        url.pathname.endsWith("/") && url.pathname.length > 1
          ? url.pathname.slice(0, -1)
          : url.pathname;
      expect(cleanPath).toBe(link.path);
    }

    // Verify the last visited route is marked as the active link
    await openMenuIfMobile();
    await expect(navigation().locator('a[href="/contact"]').first()).toHaveAttribute(
      "aria-current",
      "page"
    );
  });
});
