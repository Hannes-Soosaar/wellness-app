import React from "react";
import { useState } from "react";

// Update based on needs
interface AssessmentFieldProps {
  options: readonly string[];
  selectedValue: string;
  onChange?: (selected: string) => void;
  label: string;
}

const AssessmentField: React.FC<AssessmentFieldProps> = ({
  options,
  selectedValue: selectedValue,
  onChange,
  label,
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
        title="Please provide feedback to get the initial assessment of your physical ability"
      >
        {" "}
        {<legend className="legend-title">{label}</legend>}
        {options.map((option) => (
          <label key={option} className="radiobox-menu-labels">
            <input
              type="radio"
              name={label}
              value={option}
              checked={selected === option}
              onChange={() => handleChange(option)}
            />
            {" " + option}
          </label>
        ))}
      </fieldset>
    </>
  );
};

export default AssessmentField;
