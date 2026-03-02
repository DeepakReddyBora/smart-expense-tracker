import { useState } from "react";
import { Link } from "react-router-dom";

/* =========================
   NAV ITEM COMPONENT
========================= */
function NavItem({ icon, label, to, onClick, collapsed }) {
  return (
    <div className="group relative nav-item">

      {to ? (
        <Link
          to={to}
          onClick={onClick}
          className="flex items-center gap-3 p-2 rounded-md
                     hover:bg-indigo-500 dark:hover:bg-gray-700
                     transition-all duration-300"
        >
          <span className="text-xl glow-icon icon-hover">{icon}</span>

          <span
            className={`whitespace-nowrap transition-all duration-300
            ${collapsed
              ? "md:opacity-0 md:group-hover:opacity-100"
              : "opacity-100"}`}
          >
            {label}
          </span>
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="flex items-center gap-3 p-2 w-full text-left rounded-md
                     hover:bg-indigo-500 dark:hover:bg-gray-700
                     transition-all duration-300"
        >
          <span className="text-xl glow-icon icon-hover">{icon}</span>

          <span
            className={`whitespace-nowrap transition-all duration-300
            ${collapsed
              ? "md:opacity-0 md:group-hover:opacity-100"
              : "opacity-100"}`}
          >
            {label}
          </span>
        </button>
      )}

      {/* Tooltip */}
      {collapsed && (
        <span
          className="absolute left-14 top-2 bg-black text-white
                     text-xs px-2 py-1 rounded
                     opacity-0 group-hover:opacity-100 transition"
        >
          {label}
        </span>
      )}
    </div>
  );
}

/* =========================
   SIDEBAR COMPONENT
========================= */
export default function Sidebar() {

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ===== Mobile Top Bar ===== */}
      <div className="md:hidden bg-indigo-600 dark:bg-gray-800 p-3 flex justify-between">
        <span className="text-white font-bold">Expense Tracker</span>

        <button
          className="text-white text-xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {/* ===== Sidebar ===== */}
      <div
        className={`fixed md:static top-0 left-0 min-h-screen
        ${collapsed ? "w-20" : "w-64"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        bg-indigo-600 dark:bg-gray-800 text-white p-4 flex flex-col smooth
        transition-all duration-300 z-50`}
      >

        {/* ===== Header ===== */}
        <div
          className={`flex items-center mb-8
          ${collapsed ? "justify-center" : "justify-between"}`}
        >
          {!collapsed && (
            <h2 className="text-xl font-bold">
              Expense Tracker
            </h2>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ripple text-xl hidden md:flex items-center justify-center
                       hover:scale-110 transition"
          >
            ☰
          </button>
        </div>

        {/* ===== Navigation ===== */}
        <nav className="space-y-2">

          <NavItem
            icon="📊"
            label="Dashboard"
            to="/dashboard"
            collapsed={collapsed}
          />

          <NavItem
            icon="👤"
            label="Profile"
            to="/profile"
            collapsed={collapsed}
          />

          <NavItem
            icon="🚪"
            label="Logout"
            collapsed={collapsed}
            onClick={() => {
              localStorage.removeItem("token");
              window.location = "/";
            }}
          />

        </nav>

      </div>
    </>
  );
}