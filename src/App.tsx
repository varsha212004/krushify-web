import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Hero from './components/Hero';
import ServiceGrid from './components/ServiceGrid';
import Stats from './components/Stats';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import ServiceBooking from './components/ServiceBooking';
import Dashboard from './components/Dashboard';
import MedicineSprayingGrid from './components/MedicineSprayingGrid';
import ArecaMedicineGrid from './components/ArecaMedicineGrid';
import IrrigationGrid from './components/IrrigationGrid';
import ResetPassword from './components/reset-password';
import ForgotPassword from './components/ForgotPassword';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [user, setUser] = useState(null);

  const handleServiceSelect = (service: any) => {
    if (service.id === 'medicine-spraying') {
      setCurrentView('medicine-spraying');
    } else if (service.needsThirdLevel && service.id === 'areca-medicine') {
      setCurrentView('areca-medicine');
    } else if (service.id === 'Irrigation') {
      setCurrentView('Irrigation');
    } else {
      setSelectedService(service);
      setCurrentView('booking');
    }
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    setShowLogin(false);
    setCurrentView('dashboard');
  };

  const handleRegister = (userData: any) => {
    setUser(userData);
    setShowRegister(false);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  if (currentView === 'medicine-spraying') {
    return (
      <MedicineSprayingGrid 
        onServiceSelect={handleServiceSelect}
        onBack={() => setCurrentView('home')}
      />
    );
  }

  if (currentView === 'areca-medicine') {
    return (
      <ArecaMedicineGrid 
        onServiceSelect={handleServiceSelect}
        onBack={() => setCurrentView('medicine-spraying')}
      />
    );
  }

  if (currentView === 'Irrigation') {
    return (
      <IrrigationGrid 
        onBack={() => setCurrentView('home')}
      />
    );
  }

  if (currentView === 'booking' && selectedService) {
    return (
      <ServiceBooking 
        service={selectedService} 
        onBack={() => setCurrentView('home')}
      />
    );
  }

  if (currentView === 'dashboard' && user) {
    return (
      <Dashboard 
        user={user} 
        onLogout={handleLogout}
        onBack={() => setCurrentView('home')}
      />
    );
  }

  return (
    <Router>
      <Routes>
        {/* Forgot password page */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Main app route */}
        <Route path="/" element={
          <div className="min-h-screen bg-gray-50">
            <Header 
              onLogin={() => setShowLogin(true)}
              onRegister={() => setShowRegister(true)}
              user={user}
              onDashboard={() => setCurrentView('dashboard')}
              onLogout={handleLogout}
            />
            
            <main>
              <Hero />
              <ServiceGrid onServiceSelect={handleServiceSelect} />
              <Stats />
            </main>

            {showLogin && (
              <LoginModal 
                onClose={() => setShowLogin(false)}
                onLogin={handleLogin}
              />
            )}

            {showRegister && (
              <RegisterModal 
                onClose={() => setShowRegister(false)}
                onRegister={handleRegister}
                onSwitchToLogin={() => {
                  setShowRegister(false);
                  setShowLogin(true);
                }}
              />
            )}
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
