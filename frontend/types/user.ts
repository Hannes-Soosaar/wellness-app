// Current weekly activity frequency (0-7 days)
export interface WeeklyActivityList {
  frequency: number;
}

// Exercise types (cardio, strength, flexibility, sports)
export interface ExerciseTypeList {
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

// Average session duration (15-30min, 30-60min, 60+ min)
export interface SessionDuration {
  option1: string;
  option2: string;
  option3: string;
}

// Self-assessed fitness level (beginner/intermediate/advanced)
export interface FitnessLevel {
  option1: string;
  option2: string;
  option3: string;
}

// Current endurance level (can run/walk for X minutes)
export interface EnduranceLevel {
  option1: string;
  option2: string;
  option3: string;
}

// Basic strength indicators (can do X pushups/squats)
export interface StrengthIndicator {
  option1: string;
  option2: string;
  option3: string;
}

// Time of day preference to exercise (morning, afternoon, evening)
export interface TimeOfDayAvailability {
  option1: string;
  option2: string;
  option3: string;
}

// Preferred exercise environment (home, gym, outdoors)
export interface ExerciseEnvironment {
  option1: string;
  option2: string;
  option3: string;
}

// Use this for initially assess the person.
