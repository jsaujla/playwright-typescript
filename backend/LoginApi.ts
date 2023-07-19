import { expect, Page, request } from '@playwright/test';

export class LoginApi {

  constructor(private readonly page: Page) {
  }

  async login(endpoint: string, loginFormData: { grant_type: string, username: string, password: string }): Promise<void> {
    const loginToken: string = await this.loginViaApi(endpoint, loginFormData);
    await this.addLocalStorage(loginToken);
  }

  private async loginViaApi(endpoint: string, loginFormData: { grant_type: string, username: string, password: string }): Promise<string> {
    const apiBaseUrl = String(process.env.API_BASE_URL);
    const apiLoginUrl: string = apiBaseUrl + endpoint;

    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post(apiLoginUrl,
      {
        //data: loginPayload
        form: loginFormData
      });
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    const loginToken: string = await loginResponseJson.access_token;
    return loginToken;
  }

  private async addLocalStorage(loginToken: string) {
    await this.page.addInitScript((value: string) => {
      window.localStorage.setItem('token', value);
    }, loginToken);
  }

}
