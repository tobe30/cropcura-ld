import { useState } from "react";
import { LogOut, Bell, ChevronDown, Menu } from "lucide-react";
import logo from "../assets/cropcoralogo.png";
import avatar from "../assets/default.jpg";

export default function Navbar({ onMenuClick }) {
  const [unresolvedAlerts] = useState(3);
  const [open, setOpen] = useState(false);

  const user = {
    bankName: "Demo Bank",
    loanOfficer: "John Doe",
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <header className="h-14 sm:h-16 border-b border-gray-200 bg-white px-3 sm:px-6 flex items-center justify-between shadow-sm">
      
      {/* LEFT */}
      <div className="flex items-center gap-3 sm:gap-6">
        
        {/* Hamburger (mobile only) */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Logo */}
        <img
          src={logo}
          alt="CropCura Logo"
          className="w-24 sm:w-28 md:w-32 h-auto object-contain"
        />

        {/* Demo Mode */}
        <div className="hidden md:flex items-center gap-2 px-2 py-0.5 rounded-full bg-green-100 border border-green-200">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-green-600">
            Demo Mode
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 relative">
        
        {/* Alerts */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell className="w-5 h-5 text-gray-700" />
          {unresolvedAlerts > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-semibold">
              {unresolvedAlerts}
            </span>
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-1.5 py-1 rounded-full hover:bg-gray-100 transition"
          >
            <img
              src={avatar}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
            />

            <ChevronDown className="w-4 h-4 text-gray-600 hidden sm:block" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">
                  {user.bankName}
                </p>
                <p className="text-xs text-gray-500">
                  Loan Officer: {user.loanOfficer}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition rounded-b-xl"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
