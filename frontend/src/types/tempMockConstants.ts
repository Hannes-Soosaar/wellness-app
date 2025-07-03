// these constants might be handy when testing. The real values are going to be coming from the backend eventually

// USER LIMITATIONS //

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

// USER ASSEMENT //

export const WEEKLY_ACTIVITY_LIST = {};

export const EXERCISE_TYPE_LIST = {};

export const USER_SESSION_DURATION = {};

export const USER_FITNESS_LEVEL = {};
