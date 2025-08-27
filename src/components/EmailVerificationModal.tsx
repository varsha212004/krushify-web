 import React, { useState } from 'react';
import { X, Mail } from 'lucide-react';
import { supabase } from '../supabase/client';

interface EmailVerificationModalProps {
  onClose: () => void;
  email: string;
  onVerificationSent: () => void;
}

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  onClose,
  email,
  onVerificationSent,
}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResendVerification = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        setError(error.message || 'Failed to send verification email');
      } else {
        setMessage('Verification email sent! Please check your inbox.');
        onVerificationSent();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Email Verification Required</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center">
          <Mail className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Please verify your email</h3>
          <p className="text-gray-600 mb-4">
            We've sent a verification email to <strong>{email}</strong>. 
            Please check your inbox and click the verification link to activate your account.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> You won't be able to login until your email is verified.
            </p>
          </div>

          <button
            onClick={handleResendVerification}
            disabled={loading}
            className={`w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Sending...' : 'Resend Verification Email'}
          </button>

          {message && (
            <p className="text-green-600 text-sm mt-2">{message}</p>
          )}
          {error && (
            <p className="text-red-600 text-sm mt-2">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationModal;
