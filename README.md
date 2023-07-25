# README #

### About the repository ###
* The repository contains the implementation to demonstrate an effective way to use 'playwright with typescript' to design and develop a web test automation framework. The implementation includes a demonstration of functional, api and visual test automation.
* The website under test is 'buggy.justtestit'

### GitHub Actions (CI) test execution result ###
[![Playwright Tests](https://github.com/jsaujla/playwright-typescript/actions/workflows/playwright.yml/badge.svg)](https://github.com/jsaujla/playwright-typescript/actions/workflows/playwright.yml)

* Access playwright result report online  
  https://jsaujla.github.io/playwright-typescript/

## Local setup ##

### Prerequisite for execution ###
* Node.js installed
* NODE environment variable configured

### Prerequisite for development ###
* Node.js installed
* NODE environment variable configured
* Visual Studio Code installed
* Extension: Playwright Test for VSCode installed

### Technologies used ###
* TypeScript
* Playwright Test

### How do I get set up ###
* Download the repository into system
* Unzip the repository
* Open command prompt
* Go to project directory
* Execute below command to install dependencies
```
npm install
```
* Install Playwright and Playwright Browsers
```
npx playwright install
```

### How to execute tests ###
* Open command prompt
* Go to project directory
* Run Playwright functional tests on Desktop Chrome
```
npx playwright test --project=chromium --grep=functional
```
* Run Playwright functional tests on iPhone 12 Safari
```
npx playwright test --project=chromium --grep=functional
```
* Run Playwright visual tests on Desktop Chrome
```
npx playwright test --project=chromium --grep=visual
```
* Run Playwright tests on Desktop Chrome with headed browser
```
npx playwright test --project=chromium --headed
```
* Run Playwright tests on Desktop Chrome with defined parallel users. Default parallel users are 2
```
npx playwright test --project=chromium --workers=4
```

### Test execution results ###
* Playwright default HTML report 'index.html' will be available under directory 'playwright-report' after test execution finished
  * The screenshot can be seen within the report just below the failed test scenario

### Project packages/structure ###
* Test specifications/scenarios: Refer feature files (packages and classes) under directory '\tests\'
* Page objects: Refer files (packages and classes) under directory '\pages\'
* API actions: Refer files (packages and classes) under directory '\api\'
* UI test data: Refer json files under directory '\tests-data\'
* API/Middleware test data: Refer json files under directory '\tests-data-api\'

### Who do I talk to ###
* For more information contact: Jaspal Aujla at [jaspal.qa@outlook.com](mailto:jaspal.qa@outlook.com) or [jsaujla1@gmail.com](mailto:jsaujla1@gmail.com)