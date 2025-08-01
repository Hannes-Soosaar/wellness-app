//In the next project use a shared global.d.ts file for shared declartions of types, interfaces and constants

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
  calories: number;
  consumedAt: string;
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
