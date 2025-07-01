import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface WeightDataPoint {
  time: string;
  weight: number;
}

const data: WeightDataPoint[] = [
  { time: "2025-06-01", weight: 70 },
  { time: "2025-06-05", weight: 69.5 },
  { time: "2025-06-10", weight: 69 },
  { time: "2025-06-15", weight: 68.7 },
  { time: "2025-06-20", weight: 68.5 },
  { time: "2025-06-25", weight: 68.2 },
  { time: "2025-06-30", weight: 68 },
];

const Overview: React.FC = () => {
  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
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
      </ResponsiveContainer>
    </>
  );
};

export default Overview;
