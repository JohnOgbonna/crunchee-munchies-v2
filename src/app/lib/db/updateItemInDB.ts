// lib/supabase/updateItemInDatabase.ts
'use server';
import { secureSupabase } from '@/utils/supabase';

export const updateItemInDb = async (itemId: string, updates: { name: string; description: string }) => {
  
  const { error } = await secureSupabase
    .from('items')
    .update({
      name: updates.name,
      description: updates.description,
      last_modified: new Date().toISOString(),
    })
    .eq('id', itemId);

  if (error) {
    throw new Error(error.message);
  }
};
export const deleteItemFromDb = async (itemId: string) => {
    const { data, error } = await secureSupabase
        .from('items') // Assuming 'items' is the table name
        .delete()
        .eq('id', itemId);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
