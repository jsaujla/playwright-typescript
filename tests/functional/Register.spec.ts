import { test, Page, BrowserContext } from "@playwright/test";
import { PageManager } from "../../pages/PageManager";
import { faker } from "@faker-js/faker";
import registerData from "../../test-data/register-data.json";

let pageContext: BrowserContext;
let page: Page;
let pageManager: PageManager;

test.describe("Register tests", async () => {
  test.beforeEach(async ({ browser }) => {
    pageContext = await browser.newContext();
    page = await pageContext.newPage();
    pageManager = new PageManager(page);
    //await pageManager.getRegisterPage().open();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("Verify valid registration @smoke", async () => {
    let dynamicLoginUserName: string;
    await test.step("Register", async () => {
      await pageManager.registerPage.open();
      dynamicLoginUserName = faker.internet.userName();
      await pageManager.registerPage.register(
        dynamicLoginUserName,
        registerData.valid.firstName,
        registerData.valid.lastName,
        registerData.valid.password,
        registerData.valid.confirmPassword
      );
    });
    await test.step("Verify register successful", async () => {
      await pageManager.registerPage.verifyRegistrationSuccessfulMessageVisible(registerData.valid.notificationMessage);
    });
    await test.step("Login with registered user", async () => {
      await pageManager.homePage.login(dynamicLoginUserName, registerData.valid.password);
      await pageManager.dashboardPage.verifyUserFirstNameDisplayed(registerData.valid.firstName);
    });
    await test.step("Verify user information under profile page", async () => {
      // TODO: Implement soft assertions
      await pageManager.dashboardPage.clickProfileLink();
      await pageManager.profilePage.verifyLoginValue(dynamicLoginUserName);
      await pageManager.profilePage.verifyFirstNameValue(registerData.valid.firstName);
      await pageManager.profilePage.verifyLastNameValue(registerData.valid.lastName);
    });
  });

  for (const data of registerData.existingUser) {
    test(`Verify invalid registration with existing user ${data.login} ${data.firstName} ${data.lastName} ${data.password}`, async () => {
      await test.step("Invalid register", async () => {
        await pageManager.registerPage.open();
        await pageManager.registerPage.register(
          data.login,
          data.firstName,
          data.lastName,
          data.password,
          data.confirmPassword
        );
      });
      await test.step("Verify invalid register error message", async () => {
        await pageManager.registerPage.verifyUserAlreadyExistsErrorMessageDisplayed(data.errorMessage);
      });
    });
  }

});
