import { test, expect } from "@playwright/test";

async function openTopic(page, id) {
  await page.goto(`/#${id}`);
  await expect(page.locator("#detail-dialog")).toBeVisible();
}

test("search supports Vietnamese without diacritics", async ({ page }) => {
  await page.goto("/");

  await page.locator("#search-input").fill("can giua");

  await expect(page.locator("#result-summary")).toContainText("1 kết quả");
  await expect(page.locator(".cheat-card")).toHaveCount(1);
  await expect(page.locator(".card-title")).toHaveText("display: flex");
});

test("language filters return the expected catalog counts", async ({ page }) => {
  await page.goto("/");

  await page.locator('.filter-button[data-language="html"]').click();
  await expect(page.locator(".cheat-card")).toHaveCount(2);

  await page.locator('.filter-button[data-language="css"]').click();
  await expect(page.locator(".cheat-card")).toHaveCount(3);

  await page.locator('.filter-button[data-language="javascript"]').click();
  await expect(page.locator(".cheat-card")).toHaveCount(2);
});

test("topic dialog opens from a card and closes cleanly", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Mở ví dụ display: flex" }).click();
  await expect(page.locator("#detail-dialog")).toBeVisible();
  await expect(page.locator("#detail-title")).toHaveText("display: flex");
  await expect(page).toHaveURL(/#css-flexbox$/);

  await page.locator("#close-dialog").click();
  await expect(page.locator("#detail-dialog")).not.toBeVisible();
  await expect(page).not.toHaveURL(/#css-flexbox$/);
});

test("direct hash URL opens the requested topic", async ({ page }) => {
  await openTopic(page, "js-dom-click-event");

  await expect(page.locator("#detail-title")).toHaveText("querySelector + click");
  await expect(page.locator("#detail-language")).toHaveText("JAVASCRIPT");
});

test("editor tabs switch between HTML CSS and JavaScript", async ({ page }) => {
  await openTopic(page, "css-display");

  const htmlTab = page.locator('[role="tab"][data-editor="html"]');
  const cssTab = page.locator('[role="tab"][data-editor="css"]');
  const jsTab = page.locator('[role="tab"][data-editor="javascript"]');

  await expect(cssTab).toHaveAttribute("aria-selected", "true");

  await htmlTab.click();
  await expect(htmlTab).toHaveAttribute("aria-selected", "true");
  await expect(page.locator('[data-code-shell="html"]')).toBeVisible();

  await jsTab.click();
  await expect(jsTab).toHaveAttribute("aria-selected", "true");
  await expect(page.locator('[data-code-shell="javascript"]')).toBeVisible();
});

test("editing CSS updates preview and reset restores the original value", async ({ page }) => {
  await openTopic(page, "css-display");

  const cssEditor = page.locator('[data-code-editor="css"]');
  const originalCss = await cssEditor.inputValue();
  expect(originalCss).toContain("display: block;");

  await cssEditor.fill(originalCss.replace("display: block;", "display: inline-block;"));
  await page.locator("#run-code").click();

  const previewItem = page.frameLocator("#preview-frame").locator(".item").first();
  await expect.poll(() => previewItem.evaluate((element) => getComputedStyle(element).display)).toBe("inline-block");

  await page.locator("#reset-code").click();
  await expect.poll(() => previewItem.evaluate((element) => getComputedStyle(element).display)).toBe("block");
});

test("JavaScript errors are surfaced inside the sandbox preview", async ({ page }) => {
  await openTopic(page, "js-dom-click-event");

  await page.locator('[role="tab"][data-editor="javascript"]').click();
  await page.locator('[data-code-editor="javascript"]').fill('throw new Error("E2E boom");');
  await page.locator("#run-code").click();

  const errorBox = page.frameLocator("#preview-frame").locator("#webblocks-error");
  await expect(errorBox).toBeVisible();
  await expect(errorBox).toContainText("E2E boom");
  await expect(page.locator("#action-status")).toContainText("Preview có lỗi JavaScript");
});

test("mobile layout keeps catalog and full-screen dialog usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(page.locator("#search-input")).toBeVisible();
  await expect(page.locator(".cheat-card").first()).toBeVisible();

  await page.getByRole("button", { name: "Mở ví dụ h1 → h6 và p" }).click();
  const dialog = page.locator("#detail-dialog");
  await expect(dialog).toBeVisible();

  const box = await dialog.boundingBox();
  expect(box).not.toBeNull();
  expect(box.width).toBeLessThanOrEqual(390);
  expect(box.width).toBeGreaterThan(360);
});
