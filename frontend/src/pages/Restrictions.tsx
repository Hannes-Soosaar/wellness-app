import React from "react";
import { useState } from "react";
import { USER_RESTRICTION_OPTIONS } from "../types/tempMockConstants";

import CheckboxMenu from "../components/CheckboxMenu";
const Restrictions: React.FC = () => {
  // TODO:

  const [selectedOptionsByGroup, setSelectedOptionsByGroup] = useState(
    Object.keys(USER_RESTRICTION_OPTIONS).reduce((acc, key) => {
      acc[key] = [] as string[];
      return acc;
    }, {} as Record<string, string[]>)
  );
  // Modify to save to the backend
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
      <p>Any checked item will not be excluded from your suggestions </p>
      {Object.entries(USER_RESTRICTION_OPTIONS).map(([key, options]) => (
        <CheckboxMenu
          key={key}
          options={options}
          selectedValues={selectedOptionsByGroup[key]}
          onChange={(selected) => handleGroupChange(key, selected)}
          label={key}
        />
      ))}
      <button onClick={saveUserRestrictions}>Save</button>
    </>
  );
};

export default Restrictions;
