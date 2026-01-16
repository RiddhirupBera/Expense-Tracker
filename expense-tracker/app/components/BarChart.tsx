"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: Record<string, number>;
}

export default function CategoryBarChart({ data }: Props) {
  // Convert object → array (Recharts format)
  const chartData = Object.entries(data).map(([category, amount]) => ({
    category,
    amount,
  }));

  return (
    <div style={{ width: "20rem", height: "13rem" }}>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
