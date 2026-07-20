import { test, expect } from "@playwright/test";

test.describe("Search Functionality Verification", () => {
  test.beforeEach(async ({ page }) => {
    // Print browser logs for test runner debugging
    page.on("console", (msg) => console.log("BROWSER LOG:", msg.text()));
    await page.goto("/search");
  });

  test("should load search page, focus input, and render results", async ({ page }) => {
    // 1. Initial State: Empty input, results might be loaded or empty depending on initial load configuration.
    const searchInput = page.locator("#search-input");
    await expect(searchInput).toBeVisible();

    // Focus to trigger index loading
    await searchInput.focus();

    // Wait for search index JSON to be loaded asynchronously
    const statusText = page.locator("#search-status");
    await expect(statusText).toContainText("Search across", { timeout: 10000 });

    // 2. Perform a search query matching a seeded post
    await searchInput.fill("Raft");

    // Wait for the results grid to update
    const resultsContainer = page.locator("#search-results");
    await expect(resultsContainer).toBeVisible();

    // Verify it lists the "Simulating Raft Consensus in Rust" post
    const raftPostLink = page.getByRole("link", { name: /Simulating Raft Consensus/i });
    await expect(raftPostLink).toBeVisible();

    // 3. Search for a query that yields no matches
    await searchInput.fill("nonexistentqueryxyz");

    // Verify status shows 0 matching results
    await expect(statusText).toContainText("Found 0 matching result(s)");

    // Verify results container is empty
    await expect(resultsContainer).toBeEmpty();
  });
});
