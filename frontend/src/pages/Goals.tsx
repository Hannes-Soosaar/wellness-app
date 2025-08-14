import React, { useEffect, useState } from "react";
import GoalCard from "../components/GoalCard";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";
import { extractErrorMessage } from "../utils/errorUtility";
import api from "../lib/axios";
import {
  ResponseData,
  GoalPost,
  GoalData,
  AvailableGoal,
} from "../../../shared/types/api";

const Goals: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // const [goalId, setGoalId] = useState<string | null>(null);
  // const [goalTargetValue, setGoalTargetValue] = useState<string>("");
  // const [goalEndDate, setGoalEndDate] = useState<string>("");
  const [availableGoals, setAvailableGoals] = useState<AvailableGoal[]>([]);
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
    updateGoal(goalData);
  };

  const updateGoal = async (goal: GoalPost) => {
    if (!goal.goal_id || !goal.end_date || goal.target_value <= 0) {
      alert("Please select a valid goal with a target value and date.");
      return;
    }
    try {
      const response = await api.post<ResponseData<null>>("/user/goals", goal);
      if (response.data.success) {
        setSuccessMessage("Goal updated successfully!");
        setSelectedGoal(goal);
      } else {
        setErrorMessage(response.data.error || "Failed to update goal.");
      }
    } catch (error) {
      console.log("failed to save user goal" + error);
      setErrorMessage(extractErrorMessage(error).message);
      alert("An error occurred while saving your goal.");
    }
  };

  useEffect(() => {
    const getGoals = async () => {
      try {
        const response = await api.get<ResponseData<GoalData>>("user/goals");

        if (!response.data?.data) {
          setErrorMessage("Failed to fetch goals or user goal.");
          return;
        }

        const { availableGoals, userGoal } = response.data.data;
        console.log("Fetched goals:", availableGoals, userGoal);

        setAvailableGoals(availableGoals);
        if (userGoal) {
          setSelectedGoal({
            goal_id: userGoal.goal_id,
            end_date: userGoal.end_date,
            target_value: userGoal.target_value,
          });
        }
      } catch (error) {
        setErrorMessage(extractErrorMessage(error).message);
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
        {availableGoals.length > 0 ? (
          availableGoals.map((availableGoal) => (
            <GoalCard
              key={availableGoal.goal_id}
              goal={availableGoal}
              isSelected={selectedGoal?.goal_id === availableGoal.goal_id}
              onSelect={handleGoalSelect}
            />
          ))
        ) : (
          <p>No Active Goals Available to select</p>
        )}
      </div>
    </>
  );
};

export default Goals;
