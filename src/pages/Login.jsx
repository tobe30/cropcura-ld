import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/cropcoralogo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Dummy credentials
  const DUMMY_EMAIL = "Demo@fcmb.com";
  const DUMMY_PASSWORD = "Fcmbbank";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-2xl p-10">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="CropCura Logo"
              className="w-40 h-auto object-contain"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-black">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Sign in to access the loan officer dashboard
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                placeholder="Demo@fcmb.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-green-700"
              />
            </div>

            {/* Password */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Fcmbbank"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full pr-12 rounded-lg focus:ring-2 focus:ring-green-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit */}
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

          <div className="text-center mt-6 text-gray-400 text-sm">
            © 2026 CropCura. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
