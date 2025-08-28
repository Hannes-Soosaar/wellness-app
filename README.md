

The wellness-app  was created by Hannes Soosaar the focus is to provide a friendly notepad that will keep you on track to reach your health related goals hitting the target everytime.

You can only improve what you measure and track. So the only thing you need to worry is keeping a record. you might be wondering how do I know what and when to log.No worries the wellness-app has your back, just set your goals and targets and our AI powered platform will let you know exactly what your next move should be. 

- Exercise/Activity diary. 
- Calories/Food diary.
- Physical parameters diary.


## Hosted live version

 a functioning website can be found at `wellness-agent.eu`. Available after 30.08.2025


## Script Setup

    On Ubuntu machines using apt package manager there is a setup script.

    The Script setup uses bash to check software installed if not present install required software also install all project dependencies.

    **How to use the script** 

    1. Navigate to the project root where you have cloned the project from Gitea.
`cd /path/to/project-root-folder/$`

    2. Make the setup file executable      
`sudo chmod +x setup.sh`

    3. Run the setup
`./setup.sh`

    The setup process will guide you through the rest of the process.

## Manual  Setup

*Please install the following software or check the versions.*


- Node.js  v.20.19.4  or later
- Docker  version.27.5.1  ( or later, this version is available over the apt on Ubuntu at 28.08.2025)
- PostgreSql image: postgres: 16
    runs on port 5432 (runs in a docker container, so no need for individual install, check for port conflicts if another service is running)
- TypeScript (will be installed with npm install)
- React  ( will be installed with npm install)
- Vite  ( will be installed with npm install)

*Optional*
    - C
- 

## Installing dependency





## 

**Creating an account.**

1. Register with an email account
    - must verify the email via an email link
2. Login with Discord or Google
    - you can request to change the password from settings to be able to use a regular account too.
    - does not require email verification as this has been done by google or discord


-Request new password.

    ** a link will be sent to the email you registered with or that you provided **


    - Allow data sharing with third parties. Limits the use of AI. (not active)

    - Wellness score changes when user updates their weekly activity frequency. The system is based on actual activity any change will update the score.
    -Verify scores update when changing: BMI range, activity level, goal, progress, or health habits
        -Dependent calculated parameters:  BMI, progress.
        -Modifiable parameters: Activity, goal, calories (health habits)

## login with MF2

    The app uses TOTP for mf2 authentication, the MFA can be toggled from the user Settings page.

    The MFA login was tested with


## HTTPS 

 The app use HTTPS to ensure all data is transfered between the user and the app and comply with GDPR rule.

 - As the development model currently uses self sertification 



# Wellness-app
In version 1.0 the wellness app is designed to help you get into shape with an focus on gathering body composition and weight related metrics. All advice and prompts are curated and carefully crafted to give broad and good advice on how to achieve your goals.

The app assumes you are over 18 and treats all persons as grownups for all and any calculations.
The app supports two sexes female and male as there are no other formulas available for calculating BMI and body fat content

## Profile page 
The profile page holds your basic metrics, that will be used to calculate your progress and metrics.

## Assessment page

The Assessment tab is a stand alone, service and is meant not to track your progress but give an assessment of the form you are currently in.

It does not take into account your age in this version

## Overview page

Give you a graphical view of your progress and wellness 

## Settings page

Here you can toggle the settings related to your account with the wellness-app

## Advice page

This page is meant fo you to get AI generated advice the questions are hardcoded and meant for the "numbers don't lie" version.

It can provide Advice for:
-today
-upcoming week.
-upcoming month.

Provide a summary of your progress for:
-today
-past week
-past month


It has the capable of taking in a date range, to give advice for the range of date selected or provide a summary 

## Progress page

Your progress currently has two categories it tracks.

- *Your weight and measures as the most important metrics to determine BMI and body composition meaning lean mass and fat.*

- *Strenght and endurance via max walking and pushups


## Goals page

You can choose from one of the following goals.

* Targe body weight.
* Targe body fat %.
* Targe calories balance. (not active but can still set)
* Target strength. aka pushups  (serves no purpose besides, its in a checklist )
* Target endurance. aka. walking ( serves no purpose besides, its in a checklist)

All goals need to have a deadline, that the user must choose.
Only one goal can be the focus as working on any of the goals as will have an effect on all other attributes.

The goal is calculated as StartValue - targetValue / daysToEnd this will be used to calculate if you are on track or not
The goal progress is form 0 to 100. calculated  CurrentValue/TargetValue.


## Activity page

On the activity page you can add activities that will count towards your activity and calories balance. The calories are estimated using intensity and duration, however they are not used utilized beyond sending the data to the AI assistant who will summarize them.
There is a date field, and currently you are able to add activities into the future, lets say for planning.


## Progress page

Here you are prompted to enter you physical metrics that should be measured in the real world. like weight and body measures. For any true results real life measures should be used any dummy data or wrong entries might affect the result or give unwanted errors.

As the BMI and body fat is calculated and each parameter has a min and max value of a average adult human. Mixing max and minimum limits will still give invalid BMI errors or Body Fat  errors. Example being the heaviest person with the slimmest neck possible will result in a BMI and body fat percentage error.

## Meal page

The meal page has been deactivated for the "numbers don't lie" release to keep focus.

## Restrictions page

On the restrictions page you can add restrictions that will be taken into account giving advice and suggestions. Any restriction mentioned will be excluded from any suggestions by passing into the the user data the title form any user restrictions.

example:

`  "restrictions": [
    "gluten",
    "running",
    "afternoon",
  ]`

