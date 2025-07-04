import React, { useState } from "react";

interface CardProps {
  title: string;
  description: string;
  options: string;
  isSelected: boolean;
}

const GoalCard: React.FC<CardProps> = ({
  title,
  description,
  option,
  isSelected,
}) => {
  const [selectedOption, setIsSelected] = useState<string>;

  return <> </>;
};

export default GoalCard;
