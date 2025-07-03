import React from "react";
import { useState } from "react";

// Update based on needs
interface AssessmentFieldProps {
  options: readonly string[];
  selectedValue: string;
  onChange?: (selected: string[]) => void;
  label: string;
}

const AssessmentField: React.FC<AssessmentFieldProps> = ({
  options,
  selectedValue: selectedValue,
  onChange,
  label,
}) => {
  // I will request the props  from the BE in the next iterations
  const [selected, setIsSelected] = useState<string>(selectedValue);

  const toggleOption = (option: string) => {
    let newSelected: string[];
    if (selected.includes(option)) {
      newSelected = selected.filter((v) => v !== option);
    } else {
      newSelected = [...selected, option];
    }
    setIsSelected(newSelected);
    if (onChange) onChange(newSelected);
  };

  return (
    <>
      <fieldset className="box-field">
        {" "}
        {<legend className="legend-title">{label}</legend>}
        {options.map((option) => (
          <label key={option} className="radiobox-menu-labels">
            <input
              type="radiobutton"
              value={option}
              checked={selected.includes(option)}
              onChange={() => toggleOption(option)}
            />
            {" " + option}
          </label>
        ))}
      </fieldset>
    </>
  );
};

export default AssessmentField;
