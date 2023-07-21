import { test, Page, BrowserContext } from "@playwright/test";
import { PageManager } from "../../pages/PageManager";
import { LoginApi } from "../../api/LoginApi";
import loginData from "../../test-data/login-data.json";
import loginApiData from "../../test-data-api/login-api-data.json";

let pageContext: BrowserContext;
let page: Page;
let pageManager: PageManager;

test.describe("Login tests", async () => {
  test.beforeEach(async ({ browser }) => {
    pageContext = await browser.newContext();
    page = await pageContext.newPage();
    pageManager = new PageManager(page);
    //await pageManager.getHomePage().open();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("@smoke Verify valid login", async () => {
    await test.step("Login", async () => {
      await pageManager.getHomePage().open();
      await pageManager.getHomePage().login(loginData.valid.username, loginData.valid.password);
    });
    await test.step("Verify login successful", async () => {
      await pageManager.getDashboardPage().verifyUserFirstNameDisplayed(loginData.valid.userFirstName);
    });
  });

  test("Verify logout", async () => {
    await test.step("Login via API", async () => {
      const loginApi = new LoginApi(page);
      await loginApi.login(loginApiData.endpoint, loginApiData.user.logintest);
      await pageManager.getDashboardPage().open();
    });
    await test.step("Logout", async () => {
      await pageManager.getDashboardPage().clickLogout();
    });
    await test.step("Verify logout successful", async () => {
      await pageManager.getHomePage().verifyLoginButtonVisible();
      await pageManager.getDashboardPage().verifyLogoutLinkNotVisible();
    });
  });

  for (const data of loginData.invalid) {
    test(`Verify invalid login ${data.username} ${data.password}`, async () => {
      await test.step("Invalid login", async () => {
        await pageManager.getHomePage().open();
        await pageManager.getHomePage().login(data.username, data.password);
      });
      await test.step("Verify invalid login error message", async () => {
        if (data.errorMessage == "Please fill out this field.") {
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
    });
  }

});
