import { useEffect, useState } from "react";
import API from "../api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AddTransaction from "../components/AddTransaction";
import TransactionList from "../components/TransactionList";
import AnalyticsCards from "../components/AnalyticsCards";
import Charts from "../components/Charts";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/api/transactions");
      setTransactions(res.data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen dark:text-white transition-colors duration-500">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">

          {/* ANALYTICS */}
          <AnalyticsCards />

          {/*Visual Representation*/}
          <Charts />

          <input
            type="text"
            placeholder="Search by category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 mb-4 border rounded 
                       bg-white text-gray-800 border-gray-300
                       dark:bg-gray-800 dark:text-white dark:border-gray-600
                      focus:outline-none focus:ring-2 focus:ring-indigo-500
                      transition-colors duration-300"
          />

          {/* ADD TRANSACTION */}
          <AddTransaction refresh={() => window.location.reload()} />

          {/* TRANSACTIONS LIST */}
          <TransactionList
            data={transactions.filter(t =>
            t.category.toLowerCase().includes(search.toLowerCase())
            )}
            refresh={() => window.location.reload()}
          />

        </div>
      </div>
    </div>
  );
}