import { expect, Page } from '@playwright/test';

export class RegisterPage {

    private readonly loginTextbox = this.page.locator("#username");
    private readonly firstNameTextbox = this.page.locator("*[name='firstName']");
    private readonly lastNameTextbox = this.page.locator("#lastName");
    private readonly passwordTextbox = this.page.locator("#password");
    private readonly confirmPasswordTextbox = this.page.locator("#confirmPassword");
    private readonly registerButton = this.page.locator("//button[text()='Register']");
    private readonly registrationSuccessfulMessage = (message: string) => this.page.locator(`//*[contains(text(),'${message}')]`);
    private readonly userAlreadyExistsErrorMessage = (errorMessage: string) => this.page.locator(`//*[contains(text(),'${errorMessage}')]`);

    constructor(private readonly page: Page) {}

    async open(): Promise<void> {
        await this.page.goto('/register');
    }

    async register(login: string, firstName: string, lastName: string, password: string, confirmPassword: string): Promise<void> {
        await this.loginTextbox.fill(login);
        await this.firstNameTextbox.fill(firstName);
        await this.lastNameTextbox.fill(lastName);
        await this.passwordTextbox.fill(password);
        await this.confirmPasswordTextbox.fill(confirmPassword);
        await this.registerButton.click();
    }

    async verifyRegistrationSuccessfulMessageVisible(message: string): Promise<void> {
        await expect(this.registrationSuccessfulMessage(message)).toBeVisible();
    }

    async verifyUserAlreadyExistsErrorMessageDisplayed(errorMessage: string): Promise<void> {
        await expect(this.userAlreadyExistsErrorMessage(errorMessage)).toBeVisible();
    }

    async verifyPageLayout(): Promise<void> {
        await expect(this.loginTextbox).toBeVisible();
        expect.soft(await this.page.screenshot({fullPage: true})).toMatchSnapshot('register-page.png');
    }

}
