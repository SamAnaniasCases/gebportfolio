import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility Audits (WCAG 2.2 AA Compliance)", () => {
  const routes = [
    "/",
    "/about",
    "/projects",
    "/experience",
    "/posts",
    "/experiments",
    "/contact",
    "/search",
  ];

  for (const route of routes) {
    test(`route "${route}" should have zero accessibility violations`, async ({ page }) => {
      await page.goto(route);

      // Wait for DOM content to be fully parsed and loaded
      await page.waitForLoadState("domcontentloaded");

      // Allow minor layout transitions to settle
      await page.waitForTimeout(200);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa"])
        .analyze();

      // Check for violations. On failure, Playwright prints detailed information.
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
