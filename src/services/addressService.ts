// src/services/addressService.ts
import { supabase } from '../supabase/client';

export interface Address {
  id?: string;
  user_id: string;
  name: string;
  contact: string;
  house_name: string;
  village: string;
  area: string;
  taluk: string;
}

// Get all addresses for a user
export const getAddressesByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('Addresses')
    .select('*')
    .eq('user_id', userId);
  return { data, error };
};

// Insert a new address
export const insertAddress = async (address: Address) => {
  const { data, error } = await supabase
    .from('Addresses')
    .insert([address]);
  return { data, error };
};

// Update an address
export const updateAddress = async (address: Address) => {
  if (!address.id) throw new Error('Address ID is required for update');
  const { data, error } = await supabase
    .from('Addresses')
    .update(address)
    .eq('id', address.id);
  return { data, error };
};
