import React from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";
import api from "../lib/axios";
import { ResponseData } from "../../../shared/types/api";
import ReactMarkdown from "../components/MarkdownRenderer";
import Loader from "../components/Loader";
import { AiRequestData } from "../../../shared/types/ai";
import { useEffect, useState } from "react";

type AdviceType =
  | "daily-advice"
  | "weekly-advice"
  | "monthly-advice"
  | "daily-summary"
  | "weekly-summary"
  | "monthly-summary";

const Advice: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [advice, setAdvice] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [adviceType, setAdviceType] = useState<AdviceType>("weekly-advice");

  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");

  const fetchAdvice = async (type: AdviceType) => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    setAdvice("");

    const today = new Date();
    let from = "";
    let to = "";

    console.log;

    switch (type) {
      case "daily-summary":
        to = today.toISOString().split("T")[0];
        from = to;
        break;
      case "weekly-summary": {
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        from = weekAgo.toISOString().split("T")[0];
        to = today.toISOString().split("T")[0];
        break;
      }
      case "monthly-summary": {
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);
        from = monthAgo.toISOString().split("T")[0];
        to = today.toISOString().split("T")[0];
        break;
      }
      default:
        // daily/weekly/monthly *advice* don’t need date ranges
        from = "";
        to = "";
    }

    setFromDate(from);
    setToDate(to);

    const requestData: AiRequestData = {
      type,
      from,
      to,
    };

    try {
      const response = await api.post<ResponseData<string>>(
        "/ai/advice",
        requestData
      );
      if (response.data.success && response.data.data) {
        setAdvice(response.data.data);
        setSuccessMessage(`${type.replace("-", " ")} fetched successfully`);
      } else if (response.data.data) {
        setErrorMessage("AI offline cached reply.");
        setSuccessMessage("Fetched latest saved advice");
        const savedResponse = response.data.data;
        console.log("Saved response:", savedResponse);
        setAdvice(response.data.data);
      } else {
        setErrorMessage(response.data.message || "Failed to fetch advice");
      }
    } catch (error) {
      console.error("Error fetching advice:", error);
      setErrorMessage(`An error occurred while fetching ${type}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="vertical-container">
        <h3>Advice</h3>
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

        <div className="advice-container">
          <div className="advice-container">
            {isLoading ? (
              <div>Loading...</div>
            ) : advice ? (
              <ReactMarkdown content={advice} />
            ) : (
              <div>No advice yet. Press a button below.</div>
            )}
          </div>

          <div className="advice-buttons">
            <button onClick={() => fetchAdvice("daily-advice")}>Today</button>
            <button onClick={() => fetchAdvice("weekly-advice")}>Week</button>
            <button onClick={() => fetchAdvice("monthly-advice")}>Month</button>
            <button onClick={() => fetchAdvice("daily-summary")}>
              Daily Summary
            </button>
            <button onClick={() => fetchAdvice("weekly-summary")}>
              Weekly Summary
            </button>
            <button onClick={() => fetchAdvice("monthly-summary")}>
              Monthly Summary
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Advice;
