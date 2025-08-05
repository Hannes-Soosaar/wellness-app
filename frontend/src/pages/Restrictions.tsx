import React from "react";
import { useState } from "react";
import { USER_RESTRICTION_OPTIONS } from "../types/tempMockConstants";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";

import CheckboxMenu from "../components/CheckboxMenu";
import { CgVercel } from "react-icons/cg";
const Restrictions: React.FC = () => {
  const LABELS: Record<string, string> = {
    foodsIngredients: "Foods & Ingredients",
    exercises: "Exercises",
    caloriesMacros: "Calories & Macros",
    exercisesTimes: "Exercise Times",
    exerciseDuration: "Exercise Duration",
  };
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedOptionsByGroup, setSelectedOptionsByGroup] = useState(
    Object.keys(USER_RESTRICTION_OPTIONS).reduce((acc, key) => {
      acc[key] = [] as string[];
      return acc;
    }, {} as Record<string, string[]>)
  );

  const saveUserRestrictions = () => {
    try {
      const serializedState = JSON.stringify(selectedOptionsByGroup);
      localStorage.setItem("userRestrictions", serializedState);
      alert("Saved successfully!");
    } catch (error) {
      console.error("Failed to save", error);
      alert("Failed to save your restrictions.");
    }
  };

  const handleGroupChange = (key: string, selected: string[]) => {
    setSelectedOptionsByGroup((prev) => ({
      ...prev,
      [key]: selected,
    }));
  };

  return (
    <>
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
      <p>Any checked item will be excluded from your suggestions</p>
      {Object.entries(USER_RESTRICTION_OPTIONS).map(([key, options]) => (
        <CheckboxMenu
          key={key}
          options={options}
          selectedValues={selectedOptionsByGroup[key]}
          onChange={(selected) => handleGroupChange(key, selected)}
          label={LABELS[key] || key}
        />
      ))}
      <button onClick={saveUserRestrictions}>Save</button>
    </>
  );
};

export default Restrictions;
