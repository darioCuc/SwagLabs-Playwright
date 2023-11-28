import { Page, expect } from '@playwright/test';
import { URLs } from '../../../testHelper';

// -------------------------- LOCATORS --------------------------------------

/** Page title  */
export const cartTitle = (page: Page) => page.locator('.title');

// -------------------------- HELPERS --------------------------------------

// -------------------------- ASSERTIONS --------------------------------------

export async function assertItemIsVisible(page: Page, itemName: string) {
  await expect(page).toHaveURL(URLs.cartURL);
  await assertPageTitle(page);
  await expect(page.getByRole('link', { name: itemName })).toBeVisible();
}

export async function assertPageTitle(page: Page) {
    const title = await cartTitle(page).textContent();
    expect(cartTitle(page)).toContainText('Your Cart');
}