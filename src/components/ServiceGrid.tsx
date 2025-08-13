import React from 'react';
import { useTranslation } from '../i18n/useTranslation';

// Import all service icons
import arecaNutsIcon from '../assets/arecanuts.svg';
import medicineSprayIcon from '../assets/pesticide-spray.svg';
import paddyRiceIcon from '../assets/paddy-rice.png';
import plantationIcon from '../assets/plantation.png';
import treeWorkIcon from '../assets/tree-work.png';
import gardenWorkIcon from '../assets/garden-work.png';
import homeHelpIcon from '../assets/home-help.png';
import machineOperationsIcon from '../assets/machine-operations.png';
import fencingConstructionIcon from '../assets/fencing-construction.png';
import IrrigationIcon from '../assets/irrigation.png';

interface SubService {
  id: string;
  name: string;
}

interface ServiceCategory {
  id: string;
  name: string;
  subServices: SubService[];
}

interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  categories: ServiceCategory[];
}

interface ServiceGridProps {
  onServiceSelect: (service: Service) => void;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ onServiceSelect }) => {
  const { t } = useTranslation();

  const services = [
    {
      id: 'medicine-spraying',
      name: t('medicineSprayingWork'),
      icon: medicineSprayIcon,
      bgColor: '#10B981'
    },
    {
      id: 'areca',
      name: t('arecaNutWork'),
      icon: arecaNutsIcon,
      bgColor: '#10B981'
    },
    {
      id: 'paddy',
      name: t('paddyWork'),
      icon: paddyRiceIcon,
      bgColor: '#F59E0B'
    },
    {
      id: 'plantation',
      name: t('plantationWork'),
      icon: plantationIcon,
      bgColor: '#84CC16'
    },
    {
      id: 'tree-work',
      name: t('treeWork'),
      icon: treeWorkIcon,
      bgColor: '#22C55E'
    },
    {
      id: 'garden-work',
      name: t('gardenWork'),
      icon: gardenWorkIcon,
      bgColor: '#06B6D4'
    },
    {
      id: 'home-help',
      name: t('homeHelp'),
      icon: homeHelpIcon,
      bgColor: '#8B5CF6'
    },
    {
      id: 'machine-operations',
      name: t('machineOperations'),
      icon: machineOperationsIcon,
      bgColor: '#A855F7'
    },
    {
      id: 'fencing-construction',
      name: t('fencingConstruction'),
      icon: fencingConstructionIcon,
      bgColor: '#F97316'
    },
    {
      id: 'Irrigation', // ✅ NEW
      name: t('IrrigationWork'),
      icon: IrrigationIcon,
      bgColor: '#34D399'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('servicesTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => onServiceSelect({
                ...service,
                description: service.name,
                categories: []
              })}
            >
              <div className="text-center mb-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl" 
                     style={{ backgroundColor: service.bgColor }}>
                  <img 
                    src={service.icon} 
                    alt={service.name}
                    className="w-12 h-12 object-cover"
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
    </section>
  );
};

export default ServiceGrid;
