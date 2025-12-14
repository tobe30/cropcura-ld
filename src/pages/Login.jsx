import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom"; // for SPA navigation
import logo from '../assets/cropcoralogo.png';

export default function Login() {
  const [bankName, setBankName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
    setLoading(true);

    // Simulate API login
    setTimeout(() => {
      setLoading(false);
      // Navigate to dashboard
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="card bg-white shadow-2xl rounded-2xl p-10">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="CropCura Logo"
              className="w-36 md:w-44 lg:w-52 h-auto object-contain"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-2xl font-extrabold text-black">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Sign in to access the loan officer dashboard
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Bank Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter Bank Name"
                value={bankName}
                required
                onChange={(e) => setBankName(e.target.value)}
                className="input input-bordered w-full mt-2 px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>

            {/* Password field with toggle */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full pr-12 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none z-10 pointer-events-auto"
                >
                  {showPassword ? <EyeOff className="w-5 h-5 md:w-6 md:h-6" /> : <Eye className="w-5 h-5 md:w-6 md:h-6" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn bg-primary text-white w-full py-3 mt-4 rounded-lg hover:bg-primary-focus transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : null}
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Optional Footer */}
          <div className="text-center mt-6 text-gray-400 text-sm">
            © 2025 CropCura. All rights reserved.
          </div>

        </div>
      </div>
    </div>
  );
}
