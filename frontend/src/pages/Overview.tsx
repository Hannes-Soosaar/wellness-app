import React from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";
import ActivityHistory from "../components/graphs/ActivityHistory";
import ProgressHistory from "../components/graphs/ProgressHistory";

const Overview: React.FC = () => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  return (
    <>
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
      <details>
        <summary>Show Progress History</summary>

        <ProgressHistory />
      </details>

      <details>
        <summary>Show Activity History</summary>
        <ActivityHistory />
      </details>
      {/* <ResponsiveContainer width="80%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis dataKey="weight" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer> */}
    </>
  );
};

export default Overview;
