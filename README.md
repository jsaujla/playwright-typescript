# README #

### About the repository ###
* The repository contains the implementation to demonstrate an effective way to use 'playwright with typescript' to design and develop a web test automation framework. The implementation includes a demonstration of functional, api and visual test automation.
* The website under test is 'buggy.justtestit'

### GitHub Actions (CI) test execution result ###
[![Playwright CI Tests | PROD | Chrome](https://github.com/jsaujla/playwright-typescript/actions/workflows/playwright-prod-chrome.yml/badge.svg?branch=main)](https://github.com/jsaujla/playwright-typescript/actions/workflows/playwright-prod-chrome.yml)  
[![Playwright CI Tests | PROD | Mozilla Firefox](https://github.com/jsaujla/playwright-typescript/actions/workflows/playwright-prod-firefox.yml/badge.svg?branch=main)](https://github.com/jsaujla/playwright-typescript/actions/workflows/playwright-prod-firefox.yml)  
[![Playwright CI Tests | PROD | Safari](https://github.com/jsaujla/playwright-typescript/actions/workflows/playwright-prod-safari.yml/badge.svg?branch=main)](https://github.com/jsaujla/playwright-typescript/actions/workflows/playwright-prod-safari.yml)  
[![Playwright CI Tests | PROD | iPhone12 Safari](https://github.com/jsaujla/playwright-typescript/actions/workflows/playwright-prod-iphone12-safari.yml/badge.svg?branch=main)](https://github.com/jsaujla/playwright-typescript/actions/workflows/playwright-prod-iphone12-safari.yml)  
[![Playwright CI Tests | PROD | Galaxy S8 Chrome](https://github.com/jsaujla/playwright-typescript/actions/workflows/playwright-prod-galaxys8-chrome.yml/badge.svg?branch=main)](https://github.com/jsaujla/playwright-typescript/actions/workflows/playwright-prod-galaxys8-chrome.yml)  

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
npx playwright test --project=iphone12-safari --grep=functional
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
* Page objects: Refer files (packages and classes) under directory '\pages\'
* API/Middleware actions: Refer files (packages and classes) under directory '\api\'
* UI test data: Refer json files under directory '\tests-data\'
* API/Middleware test data: Refer json files under directory '\tests-data-api\'

### Who do I talk to ###
* For more information contact: Jaspal Aujla at [jaspal.qa@outlook.com](mailto:jaspal.qa@outlook.com) or [jsaujla1@gmail.com](mailto:jsaujla1@gmail.com)