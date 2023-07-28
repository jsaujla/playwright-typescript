import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
//require('dotenv').config();
const env = process.env.ENV || 'qa';
//  require('dovenv').config({
//    path: path.resolve(__dirname, `.env.${env}`)
//  });
dotenv.config({
  path: path.resolve(__dirname, `.env.${env}`)
})

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  // reporter: process.env.CI ? [['html'], ['list'], ['line'], ['junit', { outputFile: 'results.xml' }]] : [
  //   ['html']
  //   ['list'],
  //   ['line'],
  //   ['allure-playwright', {
  //     detail: true,
  //     outputFolder: 'allure-results',
  //     suiteTitle: false,
  //   }]
  // ]
  reporter: [
    ['html'],
    ['list'],
    ['line'],
    ['junit', { outputFile: 'test-results/junit-results.xml' }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
    }]
  ],
  //timeout: 60 * 1000,
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://buggy.justtestit.org',
    //baseURL: process.env.WEB_BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',

    //ignoreHTTPSErrors: true,
    //permissions: ['geolocation'],
    headless: true,
    screenshot: 'only-on-failure',
    //video: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    {
      name: 'galaxys8-chrome',
      use: { ...devices['Galaxy S8'] },
    },

    {
      name: 'iphone12-safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 5000,

    toHaveScreenshot: {
      // An acceptable amount of pixels that could be different, unset by default.
      //maxDiffPixels: 10,
    },

    toMatchSnapshot: {
      // An acceptable ratio of pixels that are different to the total amount of pixels, between 0 and 1.
      maxDiffPixelRatio: 0.1,
    },
  },

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
