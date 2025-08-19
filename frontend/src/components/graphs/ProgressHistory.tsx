import React, { useEffect, useState } from "react";
import api from "../../lib/axios";
import {
  GraphRequest,
  ProgressDataPoint,
} from "../../../../shared/types/graphs";
import { ResponseData } from "../../../../shared/types/api";
import Loader from "../Loader";
import { ErrorMessage } from "../ErrorMessage";
import { SuccessMessage } from "../SuccessMessage";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProgressHistory: React.FC = () => {
  type ViewMode = "measures" | "weight" | "physical" | "goal";
  const [progress, setProgress] = useState<ProgressDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [granularity, setGranularity] = useState<
    "day" | "week" | "month" | "none"
  >("none");
  const [goal, setGoal] = useState<string>("");

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [fromDate, setFromDate] = useState<Date | null>(firstDayOfMonth);
  const [toDate, setToDate] = useState<Date | null>(today);
  // Based on goal type we will filter the UI to show only relevant data
  const [viewMode, setViewMode] = useState<ViewMode>("weight");

  useEffect(() => {
    const fetchProgressHistory = async () => {
      const requestParams: GraphRequest = {
        granularity: "day",
        from: firstDayOfMonth.toISOString().split("T")[0],
        to: today.toISOString().split("T")[0],
        metrics: ["all"],
      };
      try {
        setLoading(true);
        const data = await api.get<ResponseData<ProgressDataPoint[]>>(
          "api/progress/history",
          { params: requestParams }
        );
        setProgress(data.data?.data || []);
        if (data.data.success) {
          setSuccessMessage("Activities fetched successfully");
          setGoal(data.data.data[0]?.goal || "");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch activities");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressHistory();
  }, []);

  const getProgress = async () => {
    if (!fromDate || !toDate) return;
    const requestParams: GraphRequest = {
      granularity: granularity,
      from: fromDate.toISOString().split("T")[0],
      to: toDate.toISOString().split("T")[0],
      metrics: ["all"], // Fetch all metrics for the progress chart
    };

    try {
      setLoading(true);
      const data = await api.get<ResponseData<ProgressDataPoint[]>>(
        "api/progress/history",
        { params: requestParams }
      );
      setProgress(data.data?.data || []);
      if (data.data.success) {
        setSuccessMessage("Progress fetched successfully");
        setGoal(data.data.data[0]?.goal || ""); // takes the value from the fist element Only OK because we have one goal that can be active
      }
    } catch (error) {
      setErrorMessage("Failed to fetch activities");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = progress.map((a) => ({
    date: new Date(a.date).toLocaleDateString(),
    bmi: a.bmi,
    bodyFat: a.fatPercentage,
    weight: a.weight,
  }));

  if (loading)
    return (
      <>
        <p>Loading activity history...</p>
        <Loader />
      </>
    );

  return (
    <>
      <div>
        <h3>Progress History</h3>

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

        {progress.length === 0 ? (
          <p>No activity data found.</p>
        ) : (
          <>
            <p>Select the progress type to view</p>
            <div style={{ marginBottom: "1rem" }}>
              {(["measures", "weight", "physical", "goal"] as const).map(
                (vm) => (
                  <button
                    key={vm}
                    style={{
                      marginRight: "0.5rem",
                      backgroundColor: viewMode === vm ? "#4caf50" : "#ddd",
                      color: viewMode === vm ? "white" : "black",
                      padding: "0.5rem 1rem",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => setViewMode(vm)}
                  >
                    {vm.charAt(0).toUpperCase() + vm.slice(1)}
                  </button>
                )
              )}
            </div>
            <p>Select the summary range and update</p>
            <div style={{ marginBottom: "1rem" }}>
              {(["day", "week", "month", "none"] as const).map((g) => (
                <button
                  key={g}
                  style={{
                    marginRight: "0.5rem",
                    backgroundColor: granularity === g ? "#4caf50" : "#ddd",
                    color: granularity === g ? "white" : "black",
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => setGranularity(g)}
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>

            <button
              onClick={getProgress}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              update Activities
            </button>

            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label>From: </label>
                <DatePicker
                  selected={fromDate}
                  onChange={(date) => setFromDate(date)}
                />
              </div>
              <div>
                <label>To: </label>
                <DatePicker
                  selected={toDate}
                  onChange={(date) => setToDate(date)}
                />
              </div>
            </div>
            <>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#8884d8"
                    name="Weight"
                  />
                  <Line
                    type="monotone"
                    dataKey="bodyFat"
                    stroke="#82ca9d"
                    name="Body fat %"
                  />
                  {goal ? (
                    <Line
                      type="monotone"
                      dataKey="goal"
                      stroke="ff7300"
                      name="${goal}"
                    />
                  ) : null}
                  <Line
                    type="monotone"
                    dataKey="bmi"
                    stroke="#ff7300"
                    name="BMI"
                  />
                </LineChart>
              </ResponsiveContainer>
            </>
          </>
        )}
      </div>
    </>
  );
};

export default ProgressHistory;
