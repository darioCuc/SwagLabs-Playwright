import { test, expect } from '@playwright/test';
import { loginToSwagLabs, Users, URLs } from '../../../testHelper';
import * as inventory from '../inventory-page/inventory';

test.describe('Login tests', () => {
  test('Verify the standard user can log in ', async ({ page }) => {
    await loginToSwagLabs(page, URLs.baseURL, Users.StandardUser.username, Users.StandardUser.password);
    await expect(page).toHaveURL(URLs.inventoryURL);
  });

  test.skip('Check login with locked out user', async ({ page }) => {
    await loginToSwagLabs(page, URLs.baseURL, Users.LockedOutUser.username, Users.LockedOutUser.password);
  });

  test.skip('Check login with problem user', async ({ page }) => {
    await loginToSwagLabs(page, URLs.baseURL, Users.ProblemUser.username, Users.ProblemUser.password);
  });

  test.skip('Check login with performance glitch user', async ({ page }) => {
    await loginToSwagLabs(page, URLs.baseURL, Users.PerformanceGlitchUser.username, Users.PerformanceGlitchUser.password);
  });

  test.skip('Check login with error user', async ({ page }) => {
    await loginToSwagLabs(page, URLs.baseURL, Users.ErrorUser.username, Users.ErrorUser.password);
  });

  test.skip('Check login with visual user', async ({ page }) => {
    await loginToSwagLabs(page, URLs.baseURL, Users.VisualUser.username, Users.VisualUser.password);
  });
});
