//In the next project use a shared global.d.ts file for shared declartions of types, interfaces and constants

import { getUserId } from "@backend/src/controllers/verificationController";

export interface ResponseData<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface RequestData {
  //TODO: create a standard data structure
}

export interface ActivityPost {
  activityType: string;
  activityDuration: number;
  activityIntensity: string;
  activityDate: string;
  activityNote?: string;
}
export interface UserActivity extends ActivityPost {
  userId: string;
  caloriesBurned?: number; // Optional, can be calculated later
}

export interface ActivityOptions {
  activities: string[];
}

export interface MealPost {
  mealType: string;
  calories: string;
  consumedAt: string;
}

export interface UserMeal {
  userId: string;
  mealType: string;
  calories: string;
  consumedAt: string;
}

export interface MealOptions {
  mealTypes: string[];
}

export interface GoalPost {
  category: string;
  goal: string;
  goalTargetValue: number;
  goalStartDate: string;
  endAt: string;
}

interface UserRestriction {
  category: string;
  restriction: string;
}
export interface RestrictionPost {
  restrictions: UserRestriction[];
}

// will be send as
interface UserAssessment {
  category: string;
  value: string;
}

export interface AssessmentPost {
  assessmentCriteria: UserAssessment[];
}

// Inputs for the user to update their profile
export interface ProfilePost {
  firstName?: string;
  lastName?: string;
  sex?: string;
  age?: number;
  height?: number;
  weight?: number;
  neckCircumference?: number;
  waistCircumference?: number;
  hipCircumference?: number;
  date?: string;
  note?: string;
}

// The user profile data that is stored in the database
export interface UserProfile extends ProfilePost {
  userId: string;
  wellnessScore?: number;
  BMI?: number;
  fatPercentage?: number;
}

// This is the main review component.
export interface UserDashboard extends ProfilePost {
  wellnessScore: number;
  BMI: number;
  fatPercentage: number;
  currentWeight: number;
  goal: string;
  goalProgress: number;
  goalTargetValue: number;
  goalStartDate: string;
  goalEndDate: string;
  progressIndicator: string; // e.g. "On Track", "Behind", "Ahead"
}

// This is used to display the user Settings page and modify the user settings all of the settings are optional as it is yet not clear where and when they will be toggled
export interface UserSettings {
  mfa_enabled?: boolean; // Supported: Multi-factor authentication enabled
  email_notifications?: boolean; // Supported: Email notifications enabled
  notification_active?: boolean; // Planned: Notification system not implemented yet
  privacy_accepted?: boolean; // : Allow data sharing with third parties
  cookies_allowed?: boolean; // Supported: Only necessary cookies are used, no need to ask this atm.
  ai_enabled?: boolean; // Supported: Allow AI features
}
