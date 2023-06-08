import { test, expect, Page } from '@playwright/test';
import { helper, website } from '../helpers/helpers';
import { scrapeData } from '../src/index'

export async function homepage( page: Page ) {
    await page.goto(helper[0].url);
}

test.beforeEach(async ({ page }) => {
    await homepage(page);
});

test('check Amazon URL', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Amazon/);
});

test.skip('Make sure all selectors are visible', async ({ page }) => {
    await expect(page.locator(helper[0].selectors.searchInput)).toBeVisible();
    await expect(page.locator(helper[0].selectors.searchIcon)).toBeVisible();
});

test.skip('Check records are returned', async ({ page }) => {
    const records = await scrapeData('Nike',website.amazon,3);
    expect(records).toHaveLength(3);
});   