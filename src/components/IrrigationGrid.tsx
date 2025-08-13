import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import { addIrrigationRequest } from '../services/IrrigationService.ts';
import LoginModal from './LoginModal';
import {getUserIdByPhone} from '../services/UserService.ts'
import AddressManager from './AddressManager'
interface IrrigationGridProps {
  onBack: () => void;
}

const IrrigationGrid: React.FC<IrrigationGridProps> = ({ onBack }) => {
  const { t } = useTranslation() as {
    t: (key: string, options?: Record<string, any>) => string;
  };

  const [formData, setFormData] = useState({
    type: '',
    mode: '',
    date: '',
    charge: 1200,
  });

  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [userId, setUserId] = useState('');
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleIrrigationSubmit = async (
    data: Record<string, any>,
    onBack: () => void
  ) => {
    try {
      const token = localStorage.getItem('ktoken');
      const uId = localStorage.getItem('userId')
      if (!(token || uId)) {
        setShowLogin(true);
        localStorage.setItem('myFormData', JSON.stringify(data));
        return;
      }
      uId && setUserId(uId);
      localStorage.setItem('myFormData', JSON.stringify(data));
      setShowAddressForm(true)
    } catch (error) {
      console.error('Failed to submit:', error);
      alert('Error submitting the service request.');
    }
  };
  
const handleAddressSubmit = async(id: any) => {
  const cleanedData = {
    ...formData,
    charge: 1200,
    consultation_required: true,
    addressId: id.id,
    user_id: userId
  };
  setShowAddressForm(false);
  console.log(cleanedData);
  !!(userId && id) && await addIrrigationRequest(cleanedData);
  alert('Service successfully submitted!');
}
const onCloseAddressForm = () => {
  setShowAddressForm(false);
}

const handleConsent = () => {
    const cleanedData = {
      ...formData,
      charge: 1200,
      consultation_required: true,
    };
    setShowModal(false);
    handleIrrigationSubmit(cleanedData, onBack);
  };

  const handleLogin = async(userData: any) => {
    console.log(userData);
    const { id = ''}= await getUserIdByPhone(userData.phone)
    
if(!id){
  alert('login failed');
  return;
}
    localStorage.setItem('userId', id);
    setUserId(id)
    setShowLogin(false);
    setShowAddressForm(true)
  };

  

  const step1Submit = () => {
    if (!formData.date || !formData.mode || !formData.type) {
      alert(t('pleaseFillAllFields'));
      return;
    }
    setShowModal(true);
  };

  const renderTile = (field: string, value: string, label: string) => (
    <div
      className={`border rounded-xl px-4 py-3 text-center cursor-pointer transition-all shadow-sm ${
        formData[field] === value ? 'bg-green-600 text-white border-green-700' : 'bg-white hover:shadow-md'
      }`}
      onClick={() => handleChange(field, value)}
    >
      {label}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <button onClick={onBack} className="mr-4">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              {t('IrrigationService')}
            </h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Irrigation Type */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <label className="block text-gray-700 font-medium mb-4">
              {t('irrigationType')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {renderTile('type', 'Drip', t('drip'))}
              {renderTile('type', 'Sprinkler', t('sprinkler'))}
              {renderTile('type', 'Manual', t('manualIrrigation'))}
            </div>
          </div>

          {/* Mode as Tiles */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <label className="block text-gray-700 font-medium mb-4">
              {t('mode')}
            </label>
            <div className="grid grid-cols-2 gap-4">
              {renderTile('mode', 'Automatic', t('automatic'))}
              {renderTile('mode', 'Manual', t('manual'))}
            </div>
          </div>

          {/* Date */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <label className="block text-gray-700 font-medium mb-2">
              {t('date')}
            </label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </div>

          {/* Fixed charge display */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <label className="block text-gray-700 font-medium mb-2">
              {t('charge')}
            </label>
            <div className="mt-2 text-gray-600">₹1200 {t('perHour')}</div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-right mt-6">
          <button
            onClick={step1Submit}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
          >
            {t('submit')}
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
            <h2 className="text-lg font-bold mb-4">{t('confirmSubmission')}</h2>
            <p className="text-gray-700 mb-4">
              {t('planningMessages', { charge: `1200`, date: `${formData.date}` })}
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded text-gray-600"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleConsent}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {t('confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
       {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
          onSwitchToRegister={() => {
            setShowLogin(false);
            // setShowRegister(true);
          }}
        />
      )}

{showAddressForm && 
<AddressManager userId = {userId} handleAddressSubmit= {handleAddressSubmit} onClose={onCloseAddressForm}></AddressManager>
}
    </div>
  );
};

export default IrrigationGrid;
