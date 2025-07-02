import React from "react";
import { useState } from "react";
import { USER_RESTRICTION_OPTIONS } from "../types/tempMockConstansts";
import { FOOD_INGREDIENTS } from "../types/tempMockConstansts";
import CheckboxMenu from "../components/CheckboxMenu";

const Restrictions: React.FC = () => {
  // the Selected foods need to be populated from the user DB
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);

  return (
    <>
      <p>Add and review your limitations and restrictions</p>
      <CheckboxMenu
        options={FOOD_INGREDIENTS}
        selectedValues={selectedFoods}
        onChange={setSelectedFoods}
        label="Restricted Foods"
      />
    </>
  );
};

export default Restrictions;
