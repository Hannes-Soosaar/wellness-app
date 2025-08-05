import React, { useEffect, useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";
import { MealPost, ResponseData, MealOptions } from "../../../shared/types/api"; // Assuming you have a type definition for MealPost
import api from "../lib/axios";

const Meal: React.FC = () => {
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };
  // This sets the initial value of Meal to "meal" to avoid loading conflicts.
  const [meal, setMeal] = useState<string>("meal");
  const [calories, setCalories] = useState<string>("");
  const [consumedAt, setConsumedAt] = useState<string>(getTodayString());
  const [mealNote, setMealNote] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [mealOptions, setMealOptions] = useState<string[]>([]);

  const isValidNumber = (stringValue: string) => {
    const normalized = stringValue.replace(",", ".");
    return /^-?\d+(\.\d+)?$/.test(normalized.trim());
  };

  const handleSave = async () => {
    const newMeal: MealPost = {
      mealType: meal,
      calories: calories.replace(",", "."),
      consumedAt: consumedAt,
    };

    console.log(isValidNumber(calories) + "Evaluation");

    if (!isValidNumber(calories)) {
      setErrorMessage("Please enter a valid number for calories.");
      return;
    }

    try {
      const response = await api.post("/user/meal", newMeal);

      if (!response.data.success) {
        setErrorMessage("Failed to add meal. Please try again.");
        return;
      }

      setSuccessMessage(
        "Successfully added " +
          response.data.data.mealType +
          " " +
          response.data.data.calories +
          " kcal on " +
          response.data.data.consumedAt
      );
      console.log("success Message", successMessage);
      setMeal("");
      setCalories("");
      setConsumedAt(getTodayString());
      setMealNote("");
    } catch (error) {
      console.log("Error saving meal:", error);
      setErrorMessage("Failed to save meal. Please try again.");
    }
  };

  useEffect(() => {
    const fetchMealOptions = async () => {
      try {
        const response = await api.get<ResponseData<MealOptions>>(
          "/user/meal/options"
        );
        if (response.data.success) {
          setMealOptions(response.data.data?.mealTypes || []);
        } else {
          setErrorMessage("Failed to load meal options.");
        }
      } catch (error) {
        setErrorMessage("Error fetching meal options: " + error);
      }
    };

    fetchMealOptions();
  }, []);

  return (
    <>
      <div className="meal-container">
        <h3 className="meal-heading">Add a meal</h3>
        <label className="meal-label">
          Choose a meal type
          <select
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
            className="activity-input"
          >
            {mealOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="meal-label">
          Meal Calories (kcal)
          <input
            className="meal-input"
            type="number"
            min="0"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </label>

        <label className="date-label">
          Target Date:
          <input
            type="date"
            value={consumedAt}
            onChange={(e) => setConsumedAt(e.target.value)}
            className="date-input"
          />
        </label>

        <label className="progress-label">
          Notes:
          <textarea
            value={mealNote}
            onChange={(e) => setMealNote(e.target.value)}
          />
        </label>
        <ErrorMessage
          message={errorMessage}
          duration={5000}
          onDismiss={() => setErrorMessage("")}
        />
        <SuccessMessage
          message={successMessage}
          duration={5000}
          onDismiss={() => setSuccessMessage("")}
        />
        <button onClick={handleSave}>Add Meal</button>
      </div>
    </>
  );
};

export default Meal;
