import React from 'react';
import { Star, Users } from 'lucide-react';

const Stats: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-8 h-8 text-yellow-500 fill-current" />
              <span className="text-3xl font-bold text-gray-900 ml-2">4.8</span>
            </div>
            <p className="text-sm text-gray-600">ಸೇವಾ ರೇಟಿಂಗ್*</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-8 h-8 text-green-600" />
              <span className="text-3xl font-bold text-gray-900 ml-2">500+</span>
            </div>
            <p className="text-sm text-gray-600">ನೋಂದಾಯಿತ ಕೆಲಸಗಾರರು*</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;