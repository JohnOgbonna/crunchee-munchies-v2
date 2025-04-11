"use server";

import { secureSupabase } from "@/utils/supabase";

export async function updateOrderPaid(orderId: string, paid: boolean) {
  try {
    const { error } = await secureSupabase
      .from("orders")
      .update({
        paid,
        last_modified: new Date().toISOString(),
        last_modified_by: "admin"
      })
      .eq("id", orderId);

    if (error) throw error;

    return { success: true };
  } catch (err) {
    console.error("Failed to update paid status:", err);
    return { success: false, message: "Could not update paid status." };
  }
}
