import { test, expect } from '@playwright/test';
import { PageManager } from '../../pages/PageManager';
import { LoginApi } from '../../api/LoginApi';
import loginData from '../../test-data/login-data.json';
import loginApiData from '../../test-data-api/login-api-data.json'

test('Verify register page layout', async ({ page }) => {
  const pageManager = new PageManager(page);
  await pageManager.registerPage.open();
  await pageManager.registerPage.verifyPageLayout();  
});

test('Verify home page layout', async ({ page }) => {
  const pageManager = new PageManager(page);
  await pageManager.homePage.open();
  await pageManager.homePage.verifyPageLayout();  
});

test('Verify dashboard page layout', async ({ page }) => {
  const pageManager = new PageManager(page);
  await pageManager.homePage.open();
  await pageManager.homePage.login(loginData.valid.username, loginData.valid.password);
  await pageManager.dashboardPage.verifyPageLayout();
});

test('Verify profile page layout', async ({ page }) => {
  const pageManager = new PageManager(page);
  await pageManager.homePage.open();
  await pageManager.homePage.login(loginData.valid.username, loginData.valid.password);
  await pageManager.dashboardPage.clickProfileLink();
  await pageManager.profilePage.verifyPageLayout();
});