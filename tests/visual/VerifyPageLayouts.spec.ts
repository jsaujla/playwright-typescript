import { test, expect } from '@playwright/test';
import { PageManager } from '../../pages/PageManager';
import { LoginApi } from '../../backend/LoginApi';
import loginData from '../../test-data/login-data.json';
import loginApiData from '../../test-data-api/login-api-data.json'

test('@visual Verify register page layout', async ({ page }) => {
  const pageManager = new PageManager(page);
  await pageManager.getRegisterPage().open();
  await pageManager.getRegisterPage().verifyPageLayout();  
});

test('@visual Verify home page layout', async ({ page }) => {
  const pageManager = new PageManager(page);
  await pageManager.getHomePage().open();
  await pageManager.getHomePage().verifyPageLayout();  
});

test('@visual Verify dashboard page layout', async ({ page }) => {
  const pageManager = new PageManager(page);
  await pageManager.getHomePage().open();
  await pageManager.getHomePage().login(loginData.valid.username, loginData.valid.password);
  await pageManager.getDashboardPage().verifyPageLayout();
});

test('@visual Verify profile page layout', async ({ page }) => {
  const pageManager = new PageManager(page);
  await pageManager.getHomePage().open();
  await pageManager.getHomePage().login(loginData.valid.username, loginData.valid.password);
  await pageManager.getDashboardPage().clickProfileLink();
  await pageManager.getProfilePage().verifyPageLayout();
});