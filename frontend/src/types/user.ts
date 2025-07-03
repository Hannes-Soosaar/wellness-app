// Current weekly activity frequency (0-7 days)
export type WeeklyActivityList = string;

// Exercise types (cardio, strength, flexibility, sports)
export type ExerciseTypeList = "cardio" | "strength" | "flexibility" | "sports";

// Average session duration (15-30min, 30-60min, 60+ min)
export type SessionDuration = "15" | "30" | "45" | "60" | "90" | "120+";
// Average session duration (15-30min, 30-60min, 60+ min)
export type UserSessionDuration = "15" | "30" | "45" | "60" | "90" | "120+";

// Self-assessed fitness level (beginner/intermediate/advanced)
export type FitnessLevel = "beginner" | "intermediate" | "advanced" | "athlete";

// Current endurance level (can run/walk for X minutes)
export type EnduranceLevel = string;

// Basic strength indicators (can do X pushups/squats)
export type StrengthIndicator = string;

// Time of day preference to exercise (morning, afternoon, evening)
export type TimeOfDayAvailability =
  | "mornings"
  | "afternoon"
  | "evening"
  | "nights";

// Preferred exercise environment (home, gym, outdoors)
export type ExerciseEnvironment = "home" | "gym" | "outdoors" | "fitness club";

export interface UserAssessmentData {
  weeklyActivityList?: WeeklyActivityList[];
  exerciseTypeList?: ExerciseTypeList[];
  userSessionDuration?: UserSessionDuration;
  fitnessLevel?: FitnessLevel[];
  enduranceLevel?: EnduranceLevel[];
  strengthIndicator?: StrengthIndicator[];
  timeOfDayAvailability?: TimeOfDayAvailability[];
  exerciseEnvironment?: ExerciseEnvironment[];
}

export interface UserData {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  // gender needs to be a number
  gender: string;
  age: number;
  weight: number;
  height: number;
  BMI: number;
  fatPercentage: number;
  wellnessScore: number;
}

export interface UserActivity {
  duration: number;
  type: string;
  heartRate: number;
}

export interface UserMeal {
  id: string;
}
// Use this for initially assess the person.
