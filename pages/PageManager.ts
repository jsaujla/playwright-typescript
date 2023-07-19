import { Page } from '@playwright/test';
import { HomePage } from './HomePage';
import { DashboardPage } from './DashboardPage';
import { ProfilePage } from './ProfilePage';
import { RegisterPage } from './RegisterPage';

export class PageManager {
    private homePage: HomePage;
    private dashboardPage: DashboardPage;
    private profilePage: ProfilePage;
    private registerPage: RegisterPage;

    constructor(private readonly page: Page) {
    }

    getHomePage() {
        return (this.homePage ??= new HomePage(this.page));
    }

    getDashboardPage() {
        return (this.dashboardPage ??= new DashboardPage(this.page));
    }

    getProfilePage() {
        return (this.profilePage ??= new ProfilePage(this.page));
    }

    getRegisterPage() {
        return (this.registerPage ??= new RegisterPage(this.page));
    }

    // getDashboardPage() {
    //     if(!this.dashboardPage) {
    //         this.dashboardPage = new DashboardPage(this.page);
    //     }
    //     return this.dashboardPage;
    // }

}