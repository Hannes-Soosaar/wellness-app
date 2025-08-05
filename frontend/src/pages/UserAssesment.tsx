import React from "react";
import { useState } from "react";
import { USER_ASSESSMENT_OPTIONS } from "../types/tempMockConstants";
import AssessmentField from "../components/AssessmentFiled";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";

const LABELS: Record<string, string> = {
  fitnessLevel: "Fitness Level",
  mobility: "Mobility",
  // Add other mappings
};

const UserAssessment: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedOptionsByGroup, setSelectedOptionsByGroup] = useState(
    Object.keys(USER_ASSESSMENT_OPTIONS).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {} as Record<string, string>)
  );

  const handleGroupChange = (key: string, selected: string) => {
    setSelectedOptionsByGroup((prev) => ({
      ...prev,
      [key]: selected,
    }));
  };

  const saveUserAssessment = () => {
    try {
      const serializedState = JSON.stringify(selectedOptionsByGroup);
      localStorage.setItem("userAssessmentData", serializedState);
      alert("User assessment data saved successfully");
    } catch (error) {
      console.log("failed to save assessment", error);
      alert("Failed to save your wellness assessment data" + error);
    }
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
      {Object.entries(USER_ASSESSMENT_OPTIONS).map(([key, options]) => (
        <AssessmentField
          key={key}
          options={options}
          selectedValue={selectedOptionsByGroup[key]}
          onChange={(selected) => handleGroupChange(key, selected)}
          //   label={LABELS[key] || key}
          label={key}
        />
      ))}

      <button onClick={saveUserAssessment}>Save</button>
    </>
  );
};

export default UserAssessment;
