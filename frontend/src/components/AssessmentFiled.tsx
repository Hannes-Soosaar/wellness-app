import React from "react";
import { useState } from "react";
import { AssessmentOption } from "../../../shared/types/api";

// Update based on needs
interface AssessmentFieldProps {
  options: readonly AssessmentOption[];
  title?: string;
  description?: string;
  selectedValue: string;
  onChange?: (selected: string) => void;
  // label: { category: string };
}

const AssessmentField: React.FC<AssessmentFieldProps> = ({
  options,
  title,
  description,
  selectedValue: selectedValue,
  onChange,
  // label,
}) => {
  const [selected, setIsSelected] = useState<string>(selectedValue);

  const handleChange = (option: string) => {
    setIsSelected(option);
    if (onChange) onChange(option);
  };

  return (
    <>
      <fieldset
        className="box-field"
        title={title || " please provide feedback on your current capability"}
      >
        {" "}
        {<legend className="legend-title">{description}</legend>}
        {options.map((option) => (
          <label key={option.value} className="radiobox-menu-labels">
            <input
              type="radio"
              name={option.category}
              value={option.value}
              checked={selected === option.value}
              onChange={() => handleChange(option.value)}
            />
            {" " + option.value}
          </label>
        ))}
      </fieldset>
    </>
  );
};

export default AssessmentField;
