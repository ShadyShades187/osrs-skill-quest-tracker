# Old School RuneScape Skills & Quests Tracker

Created by Nathaniel Rodriguez for CS 319 - Fundamentals of Software Engineering.

## Project Description

This application is designed to help Old School RuneScape players track their account progression through skills and quests.

For Sprint 1, the application allowed users to view all 24 OSRS skills, update their current levels and XP, set target levels, and calculate how much XP they need to reach the next level.

Sprint 2 adds skill sorting and XP-to-target calculations. Users can now sort their skills by level and see how much XP they need to reach their target levels.

Users can also save their progress and return to it later.

## Technologies Used

- HTML
- CSS
- JavaScript
- Browser Local Storage
- Node.js and Vitest for automated testing

## Requirements

- A computer with a modern web browser
- No additional software is required to run the application
- Node.js and npm are required to run the automated tests

## How to Run

1. Download the project files from GitHub.
2. Extract the downloaded ZIP file.
3. Open the project folder.
4. Double-click index.html to open the application in a browser.

## How to Use

1. Find the skill you want to update.
2. Enter your current skill level and XP.
3. Enter a target level.
4. View the XP needed to reach the next level and your target level.
5. Use the Sort Skills dropdown to sort by lowest level, highest level, or default order.
6. Click Save Progress to save your information.
7. Reopen the application in the same browser to view your saved progress.

## Automated Testing

Sprint 2 includes automated tests using Vitest.

To run the tests:

1. Install Node.js if it is not already installed.
2. Open a terminal in the main project folder.
3. Install the testing dependencies:

   npm.cmd install

4. Run the tests:

   npm.cmd test

The Tests folder contains two test files:

- sortLogic.test.mjs tests skill sorting, default order, invalid sorting options, and preservation of the original data.
- xpTargetLogic.test.mjs tests XP calculations, completed targets, invalid inputs, and the level 99 XP requirement.

## SOLID Principles

Sprint 2 applies two SOLID principles:

- Single Responsibility: Sorting calculations are separated into sortLogic.js, while script.js handles updating the webpage.
- Open/Closed: sortLogic.js uses separate sorting methods that allow additional sorting options to be added without changing the main sorting function.

## Current Limitations

- Quest tracking has not been added yet.
- An overall account progression dashboard has not been added yet.
- Progress is saved locally in the user's browser and does not transfer between devices.
- Clearing browser data may remove saved progress.