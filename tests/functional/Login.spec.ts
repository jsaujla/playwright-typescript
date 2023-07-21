import { test, Page, BrowserContext } from '@playwright/test';
import { PageManager } from '../../pages/PageManager';
import { LoginApi } from '../../api/LoginApi';
import loginData from '../../test-data/login-data.json';
import loginApiData from '../../test-data-api/login-api-data.json'

let pageContext: BrowserContext;
let page: Page;
let pageManager: PageManager;

// test.beforeAll( async ({ browser }) => {
// });

// test.afterAll(async () => {
//   await page.close();
// });

test.beforeEach( async ({ browser }) => {
  pageContext = await browser.newContext();
  page = await pageContext.newPage();
  pageManager = new PageManager(page);
  //await pageManager.getHomePage().open();
});

test.afterEach(async () => {
  await page.close();
});

test('@smoke Verify valid login', async () => {
  await pageManager.getHomePage().open();
  await pageManager.getHomePage().login(loginData.valid.username, loginData.valid.password);
  await pageManager.getDashboardPage().verifyUserFirstNameDisplayed(loginData.valid.userFirstName);
});

test('Verify logout', async () => {
  const loginApi = new LoginApi(page);
  await loginApi.login(loginApiData.endpoint, loginApiData.user.logintest);

  await pageManager.getDashboardPage().open();
  await pageManager.getDashboardPage().clickLogout();
  await pageManager.getHomePage().verifyLoginButtonVisible();
  await pageManager.getDashboardPage().verifyLogoutLinkNotVisible();
});

for(const data of loginData.invalid) {
  test(`Verify invalid login ${data.username} ${data.password}`, async () => {
    await pageManager.getHomePage().open();
    await pageManager.getHomePage().login(data.username, data.password);
    if(data.errorMessage == "Please fill out this field.") {
      // TODO: Implementation to verify error message visibility
      // Currently, not implemented code to verify error message because it can't be found in the DOM
      // For the time being, relying on a check 'i_am_still_on_Home_page' in this case

      // Added 1 second wait to complete the navigation. If any case user moved to new page (in negative case)
      await page.waitForTimeout(1000);

    } else {
      await pageManager.getHomePage().verifyInvalidLoginErrorMessageVisible(data.errorMessage);
    }

    await pageManager.getHomePage().verifyLoginButtonVisible();
  });
};

