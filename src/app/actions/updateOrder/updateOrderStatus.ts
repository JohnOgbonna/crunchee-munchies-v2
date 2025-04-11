"use server";

import { secureSupabase } from "@/utils/supabase";
import { triggerStatusUpdateEmail } from "@/app/lib/email/triggerStatusUpdateEmail"; // You’ll implement this Lambda hook later

export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    // 1. Update the order status
    const { error } = await secureSupabase
      .from("orders")
      .update({
        status: newStatus,
        last_modified: new Date().toISOString(),
        last_modified_by: "admin"
      })
      .eq("id", orderId);

    if (error) throw error;

    // 2. Trigger email if status is 'approved' or 'ready for pickup'
    // if (newStatus === "approved" || newStatus === "ready for pickup") {
    //   await triggerStatusUpdateEmail(orderId, newStatus);
    // }

    return { success: true };
  } catch (err) {
    console.error("Failed to update order status:", err);
    return { success: false, message: "Could not update order status." };
  }
}
