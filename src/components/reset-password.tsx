import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/client"; // ✅ Corrected import path
import { useNavigate } from "react-router-dom"; // if using react-router
import { Eye, EyeOff } from "lucide-react"; // Import eye icons

const ResetPassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ to redirect after reset

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          console.log("🔑 Password recovery mode active");
        }
        if (!session) {
          setError("Invalid or expired reset link. Please request again.");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("✅ Password updated successfully! Redirecting...");
      setTimeout(() => {
        navigate("/"); // 👈 redirect to home/dashboard
      }, 2000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          Reset Your Password
        </h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)} // Toggle visibility
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Update Password
          </button>
        </form>
        {message && (
          <p className="text-green-600 mt-2 text-center">{message}</p>
        )}
        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
