import { useState } from "react";
import API from "../api";

export default function AddTransaction({ refresh }) {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/api/transactions", {
      type,
      category,
      amount: Number(amount),
      description
    });
    refresh();
    setCategory("");
    setAmount("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6 transition-colors duration-500"
    >
      <h3 className="font-bold mb-2">Add Transaction</h3>

      <select
        className="input dark:bg-gray-700 dark:text-white dark:border-gray-600 smooth"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        placeholder="Category"
        className="input dark:bg-gray-700 dark:text-white dark:border-gray-600 smooth"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Amount"
        className="input dark:bg-gray-700 dark:text-white dark:border-gray-600 smooth"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <input
        placeholder="Description"
        className="input dark:bg-gray-700 dark:text-white dark:border-gray-600 smooth"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="active-scale btn-primary">Add</button>
    </form>
  );
}