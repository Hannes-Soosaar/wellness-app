// The date can be filtered out on the backend or the front end , for weeks just a number of 1 to 52 for months  use abbreviated names.

export interface GraphData {
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
}

export interface BMIDataPoint {
  date: string;
  bmi: number;
}

export interface fatPercentageDataPoint {
  date: string;
  fatPercentage: number;
}

export interface pushupDataPoint {
  date: string;
  pushups: number;
}

export interface walkDataPoint {
  date: string;
  walkMinutes: number;
}
