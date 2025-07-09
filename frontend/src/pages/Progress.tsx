import React, { useState } from "react";
interface ActivityPost {
  id: string;
  weight: number;
  neckCircumference: number;
  waistCircumference: number;
  hipCircumference: number;
  progressDate: string;
  activityNote?: string;
}

const Progress: React.FC = () => {
  const [weight, setWeight] = useState<number>(0);
  const [neckCircumference, setNeckCircumference] = useState<number>(0);
  const [waistCircumference, setWaistCircumference] = useState<number>(0);
  const [progressDate, setProgressDate] = useState("");
  const [activityNote, setActivityNote] = useState("");

  const handleSave = () => {
    const newProgress = {
      id: crypto.randomUUID(),
      userWeight: weight,
      userNeckCircumference: neckCircumference,
      userWaistCircumference: waistCircumference,
      userProgressDate: progressDate,
      activityNote,
    };

    try {
      console.log("Saving activity:", newProgress);

      localStorage.setItem("newUserProgress", JSON.stringify(newProgress));

      alert("Progress saved successfully!");

      setWeight(0);
      setNeckCircumference(0);
      setWaistCircumference(0);
      setActivityNote("");
    } catch (error) {
      console.error("Failed to save activity:", error);
      alert("Failed to save Progress.");
    }
  };

  return (
    <>
      <div className="activity-container">
        <h3 className="activity-heading">Log Progress</h3>

        <label className="activity-label">
          Weight in (kg):
          <input
            type="text"
            step="0.01"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
            className="activity-input"
          />
        </label>

        <label className="activity-label">
          Neck Circumference (cm):
          <input
            type="text"
            step="any"
            value={neckCircumference}
            onChange={(e) => setNeckCircumference(Number(e.target.value))}
            className="activity-input"
          />
        </label>

        <label className="activity-label">
          Waist Circumference (cm):
          <input
            type="text"
            step="any"
            value={waistCircumference}
            onChange={(e) => setWaistCircumference(Number(e.target.value))}
            className="activity-input"
          />
        </label>

        <label className="activity-label">
          Date:
          <input
            type="date"
            value={progressDate}
            onChange={(e) => setProgressDate(e.target.value)}
          />
        </label>

        <label className="activity-label">
          Notes:
          <textarea
            value={activityNote}
            onChange={(e) => setActivityNote(e.target.value)}
          />
        </label>

        <button onClick={handleSave}>Save Activity</button>
      </div>
    </>
  );
};

export default Progress;
