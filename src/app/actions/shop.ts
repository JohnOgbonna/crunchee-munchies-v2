"use server";
import { supabase } from "../../utils/supabase";

// Fetch all items with their variations
export async function fetchItems() {
  const { data: items, error } = await supabase
    .from("item_variations")
    .select("*");

  if (error) throw new Error(error.message);
  return items;
}
