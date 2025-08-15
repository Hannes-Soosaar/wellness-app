import React from "react";
import { useState, useEffect } from "react";
import api from "../lib/axios";
import { extractErrorMessage } from "../utils/errorUtility";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";
import { PushupAndWalk, ResponseData } from "../../../shared/types/api";

//
const PushupsWalk: React.FC = () => {
  const [pushups, setPushups] = useState<string>("");
  const [walkMinutes, setWalkMinutes] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchWalkAndPushupData = async () => {
      try {
        const response = await api.get<ResponseData<PushupAndWalk>>(
          "/user/pushupswalk"
        );
        if (response.data.success && response.data.data) {
          const data = response.data.data;
          setPushups(data.currentPushups.toString());
          setWalkMinutes(data.currentWalkingMinutes.toString());
        }
      } catch (error) {
        setErrorMessage(extractErrorMessage(error).message);
        console.error("Failed to fetch pushups and walk minutes:", error);
      }
    };

    fetchWalkAndPushupData();
  }, []);

  const handleSave = async () => {
    const pushupAndWalkPost: PushupAndWalk = {
      currentPushups: Number(pushups ?? 0) || 0,
      currentWalkingMinutes: Number(walkMinutes ?? 0) || 0,
    };
    console.log("Saving pushups and walk minutes:", pushupAndWalkPost);
    if (
      pushupAndWalkPost.currentPushups == null ||
      pushupAndWalkPost.currentWalkingMinutes == null
    ) {
      setErrorMessage("Please enter valid pushups and walk minutes.");
      return;
    }
    try {
      // Assuming there's an API endpoint to save pushups and walk minutes
      await api.post("/user/pushupswalk", pushupAndWalkPost);
      setSuccessMessage("Data saved successfully!");
      setPushups(pushups);
      setWalkMinutes(walkMinutes);
    } catch (error) {
      setErrorMessage(extractErrorMessage(error).message);
    }
  };

  return (
    <div>
      <h3>Pushups and Walk Minutes</h3>
      <ErrorMessage
        message={errorMessage}
        duration={3000}
        onDismiss={() => setErrorMessage("")}
      />
      <SuccessMessage
        message={successMessage}
        duration={3000}
        onDismiss={() => setSuccessMessage("")}
      />
      <label key="pushups">Max pushups in a set</label>
      <input
        type="text"
        value={pushups}
        onChange={(e) => setPushups(e.target.value)}
        placeholder="Enter max pushups"
      />
      <label key="walk">Max Walking time in minutes</label>
      <input
        type="text"
        value={walkMinutes}
        onChange={(e) => setWalkMinutes(e.target.value)}
        placeholder="Enter max walk length in minutes"
      />
      <br />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default PushupsWalk;
