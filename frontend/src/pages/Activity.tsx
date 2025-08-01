import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import {
  ActivityPost,
  ResponseData,
  ActivityOptions,
} from "../../../shared/types/api";
import { extractErrorMessage } from "../utils/errorUtility";
import { ErrorMessage } from "../components/ErrorMessage";

const Activity: React.FC = () => {
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const isValidNumber = (stringValue: string): boolean => {
    const normalized = stringValue.replace(",", ".");
    return /^-?\d+(\.\d+)?$/.test(normalized.trim());
  };

  // To avoid making copies of the userActivityPost each entry field, will be first stored separately
  // If time permits redo this with useReducer
  const [activityType, setActivityType] = useState("");
  const [activityDuration, setActivityDuration] = useState<number>(0);
  const [activityIntensity, setActivityIntensity] = useState("");
  const [activityDate, setActivityDate] = useState(getTodayString());
  const [activityNote, setActivityNote] = useState("");
  const [errorMessage, setError] = useState("");
  const [message, setMessage] = useState("");
  const [availableOptions, setAvailableOptions] = useState<string[]>([]);

  //TODO get user Activity Types

  const handleSave = async () => {
    const userActivityPost: ActivityPost = {
      activityType,
      activityDuration,
      activityIntensity,
      activityDate,
      activityNote,
    };

    try {
      console.log("Saving activity:", userActivityPost);
      localStorage.setItem("latestActivity", JSON.stringify(userActivityPost));
      alert("Activity saved successfully!");
      setActivityType("");
      setActivityDuration(0);
      setActivityIntensity("");
      setActivityDate("");
      setActivityNote("");
    } catch (error) {
      setError(extractErrorMessage(error).message);
      console.error("Failed to save activity:", error);
    }

    try {
      const response = await api.post<ResponseData<null>>(
        "user/activity",
        userActivityPost
      );
      if (response.data.success) {
        setMessage(response.data.message);
      }
      if (response.data.error) {
        setError(response.data.error);
      }
    } catch (error) {
      setError(extractErrorMessage(error).message);
    }
  };

  // Get the initial options.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<ResponseData<ActivityOptions>>(
          "user/activity/options"
        );
        if (response.data.success) {
          const options = response.data.data?.activities;
          if (options) {
            setAvailableOptions(options);
          } else {
            setError("There options are unknown");
          }
        }
        if (response.data.error) {
          setError(response.data.error);
        }
      } catch (error) {
        setError(extractErrorMessage(error).message);
      }
    };
    fetchData();
  }, []);

  // TODO next iteration provide delete option and list view of paginated activities
  return (
    <>
      <div className="activity-container">
        <ErrorMessage message={errorMessage} duration={5000} />
        <h3 className="activity-heading">Log New Activity</h3>
        <label className="activity-label">
          Activity Type:
          <select
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
            className="activity-input"
          >
            {availableOptions.map((activity) => (
              <option key={activity} value={activity}>
                {activity}
              </option>
            ))}
          </select>
        </label>

        <label className="activity-label">
          Duration (minutes):
          <input
            type="number"
            min="0"
            value={activityDuration}
            onChange={(e) => {
              setActivityDuration(Number(e.target.value));
            }}
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
