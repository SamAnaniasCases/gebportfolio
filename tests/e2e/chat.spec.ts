import { test, expect, type Page } from "@playwright/test";

async function openChatModal(page: Page) {
  const isMobile = await page.locator("#menu-open").isVisible();
  if (isMobile) {
    const mobileMenu = page.getByRole("navigation", { name: "Mobile navigation" });
    if (!(await mobileMenu.isVisible())) {
      await page.locator("#menu-open").click();
      await expect(mobileMenu).toBeVisible();
    }
    const trigger = page.locator("#mobile-menu button", { hasText: "Live Chat" });
    await expect(trigger).toBeVisible();
    await trigger.click();
  } else {
    const trigger = page.locator("aside button", { hasText: "Live Chat" });
    await expect(trigger).toBeVisible();
    await trigger.click();
  }
}

test.describe("Anonymous Real-Time Chatbox Onboarding & Verification", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should render navigation live chat trigger button", async ({ page }) => {
    const isMobile = await page.locator("#menu-open").isVisible();
    if (isMobile) {
      await page.locator("#menu-open").click();
      const trigger = page.locator("#mobile-menu button", { hasText: "Live Chat" });
      await expect(trigger).toBeVisible();
    } else {
      const trigger = page.locator("aside button", { hasText: "Live Chat" });
      await expect(trigger).toBeVisible();
    }
  });

  test("should require mandatory username onboarding on first visit", async ({ page }) => {
    await openChatModal(page);

    const dialog = page.getByRole("dialog", { name: "Real-time live chat room" });
    await expect(dialog).toBeVisible();

    const onboardingHeading = page.getByRole("heading", {
      name: "Enter Handle to Play Chess & Chat",
    });
    await expect(onboardingHeading).toBeVisible();

    const nameInput = page.getByPlaceholder("e.g. TacticalKnight");
    await expect(nameInput).toBeVisible();

    await nameInput.fill("TacticalTester");
    const joinBtn = page.getByRole("button", { name: "Play & Join Chat ♞" });
    await joinBtn.click();

    // After onboarding, main message input should be visible
    const messageInput = page.getByPlaceholder("say something...");
    await expect(messageInput).toBeVisible();
  });

  test("should persist username in localStorage and bypass onboarding on reload", async ({
    page,
  }) => {
    // Set localStorage display name directly
    await page.evaluate(() => {
      localStorage.setItem("portfolio_chat_display_name_v1", "TacticalTester");
    });
    await page.reload();

    await openChatModal(page);

    const dialog = page.getByRole("dialog", { name: "Real-time live chat room" });
    await expect(dialog).toBeVisible();

    // Onboarding heading should NOT be visible
    const onboardingHeading = page.getByRole("heading", {
      name: "Enter Handle to Play Chess & Chat",
    });
    await expect(onboardingHeading).not.toBeVisible();

    // Main message input should be visible immediately
    const messageInput = page.getByPlaceholder("say something...");
    await expect(messageInput).toBeVisible();
  });

  test("should close chat modal when ESC key is pressed", async ({ page }) => {
    await openChatModal(page);

    const dialog = page.getByRole("dialog", { name: "Real-time live chat room" });
    await expect(dialog).toBeVisible();

    // Wait for modal focus initialization to settle
    const nameInput = page.getByPlaceholder("e.g. TacticalKnight");
    await expect(nameInput).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("should close chat modal when close button is clicked", async ({ page }) => {
    await openChatModal(page);

    const dialog = page.getByRole("dialog", { name: "Real-time live chat room" });
    await expect(dialog).toBeVisible();

    const closeBtn = page.getByRole("button", { name: "Close chat modal" }).first();
    await closeBtn.click();
    await expect(dialog).not.toBeVisible();
  });
});
