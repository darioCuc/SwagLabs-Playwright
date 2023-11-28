import { test, expect } from '@playwright/test';
import { loginToSwagLabs, Users, URLs } from '../../../testHelper';
import * as inventory from './inventory';
import * as cart from '../cart-page/cart';

test.describe('Inventory tests', () => {
  test('Verify you can add an item to the cart and that it’s visible on the cart page.', async ({ page }) => {
    const itemName = 'Sauce Labs Backpack';
    await loginToSwagLabs(page, URLs.baseURL, Users.StandardUser.username, Users.StandardUser.password);
    await inventory.assertInventoryPageTitle(page);

    await inventory.addInventoryItemToCart(page, itemName);
    await inventory.openCartpage(page);
    await cart.assertItemIsVisible(page, itemName);
  });

  test('Verify that, by default, the inventory page lists 6 items.', async ({ page }) => {
    await loginToSwagLabs(page, URLs.baseURL, Users.StandardUser.username, Users.StandardUser.password);
    await inventory.assertInventoryItemsCount(page, 6);
  });

  test('Verify you can sort the inventory items by price, high-to-low, and the sorting is correct.', async ({
    page,
  }) => {
    await loginToSwagLabs(page, URLs.baseURL, Users.StandardUser.username, Users.StandardUser.password);
    await inventory.sortItemsBy(page, inventory.SortingBy.PriceHighToLow);
    await inventory.assertSorting(page, inventory.SortingBy.PriceHighToLow);
  });

  test('Ensure you can sort the inventory by name, Z-to-A, and the sorting is correct.', async ({ page }) => {
    await loginToSwagLabs(page, URLs.baseURL, Users.StandardUser.username, Users.StandardUser.password);
    await inventory.sortItemsBy(page, inventory.SortingBy.NameZA);
    await inventory.assertSorting(page, inventory.SortingBy.NameZA);
  });
});
