import useTheme from "../context/useTheme";

export default function Navbar() {
  const { dark, setDark } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white shadow p-4 
                    flex justify-between items-center transition-colors duration-500">

      <h1 className="text-xl font-semibold">Dashboard</h1>

      {/* THEME TOGGLE */}
      <div className="flex items-center gap-2">

        {/* Mode Label */}
        <span className="text-sm">
          {dark ? "Dark Mode" : "Light Mode"}
        </span>

        {/* Toggle Switch */}
        <div
          onClick={() => setDark(!dark)}
          title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer
          smooth
          ${dark ? "bg-indigo-600" : "bg-gray-300"}`}
        >
          <div
            className={`bg-white w-6 h-6 rounded-full shadow-md 
            flex items-center justify-center text-sm
            transform smooth
            ${dark ? "translate-x-6" : "translate-x-0"}`}
          >
            {dark ? "🌙" : "☀️"}
          </div>
        </div>

      </div>

    </div>
  );
}