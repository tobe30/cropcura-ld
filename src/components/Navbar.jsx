import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Bell, ChevronDown, Menu, CheckCircle, AlertCircle, Info } from "lucide-react";
import logo from "../assets/cropcoralogo.png";
import avatar from "../assets/default.jpg";

export default function Navbar({ onMenuClick }) {
  const [unresolvedAlerts] = useState(3);
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const navigate = useNavigate();

  const user = {
    bankName: "Demo Bank",
    loanOfficer: "John Doe",
  };

  const notifications = [
    { id: 1, message: "New loan application submitted", time: "2m ago", type: "info" },
    { id: 2, message: "Payment overdue reminder", time: "1h ago", type: "alert" },
    { id: 3, message: "Profile updated successfully", time: "3h ago", type: "success" },
  ];

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success": return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "alert": return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "info": return <Info className="w-5 h-5 text-blue-500" />;
      default: return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <header className="h-14 sm:h-16 border-b border-gray-200 bg-white px-3 sm:px-6 flex items-center justify-between shadow-sm">
      {/* LEFT */}
      <div className="flex items-center gap-3 sm:gap-6">
        <button onClick={onMenuClick} className="p-2 rounded-md hover:bg-gray-100 lg:hidden">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        <img src={logo} alt="CropCura Logo" className="w-24 sm:w-28 md:w-32 h-auto object-contain" />

        <div className="hidden md:flex items-center gap-2 px-2 py-0.5 rounded-full bg-green-100 border border-green-200">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-green-600">Demo Mode</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 relative">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setOpenNotifications(!openNotifications)}
            className="relative p-2 rounded-full hover:bg-gray-100"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            {unresolvedAlerts > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-semibold">
                {unresolvedAlerts}
              </span>
            )}
          </button>

          {openNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
              <div className="px-4 py-2 border-b border-gray-100 font-semibold text-gray-700">
                Notifications
              </div>
              <ul>
                {notifications.map((note) => (
                  <li
                    key={note.id}
                    className="flex items-start gap-3 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 rounded-lg"
                  >
                    <div className="mt-1">{getNotificationIcon(note.type)}</div>
                    <div className="flex-1">
                      <p className="font-medium">{note.message}</p>
                      <span className="text-xs text-gray-400">{note.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="flex items-center gap-2 px-1.5 py-1 rounded-full hover:bg-gray-100 transition"
          >
            <img
              src={avatar}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
            />
            <ChevronDown className="w-4 h-4 text-gray-600 hidden sm:block" />
          </button>

          {openProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">{user.bankName}</p>
                <p className="text-xs text-gray-500">Loan Officer: {user.loanOfficer}</p>
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
