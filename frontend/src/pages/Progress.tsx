import React, { useState } from "react";
interface ActivityPost {
  id: string;
  weight: string;
  neckCircumference: string;
  waistCircumference: string;
  hipCircumference: string;
  progressDate: string;
  activityNote?: string;
}

const Progress: React.FC = () => {
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [weight, setWeight] = useState("");
  const [neckCircumference, setNeckCircumference] = useState("");
  const [waistCircumference, setWaistCircumference] = useState("");
  const [progressDate, setProgressDate] = useState(getTodayString());
  const [activityNote, setActivityNote] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    const newProgress = {
      id: crypto.randomUUID(),
      userWeight: weight,
      userNeckCircumference: neckCircumference,
      userWaistCircumference: waistCircumference,
      userProgressDate: progressDate,
      activityNote,
    };

    if (!isValidNumber(weight)) {
      setError("Weight must be a valid number!");
      alert(error);
      return error;
    }

    if (!isValidNumber(neckCircumference)) {
      setError("Neck Circumference must be a valid number!");
      alert(error);
      return error;
    }

    try {
      console.log("Saving activity:", newProgress);
      localStorage.setItem("newUserProgress", JSON.stringify(newProgress));
      alert("Progress saved successfully!");
      setWeight("");
      setNeckCircumference("");
      setWaistCircumference("");
      setActivityNote("");
    } catch (error) {
      console.error("Failed to save activity:", error);
      alert("Failed to save Progress.");
    }
  };

  const isValidNumber = (stringValue: string) => {
    const normalized = stringValue.replace(",", ".");
    return /^-?\d+(\.\d+)?$/.test(normalized.trim());
  };

  return (
    <>
      <div className="progress-container">
        <h3 className="progress-heading">Log Progress</h3>

        <label className="progress-label">
          Weight in (kg):
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="progress-input"
          />
        </label>

        <label className="progress-label">
          Neck Circumference (cm):
          <input
            type="text"
            step="any"
            value={neckCircumference}
            onChange={(e) => setNeckCircumference(e.target.value)}
            className="progress-input"
          />
        </label>

        <label className="progress-label">
          Waist Circumference (cm):
          <input
            type="text"
            step="any"
            value={waistCircumference}
            onChange={(e) => setWaistCircumference(e.target.value)}
            className="progress-input"
          />
        </label>

        <label className="progress-label">
          Date:
          <input
            type="date"
            value={progressDate}
            onChange={(e) => setProgressDate(e.target.value)}
            className="progress-date"
          />
        </label>

        <label className="progress-label">
          Notes:
          <textarea
            value={activityNote}
            onChange={(e) => setActivityNote(e.target.value)}
          />
        </label>

        <button onClick={handleSave}>Update Progress</button>
      </div>
    </>
  );
};

export default Progress;
