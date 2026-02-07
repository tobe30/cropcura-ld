import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  MapPin,
  AlertTriangle,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/applications", icon: FileText, label: "Loan Applications" },
  { to: "/farmers", icon: Users, label: "Farm Directory" },
  { to: "/alerts", icon: AlertTriangle, label: "Risk Alerts" },
  { to: "/credit-score", icon: TrendingUp, label: "Credit Score" },
  { to: "/settings", icon: Settings, label: "Settings" }
];

export default function Sidebar({ open, onClose }) {
  const [collapsed, setCollapsed] = useState(false);
  const criticalAlerts = 3;

  return (
    <>
      {/* ✅ Overlay (BELOW navbar) */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 top-14 sm:top-16 bg-black/40 z-30 lg:hidden"
        />
      )}

      {/* ✅ Sidebar */}
      <aside
        className={`
          fixed lg:static
          top-14 sm:top-16 lg:top-0
          z-40
          h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)]
          bg-gray-50 border-r border-gray-200
          transition-all duration-300
          ${collapsed ? "w-16" : "w-64"}
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                onClick={onClose}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3.5 px-4 py-2.5 rounded-lg transition-all duration-200
                  ${collapsed ? "justify-center px-2" : ""}
                  ${
                    isActive
                      ? "bg-green-800 text-white font-semibold"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }
                `
                }
              >
                <div className="relative">
                  <item.icon
                    className={`w-6 h-6 ${collapsed ? "mx-auto" : ""}`}
                  />
                  {item.to === "/alerts" && criticalAlerts > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                      {criticalAlerts}
                    </span>
                  )}
                </div>

                {!collapsed && (
                  <span className="text-base font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Collapse Button (desktop only) */}
        <div className="p-4 border-t border-gray-200">
  <button
    onClick={() => setCollapsed(!collapsed)}
    className={`
      flex items-center gap-2.5 w-full 
      px-${collapsed ? "2" : "4"} py-2.5 
      rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 
      transition-all duration-200
      ${collapsed ? "justify-center" : "justify-start"}
    `}
  >
    {collapsed ? (
      // Icon only when collapsed
      <ChevronRight className="w-6 h-6" />
    ) : (
      // Icon + text when expanded
      <>
        <ChevronLeft className="w-6 h-6" />
        <span className="text-base font-medium">Collapse</span>
      </>
    )}
  </button>
</div>


        </div>
      </aside>
    </>
  );
}
