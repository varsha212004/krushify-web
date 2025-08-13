import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Phone } from 'lucide-react';

interface ServiceBookingProps {
  service: any;
  onBack: () => void;
}

const ServiceBooking: React.FC<ServiceBookingProps> = ({ service, onBack }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');

  const workers = [
    { id: 1, name: 'ರಮೇಶ್ ನಾಯ್ಕ್', rating: 4.8, experience: '8 ವರ್ಷ', phone: '9483812345', specialty: 'ಕೃಷಿ ಮತ್ತು ನಿರ್ಮಾಣ' },
    { id: 2, name: 'ಸುರೇಶ್ ಗೌಡ', rating: 4.9, experience: '12 ವರ್ಷ', phone: '9483823456', specialty: 'ವಿದ್ಯುತ್ ಮತ್ತು ಪ್ಲಂಬಿಂಗ್' },
    { id: 3, name: 'ಮಹೇಶ್ ಶೆಟ್ಟಿ', rating: 4.7, experience: '6 ವರ್ಷ', phone: '9483834567', specialty: 'ಪೇಂಟಿಂಗ್ ಮತ್ತು ಸ್ವಚ್ಛತೆ' }
  ];

  const handleBooking = (worker: any) => {
    alert(`${worker.name} ಅವರೊಂದಿಗೆ ಬುಕಿಂಗ್ ಯಶಸ್ವಿಯಾಗಿದೆ!`);
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <button onClick={onBack} className="mr-4">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">{service.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">ಬುಕಿಂಗ್ ವಿವರಗಳು</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    ದಿನಾಂಕ
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Clock className="w-4 h-4 inline mr-1" />
                    ಸಮಯ
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">ಸಮಯ ಆಯ್ಕೆ ಮಾಡಿ</option>
                    <option value="morning">ಬೆಳಿಗ್ಗೆ (6:00 - 10:00)</option>
                    <option value="afternoon">ಮಧ್ಯಾಹ್ನ (10:00 - 14:00)</option>
                    <option value="evening">ಸಂಜೆ (14:00 - 18:00)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ಹೆಚ್ಚುವರಿ ಟಿಪ್ಪಣಿಗಳು
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="ವಿಶೇಷ ಸೂಚನೆಗಳು..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Available Workers */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">ಲಭ್ಯವಿರುವ ಕೆಲಸಗಾರರು</h2>
            
            <div className="space-y-4">
              {workers.map((worker) => (
                <div key={worker.id} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold text-lg">
                          {worker.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{worker.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>⭐ {worker.rating}</span>
                          <span>ಅನುಭವ: {worker.experience}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Phone className="w-3 h-3 mr-1" />
                          {worker.phone}
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleBooking(worker)}
                      disabled={!selectedDate || !selectedTime}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      ಬುಕ್ ಮಾಡಿ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBooking;