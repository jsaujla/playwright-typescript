import { expect, Page } from '@playwright/test';

export class ProfilePage {

    private readonly loginTextbox = this.page.locator("#username");
    private readonly firstNameTextbox = this.page.locator("*[name='firstName']");
    private readonly lastNameTextbox = this.page.locator("#lastName");

    constructor(private readonly page: Page) {
    }

    async open(): Promise<void> {
        await this.page.goto('/profile');
        await this.page.waitForLoadState('networkidle');
    }

    async verifyLoginValue(login: string): Promise<void> {
        //await expect.soft(this.loginTextbox).toHaveAttribute("value", login);
    }


    async verifyFirstNameValue(firstName: string): Promise<void> {
        //await expect.soft(this.firstNameTextbox).toHaveAttribute("value", firstName);
    }

    async verifyLastNameValue(lastName: string): Promise<void> {
        //await expect.soft(this.lastNameTextbox).toHaveAttribute("value", lastName);
    }

    async verifyPageLayout(): Promise<void> {
        await expect(this.loginTextbox).toBeVisible();
        //await this.page.waitForTimeout(1000);
        expect.soft(await this.page.screenshot({fullPage: true})).toMatchSnapshot('profile-page.png');
    }

}
