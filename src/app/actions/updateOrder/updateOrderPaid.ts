"use server";

import { secureSupabase } from "@/utils/supabase";
import { paymentMethods } from "@/app/data/orderContent";

export async function updateOrderPaid(
  orderId: string,
  paid: boolean,
  amount: number,
  email: string,
  name: string,
  paymentMethod: keyof typeof paymentMethods | null,
  note?: string
) {
  try {
    // 1. Update the order's paid status
    const { error: orderError } = await secureSupabase
      .from("orders")
      .update({
        paid,
        last_modified: new Date().toISOString(),
        last_modified_by: "admin",
      })
      .eq("id", orderId);

    if (orderError) throw orderError;

    // 2. Upsert payment record based on unique order_id
    const { error: paymentError } = await secureSupabase
      .from("payments")
      .upsert({
        order_id: orderId,
        customer_name: name,
        email,
        amount,
        payment_method: paid ? paymentMethod : null,
        payment_date: new Date().toISOString(),
        notes: note || null,
        paid,
      }, { onConflict: 'order_id' });

    if (paymentError) throw paymentError;

    return { success: true };
  } catch (err) {
    console.error("Failed to update paid status or record payment:", err);
    return { success: false, message: "Could not update paid status or record payment." };
  }
}
