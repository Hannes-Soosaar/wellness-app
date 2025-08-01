import { UserActivity } from "@shared/types/api";
import dotenv from "dotenv";
import { getUserWeightById } from "../services/user/userService";

dotenv.config();

/* 
The function uses the following formula to estimate calories burned
Calories Burned =  Duration (minutes)*(MET value * 3.5 * weight in kg) / 200
Where: MET Metabolic Equivalent of Task
*/

// Calculates the calories burned based on the activity  duration, and intensity and user Weight

export const calculateCalories = async (
  activity: UserActivity
): Promise<number> => {
  let activityCalories = 0;
  try {
    const userWeight = await getUserWeightById(activity.userId);
    if (!userWeight || userWeight <= 0) {
      throw new Error("User weight not found");
    }
    switch (activity.activityIntensity) {
      case "low":
        activityCalories =
          (activity.activityDuration *
            (Number(process.env.LOW_MET) * 3.5 * userWeight)) /
          200;
        break;
      case "medium":
        activityCalories =
          (activity.activityDuration *
            (Number(process.env.MED_MET) * 3.5 * userWeight)) /
          200;
        break;
      case "high":
        activityCalories =
          (activity.activityDuration *
            (Number(process.env.HIGH_MET) * 3.5 * userWeight)) /
          200;
        break;
      default:
        activityCalories = 0;
    }
  } catch (error) {
    console.error("Error getting user weight", error);
    return 0;
  }

  return activityCalories;
};
