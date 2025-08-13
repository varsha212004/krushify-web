import React, { useEffect, useState } from 'react';
import { X, Pencil } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import {
  getAddressesByUserId,
  insertAddress,
  updateAddress,
} from '../services/addressService';

interface Address {
  id?: string;
  user_id: string;
  name: string;
  contact: string;
  house_name: string;
  village: string;
  area: string;
  taluk: string;
}

interface Props {
  userId: string;
  onClose: () => void;
  handleAddressSubmit: (address: Address) => void;
}

const talukOptions = ['Yellapur', 'Sirsi', 'Dandeli'];
const areaOptions = ['Main Road', 'Market Area', 'Extension', 'Near Bus Stand'];

const AddressManager: React.FC<Props> = ({ userId, onClose, handleAddressSubmit }) => {
  const { t } = useTranslation();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<Address>({
    user_id: userId,
    name: '',
    contact: '',
    house_name: '',
    village: '',
    area: '',
    taluk: '',
  });
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
const submitAddress = (data: any) => {
  
  setSelectedAddress(null);
  setFormData({
    user_id: '',
    name: '',
    contact: '',
    house_name: '',
    village: '',
    area: '',
    taluk: '',
  })
  handleAddressSubmit(data)
}
  useEffect(() => {
    fetchAddresses();
  }, [userId]);

  const fetchAddresses = async () => {
    const { data, error } = await getAddressesByUserId(userId);

    if (!error && data) setAddresses(data);
  };

  const handleChange = (field: keyof Address, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.id) {
      await updateAddress(formData);
    } else {
      await insertAddress({ ...formData, user_id: userId });
    }
    setFormData({
      user_id: userId,
      name: '',
      contact: '',
      house_name: '',
      village: '',
      area: '',
      taluk: '',
    });
    setEditing(false);
    fetchAddresses();
  };

  const renderTile = (field: keyof Address, value: string, label: string) => (
    <div
      key={value}
      className={`border rounded-xl px-4 py-3 text-center cursor-pointer transition-all shadow-sm ${formData[field] === value
        ? 'bg-green-600 text-white border-green-700'
        : 'bg-white hover:shadow-md'
        }`}
      onClick={() => handleChange(field, value)}
    >
      {label}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">{t('yourAddresses')}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-4 border rounded shadow relative mb-4 cursor-pointer transition ${
              selectedAddress?.id === addr.id
                ? 'bg-green-100 border-green-400'
                : 'bg-gray-50 hover:bg-green-50'
            }`}
            onClick={() => {
              setSelectedAddress(addr);
              console.log('Submitted address:', addr); // This simulates submit
            }}
          >
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent submit when pencil is clicked
                setFormData(addr);
                setEditing(true);
              }}
            >
              <Pencil size={18} />
            </div>
            <p><strong>{t('name')}:</strong> {addr.name}</p>
            <p><strong>{t('contact')}:</strong> {addr.contact}</p>
            <p><strong>{t('house')}:</strong> {addr.house_name}</p>
            <p><strong>{t('village')}:</strong> {addr.village}</p>
            <p><strong>{t('area')}:</strong> {addr.area}</p>
            <p><strong>{t('taluk')}:</strong> {addr.taluk}</p>
            
          </div>
          
        ))}
        {editing && (
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 border rounded shadow">
            <input
              type="text"
              placeholder={t('yourName')}
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              type="tel"
              placeholder={t('contact')}
              value={formData.contact}
              onChange={(e) => handleChange('contact', e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              type="text"
              placeholder={t('house')}
              value={formData.house_name}
              onChange={(e) => handleChange('house_name', e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              placeholder={t('village')}
              value={formData.village}
              onChange={(e) => handleChange('village', e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />

            {/* Area Dropdown */}
            <select
              value={formData.area}
              onChange={(e) => handleChange('area', e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">{t('selectArea')}</option>
              {areaOptions.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>

            {/* Taluk Tile Buttons */}
            <div>
              <label className="block font-medium mb-2">{t('taluk')}</label>
              <div className="grid grid-cols-3 gap-3">
                {talukOptions.map((taluk) =>
                  renderTile('taluk', taluk, taluk)
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              {t('saveAddress')}
            </button>

         
          </form>

        )}
<div className="flex gap-2 mb-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
          onClick={() => {
            setEditing(true);
            setFormData({
              user_id: userId,
              name: '',
              contact: '',
              house_name: '',
              village: '',
              area: '',
              taluk: '',
            });
          }}
        >
          {t('addNewAddress')}
        </button>
        {!!selectedAddress && (
              <button
               className="bg-green-600 text-white px-4 gap-2 py-2 rounded hover:bg-green-700 mb-4"
                onClick={() => submitAddress(selectedAddress)}
              >
                {t('submit')}
              </button>
            )}
</div>
        
      </div>
    </div>
  );
};

export default AddressManager;
