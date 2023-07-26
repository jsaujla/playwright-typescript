import { expect, Page } from '@playwright/test';

export class DashboardPage {

    private readonly logoutLink = this.page.locator("//a[text()='Logout']");
    private readonly profileLink = this.page.locator("//a[text()='Profile']");
    private readonly userFirstName = (firstName: string) => this.page.locator(`//*[contains(text(),'${firstName}')]`);

    protected constructor(private readonly page: Page) {
    }

    async open(): Promise<void> {
        // this.page.on('request', request => {
        //     console.log(request.url());
        // })
        await this.page.goto('/');
        await this.page.waitForLoadState('networkidle', {timeout: 5000}).catch(() => {});
        await expect(this.page).toHaveTitle("Buggy Cars Rating");
        //this.waitNetwork(10000);
    }
    
    // async waitNetwork(timeout?: number) {
    //     await this.page.waitForLoadState('networkidle', {timeout}).catch(() => {});
    // }

    async verifyUserFirstNameDisplayed(firstName: string): Promise<void> {
        await this.page.waitForTimeout(1000);
        await expect(this.userFirstName(firstName)).toBeVisible();
    }

    async clickProfileLink(): Promise<void> {
        await this.profileLink.click();
    }

    async clickLogout(): Promise<void> {
        await this.logoutLink.click();
    }

    async verifyLogoutLinkNotVisible(): Promise<void> {
        await expect(this.logoutLink).not.toBeVisible();
    }

    async verifyPageLayout(): Promise<void> {
        await expect(this.logoutLink).toBeVisible();
        //await this.page.waitForTimeout(1000);
        await expect.soft(this.page).toHaveScreenshot("dashboard-page.png", {
            mask: [this.page.locator("h3 small").nth(0), this.page.locator("h3 small").nth(1)],
            fullPage: true
        });
    }

}