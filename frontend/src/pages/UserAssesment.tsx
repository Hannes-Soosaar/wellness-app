import React from "react";
import { useState, useEffect } from "react";
import { USER_ASSESSMENT_OPTIONS } from "../types/tempMockConstants";
import AssessmentField from "../components/AssessmentFiled";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";
import api from "../lib/axios";
import {
  AssessmentOptions,
  AssessmentState,
  ResponseData,
  UserAssessments,
  AssessmentOption,
} from "../../../shared/types/api";
import { extractErrorMessage } from "../utils/errorUtility";

const UserAssessment: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [availableOptionsByGroup, setAvailableOptionsByGroup] = useState<
    Record<string, AssessmentOption[]>
  >({});
  const [selectedAssessmentOptions, setSelectedOptionsByGroup] = useState<
    Record<string, string>
  >({});

  // function groupByCategory(data: { category: string; value: string }[]) {
  //   console.log("Grouping data by category:", data);
  //   return data.reduce((acc, { category, value }) => {
  //     if (!acc[category]) acc[category] = [];
  //     acc[category].push(value);
  //     return acc;
  //   }, {} as Record<string, string[]>);
  // }

  function groupByCategory(data: AssessmentOption[]) {
    console.log("Grouping data by category:", data);
    return data.reduce((acc, option) => {
      if (!acc[option.category]) acc[option.category] = [];
      acc[option.category].push(option);
      return acc;
    }, {} as Record<string, AssessmentOption[]>);
  }

  function groupSelectedAssessments(
    data: { category: string; value: string }[]
  ): Record<string, string> {
    console.log("Grouping selected assessments:", data);
    return data.reduce((acc, { category, value }) => {
      acc[category] = value; // Single value per category
      return acc;
    }, {} as Record<string, string>);
  }

  const handleGroupChange = (key: string, selected: string) => {
    setSelectedOptionsByGroup((prev) => ({
      ...prev,
      [key]: selected,
    }));
  };

  const saveUserAssessment = async () => {
    const body: UserAssessments = {
      assessments: Object.entries(selectedAssessmentOptions).map(
        ([category, value]) => ({ category, value })
      ),
    };

    try {
      const response = await api.post<ResponseData<AssessmentState>>(
        "user/assessment",
        body
      );

      if (response.data.data) {
        setSuccessMessage(response.data.message);
        //TODO update the state again
      }
    } catch (error) {
      setErrorMessage(extractErrorMessage(error).message);
    }
  };

  useEffect(() => {
    const getAssessmentStatus = async () => {
      try {
        const response = await api.get<ResponseData<AssessmentState>>(
          "/user/assessment/options/"
        );
        if (response.data.data) {
          const { options, userAssessments } = response.data.data;
          console.log("Fetched assessment options:", response.data);
          console.log("Fetched user assessments:", userAssessments);
          console.log("Fetched options:", options);

          const optionArray = Array.isArray(options)
            ? options
            : options.options;

          const assessmentArray = Array.isArray(userAssessments)
            ? userAssessments
            : userAssessments.assessments;

          setAvailableOptionsByGroup(groupByCategory(optionArray));
          setSelectedOptionsByGroup(groupSelectedAssessments(assessmentArray));
        }
      } catch (error) {
        setErrorMessage(extractErrorMessage(error).message);
        console.error("Failed to fetch assessment options:", error);
      }
    };
    getAssessmentStatus();
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
      {Object.entries(availableOptionsByGroup).map(([key, value]) => (
        <AssessmentField
          key={key}
          options={value}
          title={"Place holder"}
          description={"Place holder description"}
          selectedValue={selectedAssessmentOptions[key] || ""}
          onChange={(selected) => handleGroupChange(key, selected)}
          label={key}
        />
      ))}

      <button onClick={saveUserAssessment}>Save</button>
    </>
  );
};

export default UserAssessment;
