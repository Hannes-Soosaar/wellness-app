// USER LIMITATIONS //

import { UserGoal } from "./user";

export const FOOD_INGREDIENTS = [
  "dairy",
  "nuts",
  "meat",
  "fish",
  "gluten",
  "eggs",
  "poultry",
] as const;

export const EXERCISES = [
  "legs",
  "hands",
  "core",
  "running",
  "cycling",
] as const;

export const CALORIES_MACROS = ["proteins", "carbohydrates", "fats"] as const;

export const EXERCISE_TIMES = [
  "mornings",
  "afternoon",
  "evening",
  "nights",
] as const;

export const EXERCISE_DURATION = [
  "15",
  "30",
  "45",
  "60",
  "90",
  "120+",
] as const;

export const USER_RESTRICTION_OPTIONS = {
  foodsIngredients: FOOD_INGREDIENTS,
  exercises: EXERCISES,
  caloriesMacros: CALORIES_MACROS,
  exercisesTimes: EXERCISE_TIMES,
  exerciseDuration: EXERCISE_DURATION,
} as const;

export type FoodsIngredients = (typeof FOOD_INGREDIENTS)[number];
export type Exercise = (typeof EXERCISES)[number];
export type CaloriesMacros = (typeof CALORIES_MACROS)[number];
export type ExerciseTimes = (typeof EXERCISE_TIMES)[number];
export type ExerciseDuration = (typeof EXERCISE_DURATION)[number];

// USER ASSESSMENT //

export const USER_ACTIVITY_LIFESTYLE = [
  "sedentary: little or no exercise",
  "Light:  exercise 1-3 times a week",
  "Moderate: exercise 4-5 times a  week",
  "Active: intense exercise 3-4 times a week",
  "Extra Active: very intense exercise daily, or physical job",
] as const;

// base points for the activity 0 to 5

export const USER_WEEKLY_ACTIVITY_LIST = [
  "don't exercise", //2
  "at least once a week", //4
  "at least three times a week", // 6
  "at least five times a week", // 8
  "every day", //10
] as const;

// No points move to goal.
export const USER_EXERCISE_TYPE_LIST = [
  "cardio",
  "strength",
  "endurance",
  "strength endurance",
  "muscle mass",
] as const;

// point multiplier
export const USER_SESSION_DURATION = [
  "15", //1
  "30", // 1.2
  "45", //1.5
  "60", // 2
  "90", //2.5
  "120+", //3
] as const;

//  point multiplier
export const USER_TARGET_HEART_RATE = [
  "Very light: 50-60% of max", //1
  "Light:      60-70% of max", //1.5
  "Moderate:   70-80% of max", // 2
  "Hard:       80-90% of max", // 3
] as const;

// no points self assessment no points
export const USER_FITNESS_LEVEL = [
  "beginner",
  "intermediate",
  "advanced",
  "athlete",
] as const;

// endurance how long can you walk for

export const USER_ENDURANCE_LEVEL = [
  "up to 2.5km", //2
  "up to 5km", //4
  "up to 10km", //6
  "up to 20km", //8
  "over 20km", // 10
] as const;

export const USER_STRENGTH_LEVEL = [
  "0 to 5 pushups", //2
  "6 to 15 pushups", //4
  "16 to 30 pushups", //6
  "31 to 50 pushups", //8
  "51+ pushups", //10
] as const;

// strength

// MAX points 90
export const USER_ASSESSMENT_OPTIONS = {
  weeklyActivityList: USER_WEEKLY_ACTIVITY_LIST, // gives 0 to 10 points
  sessionDuration: USER_SESSION_DURATION, // gives 1 to 3 points multiplier
  userTargeHeartRate: USER_TARGET_HEART_RATE,
  userFitnessLevel: USER_FITNESS_LEVEL, // gives 0 points
  strengthIndicator: USER_STRENGTH_LEVEL, // gives 2 to 10 points
  enduranceLevel: USER_ENDURANCE_LEVEL, //gives 2 to 10 points
};

// GOALS

export const USER_GOALS: UserGoal[] = [
  {
    id: "weigh",
    title: "Reach a desired weight",
    description: "Would like to increase or decrease body weight",
  },
  {
    id: "fat",
    title: "Reach a certain body fat percentage",
    description: "Your target body fat percentage",
  },
  {
    id: "calories",
    title: "Observe calorie intake",
    description: "What is your weekly calorie intake goal?",
  },
  {
    id: "strength",
    title: "Strength Training",
    description: "how many pushups would you like to do in one set?",
  },
  {
    id: "endurance",
    title: "Endurance Training",
    description: "How long would you like to be able to walk for?",
  },
] as const;
