import { Page, expect } from '@playwright/test';

// -------------------------- LOCATORS --------------------------------------

/** Page title/logo  */
export const loginLogoTitle = (page: Page) => page.locator('.login_logo');

export const inputUserName = (page: Page) => page.getByPlaceholder('Username');

/** Password input filed */
export const inputPassword = (page: Page) => page.getByPlaceholder('Password');

/** Login button  */
export const loginButton = (page: Page) => page.locator('[data-test="login-button"]');

// -------------------------- HELPERS --------------------------------------

// -------------------------- ASSERTIONS --------------------------------------

export async function assertLoginPageTitle(page: Page) {
  const titleText = loginLogoTitle(page).textContent();
  await expect(titleText).toContainEqual('Swag Labs');
}
