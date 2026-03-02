import Transaction from "../models/transaction.js";

export const getAnalytics = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user });

    let totalIncome = 0;
    let totalExpense = 0;

    const categoryTotals = {};
    const monthlyTotals = {};

    transactions.forEach((t) => {
      if (t.type === "income") totalIncome += t.amount;
      else totalExpense += t.amount;

      // Category
      if (!categoryTotals[t.category]) {
        categoryTotals[t.category] = 0;
      }
      categoryTotals[t.category] += t.amount;

      // Monthly
      const month = new Date(t.date).toLocaleString("default", {
        month: "short",
        year: "numeric"
      });

      if (!monthlyTotals[month]) {
        monthlyTotals[month] = 0;
      }
      monthlyTotals[month] += t.amount;
    });

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      categoryTotals,
      monthlyTotals
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};