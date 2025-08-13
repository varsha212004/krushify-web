import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

// Import medicine spraying icons
import arecaNutsIcon from '../assets/areca-nuts.png';
import sugarcaneIcon from '../assets/sugarcane.png';
import paddyRiceIcon from '../assets/paddy-rice.png';
import blackPepperIcon from '../assets/black-pepper.png';
import coconutIcon from '../assets/coconut.png';
import weedKillerIcon from '../assets/weed-killer.png';
import pestKillerIcon from '../assets/pest-killer.png';

interface MedicineService {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  description: string;
}

interface MedicineSprayingGridProps {
  onServiceSelect: (service: any) => void;
  onBack: () => void;
}

const MedicineSprayingGrid: React.FC<MedicineSprayingGridProps> = ({ onServiceSelect, onBack }) => {
  const { t } = useTranslation();

  const medicineServices: MedicineService[] = [
    {
      id: 'areca-medicine',
      name: t('arecaMedicine'),
      icon: arecaNutsIcon,
      bgColor: '#10B981',
      description: t('arecaMedicine')
    },
    {
      id: 'fungus-spray',
      name: t('fungusSpray'),
      icon: sugarcaneIcon,
      bgColor: '#8B5A2B',
      description: t('fungusSpray')
    },
    {
      id: 'paddy-spray',
      name: t('paddySpray'),
      icon: paddyRiceIcon,
      bgColor: '#F59E0B',
      description: t('paddySpray')
    },
    {
      id: 'pepper-spray',
      name: t('blackPepperSpray'),
      icon: blackPepperIcon,
      bgColor: '#DC2626',
      description: t('blackPepperSpray')
    },
    {
      id: 'coconut-spray',
      name: t('coconutSpray'),
      icon: coconutIcon,
      bgColor: '#92400E',
      description: t('coconutSpray')
    },
    {
      id: 'weed-killer',
      name: t('weedKiller'),
      icon: weedKillerIcon,
      bgColor: '#16A34A',
      description: t('weedKiller')
    },
    {
      id: 'pest-killer',
      name: t('pestKiller'),
      icon: pestKillerIcon,
      bgColor: '#7C2D12',
      description: t('pestKiller')
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
            <h1 className="text-xl font-semibold text-gray-900">{t('medicineSprayingWork')}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {medicineServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => onServiceSelect({
                ...service,
                needsThirdLevel: service.id === 'areca-medicine',
                categories: [{
                  id: 'medicine-category',
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

export default MedicineSprayingGrid;