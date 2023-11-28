import { Browser, Page, chromium } from '@playwright/test';
import * as login from './swag-automation/areas/login-page/login'

export const Users = {
    StandardUser: {
      username: 'standard_user',
      password: 'secret_sauce',
    },
    LockedOutUser: {
      username: 'locked_out_user',
      password: 'secret_sauce',
    },
    ProblemUser: {
      username: 'problem_user',
      password: 'secret_sauce',
    },
    PerformanceGlitchUser: {
      username: 'performance_glitch_user',
      password: 'secret_sauce',
    },
    ErrorUser: {
        username: 'error_user',
        password: 'secret_sauce',
    },
    VisualUser: {
        username: 'visual_user',
        password: 'secret_sauce',
    },
  };


export enum URLs {
    baseURL = `https://www.saucedemo.com`,
    inventoryURL = `https://www.saucedemo.com/inventory.html`,
    cartURL = `https://www.saucedemo.com/cart.html`,
}


/**
 * Use this function to open the Swag Labs page and fill the login form with relevant credentials.
 * 
 * @param url - Url of the page we're opening 
 * @param userName - Provide a username for login
 * @param userPasswords - Provide a password for login
 */
export async function loginToSwagLabs(page: Page, url: string, userName: string, userPasswords: string) {
    await page.goto(url);
    await login.inputUserName(page).fill(userName);
    await login.inputPassword(page).fill(userPasswords);
    await login.loginButton(page).click();
} 