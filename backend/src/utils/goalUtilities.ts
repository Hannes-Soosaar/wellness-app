export const calculateGoalProgress = (
  currentValue: number,
  targetValue: number
): number => {
  if (targetValue === 0) {
    return 0;
  }
  return Math.min(Math.max((currentValue / targetValue) * 100, 0), 100);
};

export const calculateGoalDuration = (
  startDate: string,
  endDate: string
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (end < start) {
    throw new Error("End date must be after start date");
  }
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};

export const getDaysLeftToGoalEnd = (endDate: string): number => {
  const today = new Date();
  const end = new Date(endDate);
  if (end < today) {
    return 0;
  }
  return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

export const getGoalTrackingStatus = (
  startValue: number,
  currentValue: number,
  targetValue: number,
  startDate: string,
  endDate: string
): string => {
  const timeRemaining = getDaysLeftToGoalEnd(endDate);
  const timeToComplete = calculateGoalDuration(startDate, endDate);
  const progressPerDay = (targetValue - startValue) / timeToComplete;
  const progress = calculateGoalProgress(currentValue, targetValue);
  const progressNeededPerDay = progress / timeRemaining;

  if (progressNeededPerDay > progressPerDay * 1.5) {
    return "Way Off Track";
  } else if (progressNeededPerDay > progressPerDay * 1.2) {
    return "Off Track";
  } else if (progressNeededPerDay > progressPerDay) {
    return "Behind Schedule";
  } else {
    return "On Track";
  }
};
