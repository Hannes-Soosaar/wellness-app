// The date can be filtered out on the backend or the front end , for weeks just a number of 1 to 52 for months  use abbreviated names.

// This has too much information to be use full I will leave it here just to have an over view of what I have
export interface GraphData {
  wellnessScore: number[];
  weight: WeightDataPoint[];
  bmi: BMIDataPoint[];
  fatPercentage: number[];
  progress: ProgressDataPoint[];
  pushups: pushupDataPoint[];
  walk: walkDataPoint[];
}

export interface ProgressDataPoint {
  date: string;
  neckCircumference: number;
  waistCircumference: number;
  hipCircumference: number;
}

export interface WeightDataPoint {
  date: string;
  weight: number;
  goal?: number;
  goalDate?: string;
}

export interface BMIDataPoint {
  date: string;
  bmi: number;
}

export interface fatPercentageDataPoint {
  date: string;
  fatPercentage: number;
  goal?: number;
  goalDate?: string;
}

export interface pushupDataPoint {
  date: string;
  pushups: number;
  goal?: number;
  goalDate?: string;
}

export interface walkDataPoint {
  date: string;
  walkMinutes: number;
  goal?: number;
  goalDate?: string;
}

export interface GraphRequest {
  from?: string;
  to?: string;
  granularity: "day" | "week" | "month" | "year" | "none";
  metrics?: string[];
  limit?: number;
  sort?: "asc" | "desc";
}

export interface ActivityDataPoint {
  date: string;
  total_duration: number;
  total_calories: number;
  count: number;
}

export interface PeriodSummary {
  monthly: ActivityDataPoint;
  weekly: ActivityDataPoint;
  daily: ActivityDataPoint;
}
