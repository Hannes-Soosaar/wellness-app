import { ProfilePost } from "@shared/types/api";
import { off } from "process";

interface BodyComposition {
  BMI: number;
  fatPercentage: number;
}

//! Add hip circumference to properly assess body composition for females

export const calculateBodyComposition = (
  profile: ProfilePost
): BodyComposition => {
  let bodyComposition: BodyComposition = {
    BMI: 0,
    fatPercentage: 0,
  };

  if (!profile.weight || !profile.height) {
    throw new Error(
      "Weight and height are required to calculate BMI composition"
    );
  }

  if (!profile.waistCircumference || !profile.neckCircumference) {
    throw new Error(
      "Waist and neck circumference are required to calculate fat percentage"
    );
  }
  bodyComposition.BMI = calculateBMI(profile.height, profile.weight);
  bodyComposition.fatPercentage = calculateFatPercentage(
    profile.waistCircumference,
    profile.neckCircumference,
    profile.height
  );

  if (
    bodyComposition.fatPercentage < 0 ||
    bodyComposition.fatPercentage > 100
  ) {
    throw new Error("Calculated fat percentage is out of valid range (0-100)");
  }

  if (bodyComposition.BMI < 10 || bodyComposition.BMI > 50) {
    throw new Error("Calculated BMI is out of valid range (10-50)");
  }

  return bodyComposition;
};

const calculateFatPercentage = (
  waistCircumference: number,
  neckCircumference: number,
  height: number
): number => {
  const bodyFatPercentage =
    495 /
      (1.0324 -
        0.19077 * Math.log10(waistCircumference - neckCircumference) +
        0.15456 * Math.log10(height)) -
    450;
  return parseFloat(bodyFatPercentage.toFixed(2));
};

const calculateBMI = (height: number, weight: number): number => {
  const BMI = weight / (height / 100) ** 2;
  return parseFloat(BMI.toFixed(2));
};
