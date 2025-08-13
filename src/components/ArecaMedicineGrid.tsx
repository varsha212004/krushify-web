import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

// Import areca medicine icons
import arecaBranchIcon from '../assets/areca-branch.png';
import arecaStemIcon from '../assets/areca-stem.png';
import arecaLeafIcon from '../assets/areca-leaf.png';
import arecaInsectsIcon from '../assets/areca-insects.png';

interface ArecaMedicineService {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  description: string;
}

interface ArecaMedicineGridProps {
  onServiceSelect: (service: any) => void;
  onBack: () => void;
}

const ArecaMedicineGrid: React.FC<ArecaMedicineGridProps> = ({ onServiceSelect, onBack }) => {
  const { t } = useTranslation();

  const arecaMedicineServices: ArecaMedicineService[] = [
    {
      id: 'areca-branch-medicine',
      name: t('arecaBranchMedicine'),
      icon: arecaBranchIcon,
      bgColor: '#10B981',
      description: t('arecaBranchMedicine')
    },
    {
      id: 'areca-stem-treatment',
      name: t('arecaStemTreatment'),
      icon: arecaStemIcon,
      bgColor: '#059669',
      description: t('arecaStemTreatment')
    },
    {
      id: 'areca-leaf-curl',
      name: t('arecaLeafCurlDisease'),
      icon: arecaLeafIcon,
      bgColor: '#047857',
      description: t('arecaLeafCurlDisease')
    },
    {
      id: 'areca-other-insects',
      name: t('arecaOtherInsects'),
      icon: arecaInsectsIcon,
      bgColor: '#065F46',
      description: t('arecaOtherInsects')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <button onClick={onBack} className="mr-4">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">{t('arecaMedicine')}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {arecaMedicineServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => onServiceSelect({
                ...service,
                categories: [{
                  id: 'areca-medicine-category',
                  name: service.name,
                  subServices: [{ id: service.id, name: service.name }]
                }]
              })}
            >
              {/* Service Icon and Title */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl" 
                     style={{backgroundColor: service.bgColor}}>
                  <img 
                    src={service.icon} 
                    alt={service.name}
                    className="w-10 h-10 object-cover"
                  />
                </div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight">
                  {service.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArecaMedicineGrid;