import { supabase } from '../supabase/client.ts';

export const addIrrigationRequest = async (data: Record<string, any>) => {
  const { error } = await supabase.from('irrigation').insert([data]);
  if (error) throw error;
};
