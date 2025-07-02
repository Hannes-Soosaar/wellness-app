import React from "react";
import { useState } from "react";

// all other fields besides the box Options need to be optional, as they will not be passed in initially.
interface CheckboxMenuProps {
  options: readonly string[];
  selectedValues: string[]; // check if its ok to be optional?
  onChange?: (selected: string[]) => void;
  label: string; // must be included the title for the box display
}

const CheckboxMenu: React.FC<CheckboxMenuProps> = ({
  options,
  selectedValues,
  onChange,
  label,
}) => {
  const [selected, setIsSelected] = useState<string[]>(selectedValues); // need to get and populate the selected list from the backend with the user data

  const toggleOption = (option: string) => {
    let newSelected: string[];
    if (selected.includes(option)) {
      newSelected = selected.filter((v) => v !== option); // v is short for value
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
          <label key={option} className="checkbox-menu-labels">
            <input
              type="checkbox"
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

export default CheckboxMenu;
