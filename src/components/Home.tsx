import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import LoginModal from "./LoginModal";

const Home: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to Krushify 🌱</h1>

      {!user ? (
        <button
          onClick={() => setIsLoginOpen(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Login
        </button>
      ) : (
        <div className="text-center">
          <p className="mb-4">Hello, {user.name || user.email} 👋</p>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}

      {/* Navigation links for password reset */}
      <div className="mt-4">
        <Link to="/forgot-password" className="text-blue-600 hover:underline">
          Forgot Password?
        </Link>
        <span className="mx-2">|</span>
        <Link to="/reset-password" className="text-blue-600 hover:underline">
          Reset Password
        </Link>
      </div>
      {isLoginOpen && (
        <LoginModal onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Home;
