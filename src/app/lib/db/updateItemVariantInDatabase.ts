'use server';

import { secureSupabase } from '@/utils/supabase';

export const updateItemVariantInDb = async (
  variantId: string,
  updates: Partial<{
    name: string;
    description: string;
    price: number;
    bundleSize?: number;
    savings?: number;
    minimum_quantity?: number;
    maximum_quantity?: number;
    list_order?: number;
    pickup_only?: boolean;
  }>
) => {
  const { error } = await secureSupabase
    .from('item_variations')
    .update({
      ...updates,
    })
    .eq('id', variantId);

  if (error) {
    throw new Error(error.message);
  }
};
