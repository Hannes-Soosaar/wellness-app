
# Wellness App

Was created by Hannes Soosaar with the focus on provide a friendly environment to replace that excel table you have that will keep you on track to reach your health related goals hitting the target every time.

You can only improve what you measure and track. So the only thing you need to worry is keeping a record. you might be wondering how do I know what and when to log.No worries the wellness-app has your back, just set your goals and targets and our AI powered platform will let you know exactly what your next move should be.

- Exercise/Activity diary.
- Calories/Food diary. (intake not implemented yet.)
- Physical parameters diary, for body fat and composition tracking.
- Wellness assessment.
- Simple strength and endurance tracking.

*Last update 28.08.2025 by Hannes Soosaar*

## Getting up and running

### Hosted live version

Coming soon!

A functioning demo website can be found at `wellness-agent.eu`. Available after 30.08.2025

### Script Setup

On Ubuntu machines using apt package manager there is a setup script.

The Script setup uses bash to check software installed if not present install required software also install all project dependencies.

### How to use the script

1. Navigate to the project root where you have cloned the project from Gitea

    `cd /path/to/project-root-folder/$`

2. Make the setup file executable

    `sudo chmod +x setup.sh`

3. Run the setup

    `./setup.sh`

The setup process will guide you through the rest of the process. In the end you will be asked if you would like to start services, If you do start the services using the *setup.sh* script please note that the front end and Backend console outputs and errors will be in one terminal.

## Manual  Setup

*Please install the following software or check the versions.*

- Node.js  v.20.19.4  or later
- Docker  version.27.5.1  ( or later, this version is available over the apt on Ubuntu at 28.08.2025)
- PostgreSql image: postgres: 16
    runs on port 5432 (runs in a docker container, so no need for individual install, check for port conflicts if another service is running)

Other dependencies will be installed using the node package manager (npm). for a full list of dependencies and version pleas check the package.json file in both the backend and frontend folder
examples of dependencies that will be installed through npm

- TypeScript (will be installed with npm install)
- React  ( will be installed with npm install)
- Vite  ( will be installed with npm install)
- . . .

## Installing dependency

The dependencies for the front end and backend are both managed by node package manager.

 ### Front End

1. Navigate to the frontend folder withing the project.

    `cd /path/to/project-root-folder/frontend/$`

2. Run the npm installation script.

    `sudo npm install`

### Backe End

1. Navigate to the backend folder withing the project.

    `cd /path/to/project-root-folder/backend/$`

2. Run the npm installation script.

    `sudo npm install`

## Starting services

There are two ways of starting the serves and services. For best troubleshooting and error reporting, it is advices to run each service in a individual terminal instance.

1. Using the makefile commands

    - Navigate to the the project root directory.
        `cd /path/to/project-root-folder/$`
    - Start the Database.
        ` make up `
    - Open a new terminal to the project folder and run
        `make startFe`
    - Open a new terminal to the project folder and run
        `makes startBe`

2. Manually navigating folders and running the command to start each service
    - Navigate to the the frontend  directory.
        `cd /path/to/project-root-folder/frontend/$`
    - Start the frontend server
        `npm run dev`
    - Navigate to the backend folder
        `cd /path/to/project-root-folder/backend/$`
    - Start the backend server with nodemon support live reload ( in the terminal running the server type `rs` and press enter for instant reload)
        `npx nodemon --exec "npx tsx src/index.ts"`
    - Navigate to the DB folder
        `cd /path/to/project-root-folder/postgresql/$`
    - Compose and start the docker container by running
        `docker compose up -d`

## Browser setup with https certificates

 The app use HTTPS to ensure all data between servers and the client is moved securely and to comply with GDPR rule.

 As the development model currently uses self issued certification, the browser will still need some convincing the website is legitimate.

for both the backend  localhost:5000 and front end localhost:5173 the browser exceptions must be set, in chrome click the *Not Secure* button before the webpage address and do the following.

