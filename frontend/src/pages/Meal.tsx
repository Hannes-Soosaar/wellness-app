import React, { useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";

interface MealPost {
  id: string;
  meal: string;
  mealCalories: string;
  mealNote: string;
  mealDate: string;
}

const Meal: React.FC = () => {
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [meal, setMeal] = useState("");
  const [mealCalories, setMealCalories] = useState("");
  const [mealDate, setMealDate] = useState(getTodayString());
  const [mealNote, setMealNote] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = () => {
    const newMeal = {
      id: crypto.randomUUID(),
      meal: meal,
      mealCalories: mealCalories.replace(",", "."),
      mealDate: mealDate,
    };

    console.log(isValidNumber(mealCalories) + "Evaluation");

    if (!isValidNumber(mealCalories)) {
      setErrorMessage("Please enter a valid number for calories.");
      return;
    } else {
      setErrorMessage("");
      try {
        console.log("saving meal", newMeal);
        localStorage.setItem("latesMeal", JSON.stringify(newMeal));
        setSuccessMessage("Meal saved successfully!");
      } catch (error) {
        setErrorMessage("Failed to save meal. Please try again.");
        console.log("failed to save meal:", error);
      }
    }
  };

  const isValidNumber = (stringValue: string) => {
    const normalized = stringValue.replace(",", ".");
    return /^-?\d+(\.\d+)?$/.test(normalized.trim());
  };

  const handleErrorClose = () => {
    setErrorMessage("");
    setMealCalories("");
  };

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
            <option value="Meal">Meal</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
            <option value="Dessert">Dessert</option>
          </select>
        </label>
        <label className="meal-label">
          Meal Calories (kcal)
          <input
            className="meal-input"
            type="text"
            value={mealCalories}
            onChange={(e) => setMealCalories(e.target.value)}
          />
        </label>

        <label className="date-label">
          Target Date:
          <input
            type="date"
            value={mealDate}
            onChange={(e) => setMealDate(e.target.value)}
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
          duration={3000}
          onDismiss={() => setSuccessMessage("")}
        />
        <button onClick={handleSave}>Add Meal</button>
      </div>
    </>
  );
};

export default Meal;
