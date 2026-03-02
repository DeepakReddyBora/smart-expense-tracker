import { useEffect, useState } from "react";
import API from "../api";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#ef4444", "#f59e0b", "#0ea5e9"];

export default function Charts() {
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await API.get("/api/analytics");

      const category = Object.entries(res.data.categoryTotals)
        .map(([key, value]) => ({ name: key, value }));

      const monthly = Object.entries(res.data.monthlyTotals)
        .map(([key, value]) => ({ name: key, value }));

      setCategoryData(category);
      setMonthlyData(monthly);
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

      {/* CATEGORY PIE */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow transition-colors duration-500">
        <h3 className="font-bold mb-2">Category Breakdown</h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={categoryData} dataKey="value" label>
              {categoryData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                border: "none",
                boxShadow: "none",
                backgroundColor: "rgba(0,0,0,0.7)",
                color: "white",
                borderRadius: "6px"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* MONTHLY BAR */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow transition-colors duration-500">
        <h3 className="font-bold mb-2">Monthly Trend</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData} style={{ background: "transparent" }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              cursor={{fill: "transparent"}}
              contentStyle={{
                border: "none",
                boxShadow: "none",
                backgroundColor: "rgba(0,0,0,0.7)",
                color: "white",
                borderRadius: "6px"
              }}
            />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}