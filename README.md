# automation-takehome-project

Project for candidates to complete as a hiring assessment.

## Instructions

1. Fork repo to your own project.
2. Send link to the forked repo by the provided due date.

## Project Requirements

The objective is to build an automation application, meaning a program that performs a manual workflow in a repeatable manner. It must meet the following requirements:

1. Use Node.js, Typescript, and the [Playwright](https://playwright.dev/) library. **IMPORTANT: Playwright should be used to facilitate the web automation, not for testing purposes.**
2. Navigate to https://amazon.com
3. Finds the three lowest prices for any given search term
4. Write these products' to a CSV locally where each row contains product, price, search term, and link to the product's page.
5. The design should be generalized enough so that the framework can be applied to another e-commerce site with relative ease and minimal re-work.
6. Should utilize Typescript features where helpful.
7. Should run successfully during the review session.
8. Focus on maintainability and scalability.

### Extra Credit

1. Introduce a set of tests around the project

### How to run the application

1. Make sure the inputs are provided under src/input.ts file
WEBSITE = 'amazon';
SEARCHTERM = 'Nike';
NUMBER_OF_ITEMS = 3;

2. Install dependencies using **npm install**

3. Then run command **npm run build** to generate build files under dist folder

4. Once built, then run command **npm run generateCSV** to run the application

5. Once the command run successfully, the CSV file will be generated in download folder *For eg. Amazon_2023-06-08T20:02:26.650Z.csv*
