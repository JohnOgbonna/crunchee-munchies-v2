"use server";

import { createClient } from "@supabase/supabase-js";
import { Orders } from "../typesAndInterfaces/orderTypes";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function fetchOrdersForAdmin(page: number = 1, limit: number = 10, status: string | null = null) {
    try {
        // Calculate the starting point for pagination
        const offset = (page - 1) * limit;

        // Build the query to fetch orders
        let query = supabase
            .from("orders")
            .select("*")
            .order("created_at", { ascending: false })
            .range(offset, offset + limit - 1); // Pagination range

        // If status is provided, filter orders by status
        if (status) {
            query = query.eq("status", status);
        }

        // Fetch the orders from the database
        const { data: orders, error, count } = await query;

        if (error) throw error;

        // Return fetched orders and the total count for pagination
        return { orders, count };
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Failed to fetch orders for admin.");
    }
}
