import React, { useState } from "react";

interface GoalCardProps {
  title: string;
  description: string;
  option: string;
  isSelected: boolean;
  onSelect: (option: string, targetDate: string, targetValue: number) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({
  title,
  description,
  option,
  isSelected,
  onSelect,
}) => {
  const getDefaultDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    return today.toISOString().split("T")[0];
  };

  const [date, setDate] = useState(getDefaultDate());
  const [targetValue, setTargetValue] = useState<number>(0);

  const handleSelect = () => {
    if (targetValue <= 0) {
      alert("Please enter a goal value");
      return;
    }
    onSelect(option, date, targetValue);
  };

  return (
    <>
      <div
        className={`card-container ${
          isSelected ? "active-card" : "inactive-card"
        }`}
      >
        <h4>{title}</h4>
        <p>{description}</p>
        <label className="date-label"></label>

        <label className="date-label">
          Target Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="date-input"
          />
        </label>

        <label className="value-label">
          Target Value:
          <input
            type="number"
            value={targetValue}
            onChange={(e) => setTargetValue(Number(e.target.value))}
            placeholder="Enter target value"
            className="value-input"
            min={1}
          />
        </label>

        <button onClick={handleSelect}> Set active</button>

        {isSelected && <p className="selected-goal-text">Goal in progress</p>}
      </div>
    </>
  );
};

export default GoalCard;
