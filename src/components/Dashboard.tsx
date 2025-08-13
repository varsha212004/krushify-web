import React from 'react';
import { ArrowLeft, Calendar, Clock, Star, Phone } from 'lucide-react';

interface DashboardProps {
  user: any;
  onLogout: () => void;
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onBack }) => {
  const bookings = [
    {
      id: 1,
      service: 'ಮನೆ ಪೇಂಟಿಂಗ್',
      worker: 'ರಮೇಶ್ ನಾಯ್ಕ್',
      date: '2024-01-15',
      time: 'ಬೆಳಿಗ್ಗೆ',
      status: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
      phone: '9483812345'
    },
    {
      id: 2,
      service: 'ವಿದ್ಯುತ್ ರಿಪೇರಿ',
      worker: 'ಸುರೇಶ್ ಗೌಡ',
      date: '2024-01-20',
      time: 'ಮಧ್ಯಾಹ್ನ',
      status: 'ನಿಗದಿತ',
      phone: '9483823456'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <button onClick={onBack} className="mr-4">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">ಡ್ಯಾಶ್‌ಬೋರ್ಡ್</h1>
            </div>
            <button
              onClick={onLogout}
              className="text-sm text-red-600 hover:text-red-700"
            >
              ಲಾಗ್ ಔಟ್
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-semibold text-xl">
                {user.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.type === 'farmer' ? 'ರೈತ' : 'ಕೆಲಸಗಾರ'}</p>
              <p className="text-sm text-gray-500">{user.phone}</p>
            </div>
          </div>
        </div>

        {/* Bookings */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">ನನ್ನ ಬುಕಿಂಗ್‌ಗಳು</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <div key={booking.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">{booking.service}</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <span className="w-20">{t('workerLabel')}:</span>
                        <span>{booking.worker}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{booking.date}</span>
                        <Clock className="w-4 h-4 ml-4 mr-1" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        <span>{booking.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'ಪೂರ್ಣಗೊಂಡಿದೆ' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {booking.status}
                    </span>
                    {booking.status === 'ಪೂರ್ಣಗೊಂಡಿದೆ' && (
                      <div className="mt-2">
                        <button className="text-sm text-green-600 hover:text-green-700 flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          ರೇಟಿಂಗ್ ನೀಡಿ
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;