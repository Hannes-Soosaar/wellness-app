import React, { useState } from "react";

interface ActivityPost {
  id: string;
  activityType: string;
  activityDuration: number;
  activityIntensity: string;
  activityDate: string;
  activityNote?: string;
}

const Activity: React.FC = () => {
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const isValidNumber = (stringValue: string) => {
    const normalized = stringValue.replace(",", ".");
    return /^-?\d+(\.\d+)?$/.test(normalized.trim());
  };

  const [activityType, setActivityType] = useState("");
  const [activityDuration, setActivityDuration] = useState<number>(0);
  const [activityIntensity, setActivityIntensity] = useState("");
  const [activityDate, setActivityDate] = useState(getTodayString());
  const [activityNote, setActivityNote] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    const newActivityPost = {
      id: crypto.randomUUID(),
      activityType,
      activityDuration,
      activityIntensity,
      activityDate,
      activityNote,
    };

    try {
      console.log("Saving activity:", newActivityPost);
      localStorage.setItem("latestActivity", JSON.stringify(newActivityPost));
      alert("Activity saved successfully!");
      setActivityType("");
      setActivityDuration(0);
      setActivityIntensity("");
      setActivityDate("");
      setActivityNote("");
    } catch (error) {
      console.error("Failed to save activity:", error);
      alert("Failed to save activity.");
    }
  };

  return (
    <>
      <div className="activity-container">
        <h3 className="activity-heading">Log New Activity</h3>
        <label className="activity-label">
          Activity Type:
          <select
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
            className="activity-input"
          >
            <option value="">Select Intensity</option>
            <option value="cardio">Cardio</option>
            <option value="strength">Strength</option>
            <option value="hit">HIT</option>
            <option value="mixed">Mixed</option>
            <option value="running">Running</option>
          </select>
        </label>

        <label className="activity-label">
          Duration (minutes):
          <input
            type="text"
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
            className="activity-input"
          />
        </label>

        <label className="activity-label">
          Intensity:
          <select
            value={activityIntensity}
            onChange={(e) => setActivityIntensity(e.target.value)}
            className="activity-input"
          >
            <option value="">Select Intensity</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        </label>

        <label className="activity-label">
          Date:
          <input
            type="date"
            value={activityDate}
            onChange={(e) => setActivityDate(e.target.value)}
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
export default Activity;
