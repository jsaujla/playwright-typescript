import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";
import { DashboardPage } from "./DashboardPage";
import { ProfilePage } from "./ProfilePage";
import { RegisterPage } from "./RegisterPage";

export class PageManager {
    
  private _homePage: HomePage;
  private _dashboardPage: DashboardPage;
  private _profilePage: ProfilePage;
  private _registerPage: RegisterPage;

  constructor(private readonly page: Page) {}

  get homePage(): HomePage {
    return (this._homePage ??= new HomePage(this.page));
  }

  get dashboardPage(): DashboardPage {
    return (this._dashboardPage ??= new DashboardPage(this.page));
  }

  get profilePage(): ProfilePage {
    return (this._profilePage ??= new ProfilePage(this.page));
  }

  get registerPage(): RegisterPage {
    return (this._registerPage ??= new RegisterPage(this.page));
  }
}