- Under *Cookies and Site Data* allow third party cookies
- Under *Site Settings* there are more options, based on your configuration some changes might be needed. like *JS allowed* and /*images*

## Creating an account

*There is no password length of complexity checking during the development of the app so for testing you can use a simple password for real accounts its  reccomended to have a password that is at-least 12 characters that include numbers and symbols and is truely random*

1. Register with an email account
    - must verify the email via an email link
2. Login with Discord or Google
    - you can request to change the password from settings to be able to use a regular account too.
    - does not require email verification as this has been done by google or discord

## First time login

you will not be allowed to login, before you have verified you email. Please verify your email before you login.

When you first login, there will be a few errors shown and a generic Welcome is used.*
    - As the first step, please fill in your profile details to get personalized and get rid of most errors.

 **This is a known bug and is on the fix-list with low priority.*

## login with MFA

It is recommended to use MFA on all accounts, also the

The app uses **TOTP** for *MFA* authentication.  MFA can be toggled from the user Settings page.

The MFA login was tested with gooogle chrome and  the chrome extension **"Authenticator"**

link to the chrome extension website `https://chromewebstore.google.com/detail/authenticator/bhghoamapcdpbohphigoooaddinpkbai`

## The Wellness App
Overview of the app pages and possibilities.

## Profile page

The profile page holds your basic metrics, that will be used to calculate your BMI and body fat percentage , it is assumed this will be filled in once. and other subsequent changes are made through the Update menu. using the Physical Properties page

## Assessment page

The Assessment tab is a stand alone, service and is meant not to track your progress but give an assessment of the form you are currently in. Also the assessment pushups and walking time max is not tied with your Performance Progress.*

Age is not considered when calculating your wellness score based on the assessment.

## Overview page

Give you a graphical and Table views of you progress and goals.The page uses folding menus, so pleas remember to open and expand  your overviews  

Progress chart-
 Will show you the change of you  physical progress along with your goal if it is weight or body fat related.

 TODO: a bug is preventing the chart from loading.

Activities-
the top level lets you summarize activities by day, by week or by month giving you an overview of the selected periods Activities
All daily activities  are summarized no daily break down is implemented.

Calories-
This view is in development estimated launch is 16.09.2025

## Settings page

Here you can toggle the settings related to your account with the wellness-app
The functioning operations.

- Update password.
- Enable Two factor Authentication.
- Enable AI
  
    TODO: implement a check and conditional for getting the request using the DB.

### *Semi functional but not restrictive yet.*

- Enable Email notifications (no notification have been implemented, but require on script and function to run, best done as a separate service that runs once in a while.

### *Not functional*

- Allow data sharing with third parties. This should lock your account until you login again and reaccept the terms and conditions and pricacy policy essentially suspending your account.

## Advice page

This page is meant fo you to get AI generated advice the questions are hardcoded and meant for the "numbers don't lie" version.

It will provide Advice for:
-today
-upcoming week.
-upcoming month.

Provide a summary of your progress for:
-today
-past week
-past month

TODO: implement custom summary.
It has the capable of taking in a date range, to give advice for the range of date selected or provide a summary.

## Goals page

You can choose from one of the following goals.

- Targe body weight.
- Targe body fat %.
- Targe calories balance. (not active but can still set)
- Target strength. aka pushups  (serves no purpose besides, its in a checklist )
- Target endurance. aka. walking ( serves no purpose besides, its in a checklist)

All goals need to have a deadline, that the user must choose.
Only one goal can be the focus as working on any of the goals as will have an effect on all other attributes.

The goal is calculated as StartValue - targetValue / daysToEnd this will be used to calculate if you are on track or not
The goal progress is form 0 to 100. calculated  CurrentValue/TargetValue.

## Activity page

On the activity page you can add activities that will count towards your activity and calories balance. The calories are estimated using intensity and duration, however they are not used utilized beyond sending the data to the AI assistant who will summarize them.

*Bug? There is a date field, and currently you are able to add activities into the future, lets say for planning.

## Physical Progress page

Here you are prompted to enter you physical metrics that should be measured in the real world. like weight and body measures. For any true results real life measures should be used any dummy data or wrong entries might affect the result or give unwanted errors.

**As the BMI and body fat is calculated and each parameter has a min and max value of a average adult human. Mixing max and minimum limits will still give invalid BMI errors or Body Fat  errors. Example being the heaviest person with the slimmest neck possible will result in a BMI and body fat percentage error.**

## Meal page

The meal page has been deactivated for the "numbers don't lie" release.

On the meals page you can add a meal by date, with the type of the meal ( to check if you are snacking too much) and the calories, this will help you keep track of your calories consumed.

## Restrictions page

On the restrictions page you can add restrictions that will be taken into account giving advice and suggestions. Any restriction mentioned will be excluded from any suggestions by passing into the the user data the title form any user restrictions.

TODO: make the restrictions have a category also for better understanding
example:

`"restrictions": [
    "gluten",
    "running",
    "afternoon",
  ]`

## Summary

If there are any unknown bugs or any issues please contact <hsoosaar@gmail.com> with the description of your issue, or why not prase if praise is due.
