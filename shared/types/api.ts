export interface ResponseData<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface RequestData {
  //TODO: create a standard data structure
}

export interface UserActivityPost {
  activityType: string;
  activityDuration: number;
  activityIntensity: string;
  activityDate: string;
  activityNote?: string;
}

export interface UserMealPost {
  mealType: string;
  calories: number;
  consumedAt: string;
}

export interface UserGoalPost {
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
export interface UserRestrictionPost {
  restrictions: UserRestriction[];
}

// will be send as
interface UserAssessment {
  category: string;
  value: string;
}

export interface userAssessmentPost {
  assessmentCriteria: UserAssessment[];
}

export interface UserProfilePost {
  firstName?: string;
  lastName?: string;
  sex?: string;
  age?: string;
  height?: string;
  neckCircumference?: number;
  waistCircumference: number;
}
