import React, { useEffect, useState } from "react";
import GoalCard from "../components/GoalCard";
import { USER_GOALS } from "../types/tempMockConstants";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";
import api from "../lib/axios";
import { ResponseData, GoalPost } from "../../../shared/types/api";

// interface GoalPost {
//   option: string;
//   targetDate: string;
//   targetValue: number;
// }

const Goals: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [goalId, setGoalId] = useState<string | null>(null);
  const [goalTargetValue, setGoalTargetValue] = useState<string>("");
  const [goalEndDate, setGoalEndDate] = useState<string>("");
  const [selectedGoal, setSelectedGoal] = useState<GoalPost>({
    goal_id: 0,
    end_date: "",
    target_value: 0,
  });

  const handleGoalSelect = (
    goal_id: number,
    end_date: string,
    target_value: number
  ) => {
    const goalData: GoalPost = {
      goal_id,
      end_date,
      target_value,
    };
    setSelectedGoal(goalData);
    updateGoal();
  };

  const updateGoal = async () => {
    const goal: GoalPost = {
      goal_id: goalId || 0,
      end_date: goalEndDate,
      target_value: Number(goalTargetValue),
    };

    try {
      const response = await api.post<ResponseData<null>>("/goals", goal);
      // const serializedGoalData = JSON.stringify(goal);
      // localStorage.setItem("userGoal", serializedGoalData);
      // alert(`Goal "${goal.option}" saved for "${goal.targetDate}"!`);
    } catch (error) {
      console.log("failed to save user goal" + error);
      alert("An error occurred while saving your goal.");
    }
  };

  const isValidNumber = (stringValue: string) => {
    const normalized = stringValue.replace(",", ".");
    return /^-?\d+(\.\d+)?$/.test(normalized.trim());
  };

  useEffect(() => {
    const getGoals = async () => {
      try {
        const [availableGoals, userGoal] = await api.get<
          ResponseData<GoalData>
        >("/goals");

        if (!availableGoals.data || !userGoal.data) {
          setErrorMessage("Failed to fetch goals or user goal.");
          return;
        }
      } catch (error) {
        setErrorMessage("An error occurred while fetching goals.");
        console.error("Error fetching goals:", error);
      }
    };

    getGoals();
  }, []);
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
