import React, { useEffect, useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";
import api from "../lib/axios";
import { ProgressPost, ResponseData } from "../../../shared/types/api";
import { extractErrorMessage } from "../utils/errorUtility";

const Progress: React.FC = () => {
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [weight, setWeight] = useState("");
  const [neckCircumference, setNeckCircumference] = useState("");
  const [waistCircumference, setWaistCircumference] = useState("");
  const [hipCircumference, setHipCircumference] = useState("");
  const [progressDate, setProgressDate] = useState(getTodayString());
  const [progressNote, setNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSave = async () => {
    const progressPost: ProgressPost = {
      weight: Number(weight),
      neckCircumference: Number(neckCircumference),
      waistCircumference: Number(waistCircumference),
      hipCircumference: Number(hipCircumference),
      date: progressDate,
      note: progressNote,
    };

    try {
      const response = await api.post<ResponseData<ProgressPost>>(
        "/user/progress",
        progressPost
      );
      console.log("Progress saved successfully:", response);
      setSuccessMessage(
        `Progress updated successfully: ${response.data.message}`
      );
    } catch (error) {
      setErrorMessage(extractErrorMessage(error).message);
      console.error("Failed to save progress:", error);
      return;
    }
  };

  useEffect(() => {
    const getUserProgress = async () => {
      try {
        const response = await api.get<ResponseData<ProgressPost>>(
          "/user/progress"
        );
        console.log("Fetched user progress:", response.data);
        if (response.data.success && response.data.data) {
          const progressPost = response.data.data;
          setWeight(progressPost.weight.toString());
          setNeckCircumference(progressPost.neckCircumference.toString());
          setWaistCircumference(progressPost.waistCircumference.toString());
          setHipCircumference(progressPost.hipCircumference.toString());
          setProgressDate(progressPost.date);
          setNote(progressPost.note || "");
        }
      } catch (error) {
        setErrorMessage(extractErrorMessage(error).message);
        console.error("Failed to load user progress:", error);
      }
    };
    getUserProgress();
  }, []);

  return (
    <>
      <div className="progress-container">
        <h3 className="progress-heading">Log Progress</h3>
        <ErrorMessage
          message={errorMessage}
          duration={5000}
          onDismiss={() => setErrorMessage("")}
        />
        <SuccessMessage
          message={successMessage}
          duration={3000}
          onDismiss={() => setSuccessMessage("")}
        />
        <label className="progress-label">
          Weight in (kg):
          <input
            type="text"
            placeholder={weight}
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value.replace(",", "."));
            }}
            onBlur={() => {
              let num = parseFloat(weight);
              if (isNaN(num)) num = 0;
              if (num < 30) {
                setErrorMessage("Weight must be larger than 30kg");
                num = 30;
              }
              if (num > 250) {
                setErrorMessage("Weight must be smaller than 250kg");
                num = 60;
              }
              setWeight(num.toString());
            }}
            className="progress-input"
          />
        </label>

        <label className="progress-label">
          Neck Circumference (cm):
          <input
            type="text"
            placeholder={neckCircumference}
            value={neckCircumference}
            onChange={(e) => {
              setNeckCircumference(e.target.value.replace(",", "."));
            }}
            onBlur={() => {
              let num = parseFloat(neckCircumference);
              if (isNaN(num)) num = 0;
              if (num < 25) {
                setErrorMessage("Neck circumference must be larger than 25 cm");
                num = 25;
              }
              if (num > 60) {
                setErrorMessage(
                  "Neck circumference must be smaller than 60 cm"
                );
                num = 60;
              }
              setNeckCircumference(num.toString());
            }}
            className="progress-input"
          />
        </label>

        <label className="progress-label">
          Waist Circumference (cm):
          <input
            type="text"
            value={waistCircumference}
            placeholder={waistCircumference}
            onChange={(e) => {
              setWaistCircumference(e.target.value.replace(",", "."));
            }}
            onBlur={() => {
              let num = parseFloat(waistCircumference);
              if (isNaN(num)) num = 0;
              if (num < 50) {
                setErrorMessage(
                  "Waist circumference must be larger than 50 cm"
                );
                num = 50;
              }
              if (num > 160) {
                setErrorMessage(
                  "Waist circumference must be smaller than 160 cm"
                );
                num = 150;
              }
              setWaistCircumference(num.toString());
            }}
            className="progress-input"
          />
        </label>

        <label className="progress-label">
          Hip Circumference (cm):
          <input
            type="text"
            value={hipCircumference}
            placeholder={hipCircumference}
            onChange={(e) => {
              setHipCircumference(e.target.value.replace(",", "."));
            }}
            onBlur={() => {
              let num = parseFloat(hipCircumference);
              if (isNaN(num)) num = 0;
              if (num < 60) {
                setErrorMessage("Hip circumference must be larger than 60 cm");
                num = 60;
              }
              if (num > 160) {
                setErrorMessage(
                  "Hip circumference must be smaller than 160 cm"
                );
                num = 160;
              }
              setHipCircumference(num.toString());
            }}
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
            value={progressNote}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>

        <button onClick={handleSave}>Update Progress</button>
      </div>
    </>
  );
};

export default Progress;
