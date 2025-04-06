"use server";

import { createClient } from "@supabase/supabase-js";
import { FormDataType } from "../data/customerFields";
import { sendOrder } from "../typesAndInterfaces/orderTypes";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function saveOrderToDatabase(orderId: string, customer: FormDataType, order: sendOrder) {
    try {
        // Insert order into `orders` table
        const { error: orderError } = await supabase
            .from("orders")
            .insert([
                {
                    id: orderId, // Order ID is now passed from sendOrder
                    customer_name: `${customer.firstName} ${customer.lastName}`,
                    email: customer.email,
                    phone_number: customer.phone || null,
                    needs_delivery: customer.needsDelivery,
                    address: customer.needsDelivery ? customer.streetAddress : null,
                    city: customer.needsDelivery ? customer.city : null,
                    province_state: customer.needsDelivery ? customer.province : null,
                    postal_code: customer.needsDelivery ? customer.postalZipCode : null,
                    notes: customer.notes || null,
                },
            ]);

        if (orderError) throw orderError;

        // Insert order items into `order_items` table
        const orderItems = Object.values(order.variations).map((variant, index) => ({
            id: `${orderId}-${index + 1}`, // Unique ID for each order item
            order_id: orderId, // Use the passed orderId
            variant_id: variant.id,
            quantity: variant.quantity,
            notes: customer.notes || null,
        }));

        const { error: orderItemsError } = await supabase.from("order_items").insert(orderItems);
        if (orderItemsError) throw orderItemsError;

        return orderId; // Return the assigned order ID
    } catch (error) {
        console.error("Database error:", error);
        throw new Error("Failed to save order to database.");
    }
}
