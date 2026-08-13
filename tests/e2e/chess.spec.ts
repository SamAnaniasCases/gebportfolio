import { test, expect, type Page } from "@playwright/test";

async function openChessModal(page: Page) {
  await page.evaluate(() => {
    localStorage.setItem("portfolio_chat_display_name_v1", "ChessTester");
  });
  await page.reload();
  await page.waitForLoadState("load");
  const dialog = page.getByRole("dialog", { name: "Real-time live chat room" });

  await expect(async () => {
    const isMobile = await page.locator("#menu-open").isVisible();
    if (isMobile) {
      const mobileMenu = page.getByRole("navigation", { name: "Mobile navigation" });
      if (!(await mobileMenu.isVisible())) {
        await page.locator("#menu-open").click();
        await expect(mobileMenu).toBeVisible();
      }
      const trigger = page.locator("#mobile-menu button", { hasText: "Live Chat" });
      await trigger.click();
    } else {
      const trigger = page.locator("aside button", { hasText: "Live Chat" });
      await trigger.click();
    }
    await expect(dialog).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 10000 });

  // Switch to chess tab if present
  const chessTabBtn = page.getByRole("button", { name: /Shared Chess/i }).first();
  if (await chessTabBtn.isVisible().catch(() => false)) {
    await chessTabBtn.click().catch(() => {});
  }
}

test.describe("Interactive Chess Game Board E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load 3D/2D chess board and render squares", async ({ page }) => {
    await openChessModal(page);

    await expect(async () => {
      const chessSquare = page.locator('button[title="e2"]').first();
      await expect(chessSquare).toBeVisible();
    }).toPass({ timeout: 10000 });
  });

  test("should maintain piece selection and show floating identification label", async ({
    page,
  }) => {
    await openChessModal(page);

    // Find any pawn square belonging to player's assigned team (White or Black)
    let pawnSquare = page.locator('button[aria-label^="White Pawn"]').first();
    let isSelected = false;

    if (await pawnSquare.isVisible()) {
      await pawnSquare.click();
      const cls = await pawnSquare.getAttribute("class");
      if (cls?.includes("outline")) {
        isSelected = true;
      }
    }

    if (!isSelected) {
      pawnSquare = page.locator('button[aria-label^="Black Pawn"]').first();
      await expect(pawnSquare).toBeVisible();
      await pawnSquare.click();
    }

    const squareName = await pawnSquare.getAttribute("title");
    expect(squareName).toBeTruthy();

    // Verify piece is selected
    await expect(pawnSquare).toHaveClass(/outline/);

    // Verify floating piece label badge appears
    const labelBadge = page.locator(`text=Pawn on ${squareName}`);
    await expect(labelBadge).toBeVisible();
  });

  test("should fetch archive and state endpoints properly", async ({ request }) => {
    const stateRes = await request.get("/api/chess/state");
    expect(stateRes.status()).toBe(200);
    const stateData = await stateRes.json();
    expect(stateData).toHaveProperty("version");
    expect(stateData).toHaveProperty("fen");

    const archiveRes = await request.get("/api/chess/archive");
    expect(archiveRes.status()).toBe(200);
    const archiveData = await archiveRes.json();
    expect(archiveData.ok).toBe(true);
    expect(Array.isArray(archiveData.archives)).toBe(true);
  });
});
