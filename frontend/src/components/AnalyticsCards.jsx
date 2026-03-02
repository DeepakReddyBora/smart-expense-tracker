import { useEffect, useState } from "react";
import API from "../api";
import SkeletonCards from "./SkeletonCards";

export default function AnalyticsCards() {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get("/api/analytics");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // 👉 SHOW SKELETON
  if (loading) return <SkeletonCards />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

      <div className="bg-green-500 dark:bg-green-600 text-white p-6 rounded-xl shadow glow-card card-hover">
        <h3>Total Income</h3>
        <p className="text-2xl font-bold">₹ {stats.totalIncome}</p>
      </div>

      <div className="bg-red-500 dark:bg-red-600 text-white p-6 rounded-xl shadow glow-card card-hover">
        <h3>Total Expense</h3>
        <p className="text-2xl font-bold">₹ {stats.totalExpense}</p>
      </div>

      <div className="bg-indigo-600 dark:bg-indigo-700 text-white p-6 rounded-xl shadow glow-card card-hover">
        <h3>Balance</h3>
        <p className="text-2xl font-bold">₹ {stats.balance}</p>
      </div>

    </div>
  );
}