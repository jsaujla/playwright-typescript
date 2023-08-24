import { expect, Page } from "@playwright/test";

export class HomePage {
    
  private readonly loginTextbox = this.page.locator("input[name='login']");
  private readonly passwordTextbox = this.page.locator("input[name='password']").nth(0);
  private readonly loginButton = this.page.locator("button[type='submit']").nth(0);
  private readonly invalidLoginErrorMessage = (errorMessage: string) => this.page.locator(`//*[contains(text(),'${errorMessage}')]`);

  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto("/");
    await expect(this.page).toHaveTitle("Buggy Cars Rating");
  }

  async login(username: string, password: string) {
    await this.loginTextbox.fill(username);
    await this.passwordTextbox.fill(password);
    await Promise.all([this.page.waitForLoadState("domcontentloaded"), this.loginButton.click()]);
  }

  async verifyInvalidLoginErrorMessageVisible(errorMessage: string) {
    await expect(this.invalidLoginErrorMessage(errorMessage)).toBeVisible();
  }

  async verifyLoginButtonVisible() {
    await expect(this.loginButton).toBeVisible();
  }

  async verifyPageLayout() {
    await expect(this.loginTextbox).toBeVisible();
    await this.page.waitForTimeout(1000);
    await expect.soft(this.page).toHaveScreenshot("home-page.png", {
      mask: [this.page.locator("h3 small").nth(0), this.page.locator("h3 small").nth(1)],
      fullPage: true,
    });
  }
}
