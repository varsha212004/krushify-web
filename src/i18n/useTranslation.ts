import { useState, useEffect } from 'react';
import { kannadaTranslations, englishTranslations, Translations } from './translations';

type Language = 'kn' | 'en';

const translations = {
  kn: kannadaTranslations,
  en: englishTranslations
};

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>('kn');

  const t = (key: keyof Translations, options?: Record<string, any>): string => {
    let translation = translations[language][key];

    if (options) {
      Object.entries(options).forEach(([k, v]) => {
        translation = translation.replace(`{{${k}}}`, String(v));
      });
    }

    return translation;
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'kn' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  return {
    t,
    language,
    changeLanguage,
    isKannada: language === 'kn',
    isEnglish: language === 'en'
  };
};
