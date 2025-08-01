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

export interface ProfilePost {
  firstName?: string;
  lastName?: string;
  sex?: string;
  age?: string;
  height?: string;
  neckCircumference?: number;
  waistCircumference: number;
}
