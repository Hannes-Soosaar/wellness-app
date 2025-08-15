//In the next project use a shared global.d.ts file for shared declaration of types, interfaces and constants

/* 
In stead of using  Post it would be better to use Data as the same interface is used to both get the data and send the data for a page.
? when doing the user...Post  that extends ...Post perhaps is it would be better if we just added the userId to the Post interface  as optional and then used that in the service and controller.
*/

/* 
Lessons learned
  - using the field data in the response Data  interface results in a situation with axios where you have response.data.data.xxx  which is not ideal.
      next time perhaps using object instead of data would be more suitable better.
  - don't make a User...Post interface that extends ...Post, instead just pass in the userId from the JWT on the backend directly to the service.
  - The shared interfaces will grow to a point where it should be split.
  - There is no need to have a RequestData interface as we have middle ware that handles the header and JWT send identification data. 
*/
export interface ResponseData<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface RequestData {
  //TODO: create a standard data structure
}

// ACTIVITY
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

// MEALS
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

// GOALS
// export interface GoalPost {
//   category: string;
//   goal: string;
//   goalTargetValue: number;
//   goalStartDate: string;
//   endAt: string;
// }

// RESTRICTIONS
export interface UserRestriction {
  category: string;
  restriction: string;
}
export interface Restriction {
  category: string;
  restriction: string;
}
export interface RestrictionPost {
  restrictions: UserRestriction[];
}

export interface RestrictionResponse {
  options: Restriction[];
  userRestrictions: UserRestriction[];
}
// ASSESSMENTS

export interface AssessmentOption {
  category: string;
  value: string;
  title: string;
  description: string;
}

export interface AssessmentOptions {
  options: AssessmentOption[];
}

export interface userAssessment {
  category: string;
  value: string;
}

export interface UserAssessments {
  assessments: userAssessment[];
}

export interface AssessmentState {
  options: AssessmentOptions;
  userAssessments: UserAssessments;
}

// PROFILE
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
export interface ProfileData {
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
export interface UserProfile extends ProfilePost {
  userId?: string;
  wellnessScore?: number;
  BMI?: number;
  fatPercentage?: number;
}

// DASHBOARD
export interface UserDashboard {
  wellnessScore: number;
  BMI: number;
  fatPercentage: number;
  currentWeight: number;
  goal: string;
  goalProgress: number;
  goalTargetValue: number;
  goalStartValue: number;
  goalCurrentValue: number;
  goalStartDate: string;
  goalEndDate: string;
  progressIndicator: string; // Milestone or progress indicator %
}

// SETTINGS
export interface UserSettings {
  mfa_enabled?: boolean; // Supported: Multi-factor authentication enabled
  email_notifications?: boolean; // Supported: Email notifications enabled
  notification_active?: boolean; // Planned: Notification system not implemented yet
  privacy_accepted?: boolean; // : Allow data sharing with third parties
  cookies_allowed?: boolean; // Supported: Only necessary cookies are used, no need to ask this atm.
  ai_enabled?: boolean; // Supported: Allow AI features
}

// PROGRESS
export interface ProgressPost {
  weight: number;
  neckCircumference: number;
  waistCircumference: number;
  hipCircumference: number;
  date: string;
  note?: string;
  sex?: string; // Optional, can be used
}

export interface UserProgressPost extends ProgressPost {
  userId: string;
}

export interface UserSexAndHeight {
  sex: string;
  height: number;
}

export interface GoalPost {
  end_date: string;
  target_value: number;
  goal_id: number;
}

export interface AvailableGoal {
  id: number;
  category: string;
  title: string;
  description: string;
}

export interface UserGoal {
  goal_id: number;
  end_date: string;
  target_value: number;
}

export interface GoalData {
  availableGoals: AvailableGoal[];
  userGoal: UserGoal | null;
}

export interface PushupAndWalk {
  currentPushups: number;
  currentWalkingMinutes: number;
}
