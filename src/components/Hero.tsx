import React from 'react';
import { useTranslation } from '../i18n/useTranslation';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('heroTitle').split(' ').slice(0, -3).join(' ')}
              <br />
              <span className="text-green-600">{t('heroTitle').split(' ').slice(-3).join(' ')}</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {t('heroSubtitle')}
            </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;