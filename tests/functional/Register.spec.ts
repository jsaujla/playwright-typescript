import { test } from '@playwright/test';
import { PageManager } from '../../pages/PageManager';
import { faker } from '@faker-js/faker';
import registerData from '../../test-data/register-data.json';

test('@smoke Verify valid registration', async ({ page }) => {
  const pageManager = new PageManager(page);
  await pageManager.getRegisterPage().open();

  const dynamicLoginUserName: string = faker.internet.userName();

  await pageManager.getRegisterPage().register(
    dynamicLoginUserName,
    registerData.valid.firstName,
    registerData.valid.lastName,
    registerData.valid.password,
    registerData.valid.confirmPassword
  );
  await pageManager.getRegisterPage().verifyRegistrationSuccessfulMessageVisible(registerData.valid.notificationMessage);
  await pageManager.getHomePage().login(dynamicLoginUserName, registerData.valid.password);
  await pageManager.getDashboardPage().verifyUserFirstNameDisplayed(registerData.valid.firstName);

  // TODO: Implement soft assertions
  await pageManager.getDashboardPage().clickProfileLink();
  await pageManager.getProfilePage().verifyLoginValue(dynamicLoginUserName);
  await pageManager.getProfilePage().verifyFirstNameValue(registerData.valid.firstName);
  await pageManager.getProfilePage().verifyLastNameValue(registerData.valid.lastName);
});

for(const data of registerData.existingUser) {
  test(`Verify invalid registration with existing user ${data.login} ${data.firstName} ${data.lastName} ${data.password}`, async ({ page }) => {
    const pageManager = new PageManager(page);
    await pageManager.getRegisterPage().open();
    await pageManager.getRegisterPage().register(
      data.login,
      data.firstName,
      data.lastName,
      data.password,
      data.confirmPassword
    );
    await pageManager.getRegisterPage().verifyUserAlreadyExistsErrorMessageDisplayed(data.errorMessage);
  });
};
