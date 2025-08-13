import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../supabase/client';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (userData: any) => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin, onSwitchToRegister }) => {
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email' | null>(null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [loginError, setLoginError] = useState('');

  // 👁 Visibility toggles
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (loginMethod === 'phone') {
      const { data, error } = await supabase
        .from('auth.users')
        .select('email, user_metadata')
        .eq('user_metadata->>phone', phone)
        .single();

      if (error || !data) {
        setLoginError('User not registered or invalid phone number');
        return;
      }

      const { error: loginErr, data: loginData } = await supabase.auth.signInWithPassword({
        email: data.email,
        password,
      });

      if (loginErr) {
        setLoginError('Invalid password');
        return;
      }

      onLogin({
        name: loginData.user?.user_metadata?.full_name || '',
        phone,
        type: 'farmer',
        user: loginData.user,
      });
    } else if (loginMethod === 'email') {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setLoginError('Invalid email or password');
        return;
      }
      onLogin({
        name: data.user?.email || '',
        email,
        type: 'farmer',
        user: data.user,
      });
    }
  };

  if (!loginMethod) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-6">ಲಾಗಿನ್ ಆಯ್ಕೆಮಾಡಿ</h2>
          <button
            onClick={() => setLoginMethod('email')}
            className="w-full mb-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            ಇಮೇಲ್ ಮೂಲಕ ಲಾಗಿನ್
          </button>
          <button
            onClick={() => setLoginMethod('phone')}
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
            {loginMethod === 'email' ? 'ಇಮೇಲ್ ಲಾಗಿನ್' : 'ಫೋನ್ ಲಾಗಿನ್'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {loginMethod === 'email' ? (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">ಇಮೇಲ್</label>
              <input
                type={showEmail ? 'text' : 'email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                placeholder="example@email.com"
                required
              />
              <button
                type="button"
                onClick={() => setShowEmail(!showEmail)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showEmail ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {loginError && <p className="text-red-600 text-sm mt-1">{loginError}</p>}
            </div>
          ) : (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">ಫೋನ್ ಸಂಖ್ಯೆ</label>
              <input
                type={showPhone ? 'text' : 'tel'}
                value={phone}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                  setPhone(onlyNums);
                  setPhoneError('');
                }}
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                maxLength={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                placeholder="9483812345"
                required
              />
              <button
                type="button"
                onClick={() => setShowPhone(!showPhone)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showPhone ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {phoneError && <p className="text-red-600 text-sm mt-1">{phoneError}</p>}
            </div>
          )}

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">ಪಾಸ್‌ವರ್ಡ್</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className={`w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors ${
              loginMethod === 'phone' && (!/^([6-9][0-9]{9})$/.test(phone) ? 'opacity-50 cursor-not-allowed' : '')
            }`}
            disabled={loginMethod === 'phone' && !/^([6-9][0-9]{9})$/.test(phone)}
          >
            ಲಾಗಿನ್
          </button>

          {loginMethod === 'phone' && loginError && (
            <p className="text-red-600 text-sm mt-1">{loginError}</p>
          )}
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setLoginMethod(null)}
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            ಹಿಂದಕ್ಕೆ
          </button>
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">ಖಾತೆ ಇಲ್ಲವೇ? </span>
          <button
            onClick={onSwitchToRegister}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            ಸೈನ್ ಅಪ್ ಮಾಡಿ
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
