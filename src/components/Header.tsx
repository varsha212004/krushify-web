import React from 'react';
import { MapPin, Search, User } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  onLogin: () => void;
  onRegister: () => void;
  user: any;
  onDashboard: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogin, onRegister, user, onDashboard, onLogout }) => {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-900">
              {t('appName')}
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium">{t('agriculturalServices')}</a>
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium">{t('local')}</a>
          </nav>

          {/* Location and Search */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{t('yourLocation')}</span>
            </div>
            
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder={t('searchPlaceholder')}
                className="bg-transparent text-sm outline-none w-48"
              />
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              
              {user ? (
                <div className="relative group">
                  <div className="flex items-center cursor-pointer">
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="ml-1 text-sm text-gray-700">{user.name}</span>
                  </div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button 
                      onClick={onDashboard}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      {t('dashboard')}
                    </button>
                    <button 
                      onClick={onLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      {t('logout')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={onLogin}
                    className="text-sm text-gray-700 hover:text-green-600"
                  >
                    {t('login')}
                  </button>
                  <button 
                    onClick={onRegister}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
                  >
                    {t('signup')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;