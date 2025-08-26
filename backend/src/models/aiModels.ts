export interface AiRequestContent {
  useData: UserPromptData;
  request: string;
}

// Add goal history
export interface UserGoalDataPoint {
  date: string;
  goal_current_value: number;
}

// Add the current goal
export interface UserGoalData {
  userGoal: string;
  goalTargetValue: number;
  goalStartValue: number;
  startAt: string;
  endAt: string;
}

// The truth for the current situation
export interface UserProfile {
  userId: string;
  age: number;
  weight: number;
  bmi: number;
  fatPercentage: number;
  pushups?: number;
  walk?: number;
  neckCircumference?: number;
  waistCircumference?: number;
  hipCircumference?: number;
}

// Some values might be missing or 0
export interface ProgressDataPoint {
  data?: string;
  weight?: number;
  bmi?: number;
  wellnessScore?: number;
  fatPercentage?: number;
  pushups?: number;
  walk?: number;
  neckCircumference?: number;
  waistCircumference?: number;
  hipCircumference?: number;
}

export interface ActivityDataPoint {
  date: string;
  total_duration: number;
  activity_type: string;
  calories_burned: number;
}

export interface UserPromptData {
  profile: UserProfile; //sets current state
  goals: UserGoalData; //sets goal values
  goalHistory: UserGoalDataPoint[]; //sets goal value history
  progressData: ProgressDataPoint[]; //give profile changes over time
  activityData: ActivityDataPoint[]; //provides a list of all activities
  restrictions: string[];
}
