import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { supabase } from "../supabase/client";

interface LoginModalProps {
  onClose: () => void;
  onLogin: (userData: any) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [loginMethod, setLoginMethod] = useState<"phone" | "email" | null>(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ toggle
  const [loginError, setLoginError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setMessage("");

    if (loginMethod === "phone") {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("email, full_name")
        .eq("phone", phone)
        .single();

      if (profileError || !profile) {
        setLoginError("User not registered or invalid phone number");
        return;
      }

      const { data: loginData, error: loginErr } =
        await supabase.auth.signInWithPassword({
          email: profile.email,
          password,
        });

      if (loginErr) {
        setLoginError("Invalid password");
        return;
      }

      onLogin({
        name: profile.full_name || "",
        phone,
        type: "farmer",
        user: loginData.user,
      });
    } else if (loginMethod === "email") {
      const { data: loginData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setLoginError("Invalid email or password");
        return;
      }

      onLogin({
        name:
          loginData.user?.user_metadata?.full_name ||
          loginData.user?.email ||
          "",
        email,
        type: "farmer",
        user: loginData.user,
      });
    }
  };

  // ✅ Forgot Password → Reset link
  const handleForgotPassword = async () => {
    if (!email) {
      setLoginError("ದಯವಿಟ್ಟು ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password", // reset page
    });

    if (error) {
      setLoginError(error.message);
    } else {
      setMessage("Password reset link ನಿಮ್ಮ ಇಮೇಲ್ ಗೆ ಕಳುಹಿಸಲಾಗಿದೆ.");
    }
  };

  if (!loginMethod) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-6">ಲಾಗಿನ್ ಆಯ್ಕೆಮಾಡಿ</h2>
          <button
            onClick={() => setLoginMethod("email")}
            className="w-full mb-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            ಇಮೇಲ್ ಮೂಲಕ ಲಾಗಿನ್
          </button>
          <button
            onClick={() => setLoginMethod("phone")}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            ಫೋನ್ ಸಂಖ್ಯೆಯಿಂದ ಲಾಗಿನ್
          </button>
          <button
            onClick={onClose}
            className="mt-6 text-gray-500 hover:text-gray-700"
          >
            ಮುಚ್ಚು
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {loginMethod === "email" ? "ಇಮೇಲ್ ಲಾಗಿನ್" : "ಫೋನ್ ಲಾಗಿನ್"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {loginMethod === "email" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ಇಮೇಲ್
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ಪಾಸ್‌ವರ್ಡ್
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </>
          )}

          {loginMethod === "phone" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ಫೋನ್ ಸಂಖ್ಯೆ
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="9483812345"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            ಲಾಗಿನ್
          </button>

          {/* ✅ Forgot Password */}
          {loginMethod === "email" && (
            <button
              type="button"
              onClick={handleForgotPassword}
              className="w-full text-sm text-green-600 mt-2 hover:text-green-800"
            >
              ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?
            </button>
          )}
        </form>

        {loginError && <p className="text-red-600 text-sm mt-2">{loginError}</p>}
        {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default LoginModal;
