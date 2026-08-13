import { test, expect } from "@playwright/test";

test.describe("Core Mindset Carousel", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const carousel = page.getByRole("region", { name: "Core Mindset Principles" });
    await expect(carousel).toBeVisible();
  });

  test("should render all 5 principles as slides", async ({ page }) => {
    const carousel = page.getByRole("region", { name: "Core Mindset Principles" });
    await expect(carousel).toBeVisible();

    const slides = carousel.getByRole("group", { name: /Slide \d of 5/ });
    await expect(slides).toHaveCount(5);
  });

  test("should mark the first slide as active on load", async ({ page }) => {
    const firstSlide = page.getByRole("group", { name: "Slide 1 of 5: Strategy Before Code" });
    await expect(firstSlide).toHaveAttribute("aria-current", "true");
  });

  test("should jump to a slide when clicking a square pagination indicator", async ({ page }) => {
    const squareTab = page.getByRole("tab", {
      name: "Go to slide 4: Evidence Over Assumptions",
    });
    const fourthSlide = page.getByRole("group", {
      name: "Slide 4 of 5: Evidence Over Assumptions",
    });

    await squareTab.click();
    await expect(fourthSlide).toHaveAttribute("aria-current", "true");
  });

  test("should advance slides when clicking adjacent square pagination indicators", async ({
    page,
  }) => {
    const secondTab = page.getByRole("tab", { name: "Go to slide 2: Context Over Memory" });
    const firstSlide = page.getByRole("group", { name: "Slide 1 of 5: Strategy Before Code" });
    const secondSlide = page.getByRole("group", {
      name: "Slide 2 of 5: Context Over Memory",
    });

    await secondTab.click();
    await expect(secondSlide).toHaveAttribute("aria-current", "true");
    await expect(firstSlide).not.toHaveAttribute("aria-current", "true");
  });

  test("should support keyboard navigation with arrow keys", async ({ page, isMobile }) => {
    if (isMobile) return;

    const firstSlide = page.getByRole("group", { name: "Slide 1 of 5: Strategy Before Code" });
    const secondSlide = page.getByRole("group", {
      name: "Slide 2 of 5: Context Over Memory",
    });

    await firstSlide.focus();
    await page.keyboard.press("ArrowRight");
    await expect(secondSlide).toHaveAttribute("aria-current", "true");

    await page.keyboard.press("ArrowLeft");
    await expect(firstSlide).toHaveAttribute("aria-current", "true");
  });

  test("should move the 3D pawn indicator when the active slide changes", async ({ page }) => {
    const pawn = page.getByTestId("mindset-pawn");
    await expect(pawn).toBeVisible();

    const initialLeft = await pawn.evaluate((el) => el.style.left);

    const secondTab = page.getByRole("tab", { name: "Go to slide 2: Context Over Memory" });
    await secondTab.click();

    // Wait for transition to complete
    await page.waitForTimeout(600);

    const newLeft = await pawn.evaluate((el) => el.style.left);
    expect(newLeft).not.toBe(initialLeft);
  });
});
