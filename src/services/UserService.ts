import { supabase } from '../supabase/client.ts';

export const getUserIdByPhone = async (phone: string) => {
  const { data, error } = await supabase
    .from('User') // replace with your actual table name
    .select('id') // fetch what you need
    .eq('phone', phone)
    .single();

  if (error) {
    console.error('User fetch error:', error.message);
    return null;
  }

  return data;
};