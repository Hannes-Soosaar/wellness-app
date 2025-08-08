import React, { useEffect } from "react";
import { useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";
import {
  RestrictionPost,
  RestrictionResponse,
  ResponseData,
} from "../../../shared/types/api";
import { extractErrorMessage } from "../utils/errorUtility";
import api from "../lib/axios";

import CheckboxMenu from "../components/CheckboxMenu";

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
  const [availableOptionsByGroup, setAvailableOptionsByGroup] = useState<
    Record<string, string[]>
  >({});
  const [selectedOptionsByGroup, setSelectedOptionsByGroup] = useState<
    Record<string, string[]>
  >({});

  function groupByCategory(data: { category: string; restriction: string }[]) {
    console.log("Grouping data by category:", data);
    return data.reduce((acc, { category, restriction }) => {
      if (!acc[category]) acc[category] = [];
      acc[category].push(restriction);
      return acc;
    }, {} as Record<string, string[]>);
  }

  const saveUserRestrictions = async () => {
    const body: RestrictionPost = {
      restrictions: Object.entries(selectedOptionsByGroup).flatMap(
        ([category, restrictions]) =>
          restrictions.map((restriction) => ({ category, restriction }))
      ),
    };

    try {
      const response = await api.post<ResponseData<RestrictionResponse>>(
        "/user/restrictions",
        body
      );
      console.log("Response:", response.data);
      if (response.data.data) {
        setSuccessMessage(response.data.message);
      }
      setSuccessMessage(response.data.message);
    } catch (error) {
      setErrorMessage(extractErrorMessage(error).message);
      console.error("Failed to save user restrictions:", error);
    }
  };

  const handleGroupChange = (key: string, selected: string[]) => {
    setSelectedOptionsByGroup((prev) => ({
      ...prev,
      [key]: selected,
    }));
  };

  useEffect(() => {
    // This get a restrictions Response.
    const getUserRestrictions = async () => {
      try {
        const response = await api.get<ResponseData<RestrictionResponse>>(
          "/user/restrictions"
        );
        if (response.data.data) {
          const { options, userRestrictions } = response.data.data;
          console.log("Fetched restrictions:", response.data);
          setAvailableOptionsByGroup(groupByCategory(options));
          setSelectedOptionsByGroup(groupByCategory(userRestrictions));
        }
        console.log("Available options by group:", availableOptionsByGroup);
        console.log("Selected options by group:", selectedOptionsByGroup);
      } catch (error) {
        setErrorMessage(extractErrorMessage(error).message);
      }
    };
    getUserRestrictions();
  }, []);
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
      {Object.entries(availableOptionsByGroup).map(([category, options]) => (
        <CheckboxMenu
          key={category}
          options={options}
          selectedValues={selectedOptionsByGroup[category] || []}
          onChange={(selected) => handleGroupChange(category, selected)}
          label={LABELS[category] || category}
        />
      ))}
      <button onClick={saveUserRestrictions}>Save</button>
    </>
  );
};

export default Restrictions;
