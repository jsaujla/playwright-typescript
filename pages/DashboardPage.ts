import { expect, Page } from "@playwright/test";

export class DashboardPage {

  private readonly logoutLink = this.page.locator("a:has-text('Logout')");
  private readonly profileLink = this.page.locator("a:has-text('Profile')");
  private readonly userFirstName = (firstName: string) => this.page.locator(`//*[contains(text(),'${firstName}')]`);

  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto("/");
    await expect(this.page).toHaveTitle("Buggy Cars Rating");
  }

  async verifyUserFirstNameDisplayed(firstName: string) {
    await this.page.waitForTimeout(1000);
    await expect(this.userFirstName(firstName)).toBeVisible();
  }

  async clickProfileLink() {
    await this.profileLink.click();
  }

  async clickLogout() {
    await this.logoutLink.click();
  }

  async verifyLogoutLinkNotVisible() {
    await expect(this.logoutLink).not.toBeVisible();
  }

  async verifyPageLayout(): Promise<void> {
    await expect(this.logoutLink).toBeVisible();
    await this.page.waitForTimeout(1000);
    await expect.soft(this.page).toHaveScreenshot("dashboard-page.png", {
      mask: [this.page.locator("h3 small").nth(0), this.page.locator("h3 small").nth(1)],
      fullPage: true,
    });
  }
  
}
