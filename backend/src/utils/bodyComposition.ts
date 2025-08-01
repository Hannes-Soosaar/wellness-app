import { ProfilePost } from "@shared/types/api";
import { off } from "process";

interface BodyComposition {
  BMI: number;
  fatPercentage: number;
}

/* 
Body fat is calculated using the U.S Navy Body Fat Formula (SI units Metric):

Males:
BFP =	495/ 1.0324 - 0.19077×log10(waist-neck) + 0.15456×log10(height)- 450

Females:
BFP =	495/1.29579 - 0.35004×log10(waist+hip-neck) + 0.22100×log10(height)-450
*/

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

  if (profile.sex === "male") {
    bodyComposition.fatPercentage = calculateMaleFatPercentage(
      profile.waistCircumference,
      profile.neckCircumference,
      profile.height
    );
  }

  if (profile.sex === "female") {
    if (!profile.hipCircumference) {
      throw new Error(
        "Hip circumference is required to calculate fat percentage for females"
      );
    }
    bodyComposition.fatPercentage = calculateFemaleFatPercentage(
      profile.waistCircumference,
      profile.neckCircumference,
      profile.hipCircumference,
      profile.height
    );
  }

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

const calculateMaleFatPercentage = (
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

const calculateFemaleFatPercentage = (
  waistCircumference: number,
  neckCircumference: number,
  hipCircumference: number,
  height: number
): number => {
  const bodyFatPercentage =
    495 /
      (1.29579 -
        0.35004 *
          Math.log10(
            waistCircumference + hipCircumference - neckCircumference
          ) +
        0.221 * Math.log10(height)) -
    450;
  return parseFloat(bodyFatPercentage.toFixed(2));
};

const calculateBMI = (height: number, weight: number): number => {
  const BMI = weight / (height / 100) ** 2;
  return parseFloat(BMI.toFixed(2));
};
