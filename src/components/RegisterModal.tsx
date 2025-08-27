import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../supabase/client';

interface RegisterModalProps {
  onClose: () => void;
  onRegister: (userData: any) => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose, onRegister, onSwitchToLogin }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Phone validation
    if (!/^([6-9][0-9]{9})$/.test(phone)) {
      setError("ಫೋನ್ ಸಂಖ್ಯೆ 6, 7, 8 ಅಥವಾ 9 ರಿಂದ ಪ್ರಾರಂಭವಾಗಬೇಕು ಮತ್ತು 10 ಅಂಕಿಗಳು ಇರಬೇಕು.");
      return;
    }

    // Password validation
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&()_+\-=\[\]{};':\"\\|,.<>\/?]).{8,}$/.test(password)) {
      setError("ಪಾಸ್‌ವರ್ಡ್ ಕನಿಷ್ಠ 8 ಅಕ್ಷರಗಳು, ಒಂದು ದೊಡ್ಡ ಅಕ್ಷರ, ಒಂದು ಸಂಖ್ಯೆ ಮತ್ತು ಒಂದು ವಿಶೇಷ ಚಿಹ್ನೆ ಇರಬೇಕು.");
      return;
    }

    if (password !== confirmPassword) {
      setError("ಪಾಸ್‌ವರ್ಡ್ ಗಳು ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ.");
      return;
    }

    setLoading(true);

    // Step 1: Sign up user in Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone
        },
        emailRedirectTo: "http://localhost:3000", // change when deploying
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message || "ಸೈನ್ ಅಪ್ ವಿಫಲವಾಗಿದೆ.");
      return;
    }

    // Step 2: Insert into profiles table (fix here ✅)
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,   // link with auth.users
        username: fullName  // use username column
      });

      if (profileError) {
        console.error("Profile insert failed:", profileError.message);
        // Log the error but don't show it to the user since auth was successful
        // The user is created and email is sent, profile insertion is secondary
        console.log("User created successfully, but profile insertion had issues");
        // Continue with success flow since the main registration worked
      }
    }

    // Step 3: Success
    setSuccess(true);
    onRegister({ fullName, phone, email, needsVerification: true });
    onSwitchToLogin(); // Redirect to login page after successful signup
  };

  // Google signup
  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
      setError('Google ಮೂಲಕ ಸೈನ್ ಅಪ್ ವಿಫಲವಾಗಿದೆ.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">ಸೈನ್ ಅಪ್</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="text-center">
            <div className="text-green-700 mb-4">ನೀವು ಯಶಸ್ವಿಯಾಗಿ ಸೈನ್ ಅಪ್ ಮಾಡಿದ್ದಾರೆ!</div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">📧 Email Verification Required</h4>
              <p className="text-sm text-blue-700">
                We've sent a verification email to <strong>{email}</strong>.
                Please check your inbox and click the verification link before you can login.
              </p>
            </div>
            <button
              onClick={onClose}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Continue
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ಪೂರ್ಣ ಹೆಸರು</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ಫೋನ್ ಸಂಖ್ಯೆ</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="9483812345"
                maxLength={10}
                required
              />
              <p className="text-xs text-gray-500 mt-1">ಫೋನ್ ಸಂಖ್ಯೆ 6, 7, 8 ಅಥವಾ 9 ರಿಂದ ಪ್ರಾರಂಭವಾಗಬೇಕು ಮತ್ತು 10 ಅಂಕಿಗಳು ಇರಬೇಕು.</p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ಇಮೇಲ್ ಐಡಿ</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="example@email.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ಪಾಸ್‌ವರ್ಡ್</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">ಪಾಸ್‌ವರ್ಡ್ ಕನಿಷ್ಠ 8 ಅಕ್ಷರಗಳು, ಒಂದು ದೊಡ್ಡ ಅಕ್ಷರ, ಒಂದು ಸಂಖ್ಯೆ, ಒಂದು ವಿಶೇಷ ಚಿಹ್ನೆ ಇರಬೇಕು.</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-600 text-sm mt-1">ಪಾಸ್‌ವರ್ಡ್ ಗಳು ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ.</p>
              )}
              {confirmPassword && password === confirmPassword && (
                <p className="text-green-600 text-sm mt-1">ಪಾಸ್‌ವರ್ಡ್ ಗಳು ಹೊಂದಿಕೆಯಾಗಿವೆ.</p>
              )}
            </div>

            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

            {/* Submit */}
            <button
              type="submit"
              className={`w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'ಸೈನ್ ಅಪ್ ಆಗುತ್ತಿದೆ...' : 'ಸೈನ್ ಅಪ್'}
            </button>
          </form>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:text-gray-900 underline mr-2"
          >
            ಹಿಂದಕ್ಕೆ
          </button>
          <span className="text-sm text-gray-600">ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?</span>
          <button
            onClick={onSwitchToLogin}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            ಲಾಗಿನ್ ಮಾಡಿ
          </button>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full border border-gray-300 bg-white text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition-colors mb-2 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24" className="mr-2">
              <path fill="#4285F4" d="M24 9.5c3.54 0 6.72 1.23 9.22 3.25l6.9-6.9C35.64 2.34 30.13 0 24 0 14.61 0 6.36 5.64 2.69 13.74l8.06 6.27C12.6 13.13 17.87 9.5 24 9.5z"/>
              <path fill="#34A853" d="M46.1 24.5c0-1.64-.15-3.22-.43-4.75H24v9h12.5c-.54 2.9-2.17 5.36-4.62 7.03l7.19 5.59C43.98 37.13 46.1 31.23 46.1 24.5z"/>
              <path fill="#FBBC05" d="M10.75 28.01c-.62-1.86-.98-3.84-.98-5.91s.36-4.05.98-5.91l-8.06-6.27C1.25 13.97 0 18.13 0 24s1.25 10.03 3.69 14.08l8.06-6.27z"/>
              <path fill="#EA4335" d="M24 48c6.13 0 11.64-2.03 15.89-5.53l-7.19-5.59c-2.01 1.35-4.59 2.13-7.4 2.13-6.13 0-11.3-3.63-13.25-8.77l-8.06 6.27C6.36 42.36 14.61 48 24 48z"/>
            </svg>
            Google ಮೂಲಕ ಸೈನ್ ಅಪ್
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
