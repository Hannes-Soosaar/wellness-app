import React from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";
import api from "../lib/axios";
import { ResponseData } from "../../../shared/types/api";
import ReactMarkdown from "../components/MarkdownRenderer";

const Advice: React.FC = () => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [advice, setAdvice] = React.useState<string>("");
  const [weeklyAdvice, setWeeklyAdvice] = React.useState<string>("");
  const [monthlyAdvice, setMonthlyAdvice] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGetAdvice = async () => {
    try {
      const response = await api.get<ResponseData<any>>("ai/advice", {
        timeout: 15000,
      });
      if (response.data.success) {
        setAdvice(response.data.data);
        setSuccessMessage("Advice fetched successfully");
      } else {
        setErrorMessage(response.data.message || "Failed to fetch advice");
      }
    } catch (error) {
      console.error("Error fetching advice:", error);
      setErrorMessage("An error occurred while fetching advice");
    }
  };

  const handleGetWeeklyAdvice = async () => {
    try {
      const response = await api.get<ResponseData<any>>("ai/advice/week", {
        timeout: 15000,
      });
      if (response.data.success) {
        setAdvice(response.data.data);
        setSuccessMessage("Weekly advice fetched successfully");
      } else {
        setErrorMessage(
          response.data.message || "Failed to fetch weekly advice"
        );
      }
    } catch (error) {
      console.error("Error fetching weekly advice:", error);
      setErrorMessage("An error occurred while fetching weekly advice");
    }
  };

  const handleGetMonthlyAdvice = async () => {
    try {
      const response = await api.get<ResponseData<any>>("ai/advice/month", {
        timeout: 15000,
      });
      if (response.data.success) {
        setAdvice(response.data.data);
        setSuccessMessage("Monthly advice fetched successfully");
      } else {
        setErrorMessage(
          response.data.message || "Failed to fetch monthly advice"
        );
      }
    } catch (error) {
      console.error("Error fetching monthly advice:", error);
      setErrorMessage("An error occurred while fetching monthly advice");
    }
  };

  return (
    <>
      <div className="vertical-container">
        <h1>Advice</h1>
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
        <div className="advice">
          <div>
            {advice ? (
              <ReactMarkdown content={advice} />
            ) : (
              <div>No advice yet, press the button </div>
            )}
          </div>
          <div>
            {weeklyAdvice ? (
              <ReactMarkdown content={weeklyAdvice} />
            ) : (
              <div>No weekly advice yet, press the button</div>
            )}
          </div>
          <div>
            {monthlyAdvice ? (
              <ReactMarkdown content={monthlyAdvice} />
            ) : (
              <div>No monthly advice yet, press the button</div>
            )}
          </div>
        </div>
        <button onClick={handleGetAdvice} className="advice-button">
          Today
        </button>
        <button onClick={handleGetWeeklyAdvice} className="advice-button">
          Week
        </button>
        <button onClick={handleGetMonthlyAdvice} className="advice-button">
          Month
        </button>
      </div>
    </>
  );
};

export default Advice;
