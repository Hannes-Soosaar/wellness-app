import React from "react";

// Current weekly activity frequency (0-7 days)
interface WeeklyActivityList {
  Frequency: number;
}

// Exercise types (cardio, strength, flexibility, sports)
interface ExerciseTypeList {
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

// Average session duration (15-30min, 30-60min, 60+ min)
interface SessionDuration {
  option1: string;
  option2: string;
  option3: string;
}

// Self-assessed fitness level (beginner/intermediate/advanced)
interface FitnessLevel {
  option1: string;
  option2: string;
  option3: string;
}

// Preferred exercise environment (home, gym, outdoors)
interface ExcersizeEnvironment {
  option1: string;
  option2: string;
  option3: string;
}

// Current endurance level (can run/walk for X minutes)
interface EnduranceLevel {
  option1: string;
  option2: string;
  option3: string;
}

// Time of day preference to exercise (morning, afternoon, evening)
interface TimeOfDayAvailability {
  option1: string;
  option2: string;
  option3: string;
}

// Basic strength indicators (can do X pushups/squats)
interface StrenghtIndicator {
  option1: string;
  option2: string;
  option3: string;
}
