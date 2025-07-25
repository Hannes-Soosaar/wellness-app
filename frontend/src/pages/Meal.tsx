import React, { useState } from "react";

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
  const [error, setError] = useState("");

  const handleSave = () => {
    const newMeal = {
      id: crypto.randomUUID(),
      meal: meal,
      mealCalories: mealCalories.replace(",", "."),
      mealDate: mealDate,
    };

    console.log(isValidNumber(mealCalories) + "Evaluation");

    if (!isValidNumber(mealCalories)) {
      const errorMessage = "Calories consumed must be a real number";
      setError(errorMessage);
      alert(errorMessage);
      return;
    } else {
      setError("");
      try {
        console.log("saving meal", newMeal);
        localStorage.setItem("latesMeal", JSON.stringify(newMeal));
      } catch (error) {
        console.log("failed to save meal:", error);
        alert("failed to save meal");
      }
    }
  };

  const isValidNumber = (stringValue: string) => {
    const normalized = stringValue.replace(",", ".");
    return /^-?\d+(\.\d+)?$/.test(normalized.trim());
  };

  const handleErrorClose = () => {
    setError("");
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
        <ErrorMessage errorMessage={error} onClose={handleErrorClose} />
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

        <button onClick={handleSave}>Add Meal</button>
      </div>
    </>
  );
};

export default Meal;
