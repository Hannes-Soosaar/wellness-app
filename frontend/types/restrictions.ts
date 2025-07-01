export interface UserRestrictions {
  foodsIngredients?: FoodsIngredients[];
  exercises?: Exercise[];
  caloriesMacros?: CaloriesMacros[];
  exercisesTimes?: ExerciseTimes[];
  exerciseDuration?: ExerciseDuration[];
}
export type FoodsIngredients =
  | "dairy"
  | "nuts"
  | "meat"
  | "fish"
  | "gluten"
  | "eggs"
  | "poultry";

export type Exercise = "legs" | "hands" | "core" | "running" | "cycling";
export type CaloriesMacros = "proteins" | "carbohydrates" | "fats";
export type ExerciseTimes = "mornings" | "afternoon" | "evening" | "nights";
export type ExerciseDuration = "15" | "30" | "45" | "60" | "90" | "120+";
