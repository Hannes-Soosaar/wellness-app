import React, { useState } from "react";

const DateSelector: React.FC<{
  onDateSelect: (date: string) => void;
  label: string;
}> = ({ onDateSelect, label }) => {
  const [date, setDate] = useState("");

  return (
    <div className="date-selector">
      <label>{label}</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={() => onDateSelect(date)} disabled={!date}>
        Confirm Date
      </button>
    </div>
  );
};

export default DateSelector;
