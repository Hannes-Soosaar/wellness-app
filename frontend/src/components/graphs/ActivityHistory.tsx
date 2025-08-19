import React, { useEffect, useState } from "react";
import api from "../../lib/axios";
import {
  ActivityDataPoint,
  GraphRequest,
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

const ActivityHistory: React.FC = () => {
  const [activities, setActivities] = useState<ActivityDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [granularity, setGranularity] = useState<"day" | "week" | "month">(
    "day"
  );

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [fromDate, setFromDate] = useState<Date | null>(firstDayOfMonth);
  const [toDate, setToDate] = useState<Date | null>(today);

  useEffect(() => {
    const fetchActivities = async () => {
      const requestParams: GraphRequest = {
        granularity: "day",
        from: firstDayOfMonth.toISOString().split("T")[0],
        to: today.toISOString().split("T")[0],
        metrics: ["total_duration", "total_calories", "count"],
      };
      try {
        setLoading(true);
        const data = await api.get<ResponseData<ActivityDataPoint[]>>(
          "api/activity/history",
          { params: requestParams }
        );
        setActivities(data.data?.data || []);
        if (data.data.success) {
          setSuccessMessage("Activities fetched successfully");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch activities");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getActivities = async () => {
    if (!fromDate || !toDate) return;

    const requestParams: GraphRequest = {
      granularity: granularity,
      from: fromDate.toISOString().split("T")[0],
      to: toDate.toISOString().split("T")[0],
      metrics: ["total_duration", "total_calories", "count"],
    };

    try {
      setLoading(true);
      const data = await api.get<ResponseData<ActivityDataPoint[]>>(
        "api/activity/history",
        { params: requestParams }
      );
      setActivities(data.data?.data || []);
      if (data.data.success) {
        setSuccessMessage("Activities fetched successfully");
      }
    } catch (error) {
      setErrorMessage("Failed to fetch activities");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = activities.map((a) => ({
    date: new Date(a.date).toLocaleDateString(),
    duration: a.total_duration,
    calories: a.total_calories,
    count: a.count,
  }));

  if (loading)
    return (
      <>
        <p>Loading activity history...</p>
        <Loader />
      </>
    );

  return (
    <div>
      <h3>Activity History</h3>
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
      {activities.length === 0 ? (
        <p>No activity data found.</p>
      ) : (
        <>
          <p>Select the summary range and update</p>
          <div style={{ marginBottom: "1rem" }}>
            {(["day", "week", "month"] as const).map((g) => (
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
            onClick={getActivities}
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
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="duration"
                stroke="#8884d8"
                name="Duration (min)"
              />
              <Line
                type="monotone"
                dataKey="calories"
                stroke="#82ca9d"
                name="Calories Burned"
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#ff7300"
                name="Activity Count"
              />
            </LineChart>
          </ResponsiveContainer>

          <details>
            <summary>Show Activity table</summary>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Total Duration</th>
                  <th>Total Calories</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.date}>
                    <td>{new Date(activity.date).toLocaleDateString()}</td>
                    <td>{activity.total_duration}</td>
                    <td>{activity.total_calories}</td>
                    <td>{activity.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </>
      )}
    </div>
  );
};
export default ActivityHistory;
