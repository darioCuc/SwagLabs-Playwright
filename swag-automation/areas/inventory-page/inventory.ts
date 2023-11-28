import { Page, expect } from '@playwright/test';

export enum SortingBy {
  NameAZ = 'az',
  NameZA = 'za',
  PriceLowToHigh = 'lohi',
  PriceHighToLow = 'hilo',
}

// -------------------------- LOCATORS --------------------------------------

/** Page title/logo  */
export const pageTitle = (page: Page) => page.locator('.app_logo');

/** Shopping cart icon */
export const shoppingCartIcon = (page: Page) => page.locator('#shopping_cart_container a');

/** Top bar menu Button  */
export const menuButton = (page: Page) => page.getByRole('button', { name: 'Open Menu' });

/** Close menu button  */
export const closeMenuButton = (page: Page) => page.getByRole('button', { name: 'Close Menu' });

/** Sorting dropdown  */
export const sortingDropdown = (page: Page) => page.locator('[data-test="product_sort_container"]');

/** Inventory list where products are displayed */
export const inventoryList = (page: Page) => page.locator('.inventory_list');

// -------------------------- HELPERS --------------------------------------

export async function getInventoryListItemCount(page: Page) {
  const numOfVisibleInventoryItems = await inventoryList(page).locator('.inventory_item').count();
  return numOfVisibleInventoryItems;
}

/**
 * Use this function to find the wanted inventory item and click on the "Add to Cart" button of that inventory item
 *
 * @param itemName - Full title name of the wanted item
 *
 */
export async function addInventoryItemToCart(page: Page, itemName: string) {
  const itemNameFormatted = itemName.replace(/\s+/g, '-').toLowerCase();
  const addToCartItemLocator = inventoryList(page).locator(`[data-test="add-to-cart-${itemNameFormatted}"]`);
  await addToCartItemLocator.click();
}

export async function openCartpage(page: Page) {
  await shoppingCartIcon(page).click();
}

export async function sortItemsBy(page: Page, sortBy: SortingBy){
  await sortingDropdown(page).selectOption(sortBy);
}

// -------------------------- ASSERTIONS --------------------------------------

// Asserts the inventory page title
export async function assertInventoryPageTitle(page: Page) {
  const titleText = await pageTitle(page).textContent();
  await expect(titleText).toContain('Swag Labs');
}

// Asserts the inventory items count
export async function assertInventoryItemsCount(page: Page, expectedNumberOfItems: number) {
  const numOfPresentItems = await getInventoryListItemCount(page);
  await expect(numOfPresentItems).toEqual(expectedNumberOfItems);
}

// Asserts the sorting for Price Low to High
async function assertPriceLowToHigh(page: Page) {
  const priceLocators = inventoryList(page).locator('.inventory_item_price');
  const itemTexts = await priceLocators.allTextContents();
  const items = itemTexts.map(text => parseFloat(text.replace('$', '')));
  for (let i = 0; i < items.length - 1; i++) {
    expect(items[i]).toBeLessThanOrEqual(items[i + 1]);
  }
}

// Asserts the sorting for Price High to Low
async function assertPriceHighToLow(page: Page) {
  const priceLocators = inventoryList(page).locator('.inventory_item_price');
  const itemTexts = await priceLocators.allTextContents();
  const items = itemTexts.map(text => parseFloat(text.replace('$', '')));
  for (let i = 0; i < items.length - 1; i++) {
    expect(items[i]).toBeGreaterThanOrEqual(items[i + 1]);
  }
}

// Asserts the sorting for Name A to Z
async function assertNameAZ(page: Page) {
  const nameLocators = inventoryList(page).locator('.inventory_item_name');
  const itemTexts = await nameLocators.allTextContents();
  const items = itemTexts.map(text => text.toLowerCase());
  for (let i = 0; i < items.length - 1; i++) {
    expect(items[i].localeCompare(items[i + 1])).toBeLessThanOrEqual(0);
  }
}

// Asserts the sorting for Name Z to A
async function assertNameZA(page: Page) {
  const nameLocators = inventoryList(page).locator('.inventory_item_name');
  const itemTexts = await nameLocators.allTextContents();
  const items = itemTexts.map(text => text.toLowerCase());
  for (let i = 0; i < items.length - 1; i++) {
    expect(items[i].localeCompare(items[i + 1])).toBeGreaterThanOrEqual(0);
  }
}

// The original assertSorting function can now decide which function to call
export async function assertSorting(page: Page, sortBy: SortingBy) {
  await inventoryList(page).waitFor();

  if (sortBy === SortingBy.PriceLowToHigh) {
    await assertPriceLowToHigh(page);
  } else if (sortBy === SortingBy.PriceHighToLow) {
    await assertPriceHighToLow(page);
  } else if (sortBy === SortingBy.NameAZ) {
    await assertNameAZ(page);
  } else if (sortBy === SortingBy.NameZA) {
    await assertNameZA(page);
  }
}


