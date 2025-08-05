import React, { useState } from "react";
import GoalCard from "../components/GoalCard";
import { USER_GOALS } from "../types/tempMockConstants";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";

interface GoalPost {
  option: string;
  targetDate: string;
  targetValue: number;
}

const Goals: React.FC = () => {
  
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const [selectedGoal, setSelectedGoal] = useState<{
    option: string;
    targetDate: string;
    targetValue: number;
  } | null>(null);

  const handleGoalSelect = (
    option: string,
    targetDate: string,
    targetValue: number
  ) => {
    const goalData: GoalPost = {
      option,
      targetDate,
      targetValue,
    };
    setSelectedGoal(goalData);
    saveGoal(goalData);
  };

  const saveGoal = (goal: GoalPost) => {
    console.log("saving goal");
    try {
      const serializedGoalData = JSON.stringify(goal);
      localStorage.setItem("userGoal", serializedGoalData);
      alert(`Goal "${goal.option}" saved for "${goal.targetDate}"!`);
    } catch (error) {
      console.log("failed to save user goal" + error);
      alert("An error occurred while saving your goal.");
    }
  };

  const isValidNumber = (stringValue: string) => {
    const normalized = stringValue.replace(",", ".");
    return /^-?\d+(\.\d+)?$/.test(normalized.trim());
  };

  console.log(USER_GOALS);
  return (
    <>
      <h3>Select your Goal and timeframe</h3>
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
      <div className="goals-grid">
        {USER_GOALS.map((goal) => (
          <GoalCard
            key={goal.id}
            option={goal.id}
            title={goal.title}
            description={goal.description}
            isSelected={selectedGoal?.option === goal.id}
            onSelect={handleGoalSelect}
          />
        ))}
      </div>
    </>
  );
};

export default Goals;
