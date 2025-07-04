import React, { useState } from "react";
import GoalCard from "../components/GoalCard";
import { USER_GOALS } from "../types/tempMockConstants";
import DateSelector from "../components/DateSelector";

interface GoalPost {
  option: string;
  targetDate: string;
}

const Goals: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<{
    option: string;
    targetDate: string;
  } | null>(null);
  const [goalPost, setGoalPost] = useState<GoalPost>([]);

  const handleGoalSelect = (option: string, targetDate: string) => {
    const goalData: GoalPost = {
      option,
      targetDate,
    };
    setSelectedGoal(goalData);
    saveGoal(goalData);
  };

  const handleDateSelect = (targetDate: string) => {
    if (!selectedGoal) return;
    const newGoal: GoalPost = { option: selectedGoal, targetDate: targetDate };
    saveGoal(newGoal);
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

  console.log(USER_GOALS);
  return (
    <>
      <h3>Select your Goal and timeframe</h3>
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
        <DateSelector
          onDateSelect={handleDateSelect}
          label={`Set target date for "${selectedGoal}"`}
        ></DateSelector>
      </div>
    </>
  );
};

export default Goals;
