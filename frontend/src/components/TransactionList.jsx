import API from "../api";

export default function TransactionList({ data, refresh }) {
  const handleDelete = async (id) => {
    await API.delete(`/api/transactions/${id}`);
    refresh();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow transition-colors duration-500">
      <h3 className="font-bold mb-2">Transactions</h3>

      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left py-2">Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.map((t) => (
            <tr key={t._id}
              className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <td>{t.type}</td>
              <td>{t.category}</td>
              <td>₹{t.amount}</td>
              <td>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="active-scale w-full text-gray-800 dark:text-gray-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}