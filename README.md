

The wellness-app  was created by Hannes Soosaar the focus is to provide a friendly notepad that will keep you on track to reach your health related goals hitting the target everytime.

You can only improve what you measure and track. So the only thing you need to worry is keeping a record. you might be wondering how do I know what and when to log.No worries the wellness-app has your back, just set your goals and targets and our AI powered platform will let you know exactly what your next move should be. 

- Exercise/Activity diary. 
- Calories/Food diary.
- Physical parameters diary.


Color Schema

| Purpose              | Color                    | Hex Code  | Notes                                      |
| -------------------- | ------------------------ | --------- | ------------------------------------------ |
| **Background**       | Soft White / Mist Gray   | `#F9FAF9` | Clean, soft base – keeps things light.     |
| **Primary**          | Sage Green               | `#A8CABA` | Calming and organic, great for buttons.    |
| **Accent**           | Blush Rose / Muted Coral | `#F3D9DC` | A gentle warmth – great for highlights.    |
| **Text (Dark)**      | Charcoal / Graphite      | `#2E2E2E` | Clean and accessible on light backgrounds. |
| **Secondary Text**   | Cool Gray                | `#7D8B8D` | Subtle contrast for labels, placeholders.  |
| **Success / Active** | Fresh Mint               | `#BCE2D0` | Reinforces progress, calm energy.          |

Button

| Element         | Suggested Color | Hex       | Notes                                |
| --------------- | --------------- | --------- | ------------------------------------ |
| **Background**  | Sage Green      | `#A8CABA` | Main color of the button             |
| **Text**        | White           | `#FFFFFF` | For contrast on the green background |
| **Hover BG**    | Slightly darker | `#91B6A8` | Adds interactive feedback            |
| **Disabled BG** | Light Gray      | `#E0E7E9` | Shows it’s not active or tappable    |



**Creating an account.**

-Verify email.
    Verification of your email address is required to start using your account
-Request new password.

    ** a link will be sent to the email you registered with or that you provided **

    The Wellness app is an app to help you become the best and healthiest version of yourself. To achieve this I have crafted a system that has worked. The system is simple set your goal, plot a path to your goal, measure and track your progress. Knowing full well how hard it can be to achieve your goal your wellness app will hold your hand during the journey by utilizing and leveraging Ai to help w



    - Allow data sharing with third parties. Limits the use of AI.

    - Wellness score changes when user updates their weekly activity frequency. The system is based on actual activity any change will update the score.


    -Verify scores update when changing: BMI range, activity level, goal, progress, or health habits
        -Dependent calculated parameters:  BMI, progress.
        -Modifiable parameters: Activity, goal, calories (health habits)

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

This page is meant fo you to get AI generated advice the questions are hardcoded and meant for the 1.0 version of the app. The chat functionality will be added in version 3.0



## Progress page

Your progress currently has two categories it tracks.

- *Your weight and measures as the most important metrics to determine BMI and body composition meaning lean mass and fat.*

- *Your energy balance meaning calories in and calories out.*


## Goals page

You can choose from one of the following goals.

* Targe body weight.
* Targe body fat %.
* Targe calories balance.
* Target strength. aka pushpus
* Target endurance. aka. walking

All goals need to have a deadline, that the user must choose.
Only one goal can be the focus as working on any of the goals as will have an effect on all other attributes.

The goal is calculated as StartValue - targetValue / daysToEnd this will be used to calculate if you are on track or not
The goal progress is form 0 to 100. calculated  CurrentValue/TargetValue.


## Activity page

On the activity page you can add activities that will count towards your activity and calories balance.

## Progress page

Here you are prompted to enter you physical metrics that should be measured in the real world. like weight and body measures.

## Meal page

The meal page will let you update your calories intake In version 1.0 . In version 2.0 food menus and meal prep will be added.

## Restrictions page

On the restrictions page you can add restrictions that will be taken into account giving advice and suggestions. Any food restrictions are not used in version 1.0


mf2 - otplib backend.