// lib/db/updateItemInDatabase.ts
'use server';

import { secureSupabase } from '@/utils/supabase';

export const updateItemInDb = async (
  itemId: string,
  updates: Partial<{ name: string; description: string; heroImage: string; }>
) => {
  const { error } = await secureSupabase
    .from('items')
    .update({
      ...updates,
      last_modified: new Date().toISOString(),
    })
    .eq('id', itemId);

  if (error) {
    throw new Error(error.message);
  }
};

export const deleteItemFromDb = async (itemId: string) => {
  const { data, error } = await secureSupabase
    .from('items')
    .delete()
    .eq('id', itemId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
