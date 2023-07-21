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

  test("@smoke Verify valid registration", async () => {
    let dynamicLoginUserName: string;
    await test.step("Register", async () => {
      await pageManager.getRegisterPage().open();
      dynamicLoginUserName = faker.internet.userName();
      await pageManager.getRegisterPage().register(
        dynamicLoginUserName,
        registerData.valid.firstName,
        registerData.valid.lastName,
        registerData.valid.password,
        registerData.valid.confirmPassword
      );
    });
    await test.step("Verify register successful", async () => {
      await pageManager.getRegisterPage().verifyRegistrationSuccessfulMessageVisible(registerData.valid.notificationMessage);
    });
    await test.step("Login with registered user", async () => {
      await pageManager.getHomePage().login(dynamicLoginUserName, registerData.valid.password);
      await pageManager.getDashboardPage().verifyUserFirstNameDisplayed(registerData.valid.firstName);
    });
    await test.step("Verify user information under profile page", async () => {
      // TODO: Implement soft assertions
      await pageManager.getDashboardPage().clickProfileLink();
      await pageManager.getProfilePage().verifyLoginValue(dynamicLoginUserName);
      await pageManager.getProfilePage().verifyFirstNameValue(registerData.valid.firstName);
      await pageManager.getProfilePage().verifyLastNameValue(registerData.valid.lastName);
    });
  });

  for (const data of registerData.existingUser) {
    test(`Verify invalid registration with existing user ${data.login} ${data.firstName} ${data.lastName} ${data.password}`, async () => {
      await test.step("Invalid register", async () => {
        await pageManager.getRegisterPage().open();
        await pageManager.getRegisterPage().register(
          data.login,
          data.firstName,
          data.lastName,
          data.password,
          data.confirmPassword
        );
      });
      await test.step("Verify invalid register error message", async () => {
        await pageManager.getRegisterPage().verifyUserAlreadyExistsErrorMessageDisplayed(data.errorMessage);
      });
    });
  }

});
