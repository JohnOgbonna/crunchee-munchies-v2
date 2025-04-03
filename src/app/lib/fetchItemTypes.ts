
"use server";
import { supabase } from "@/utils/supabase";
import { revalidateTag } from "next/cache"; // Enables revalidation and caching
import { itemType } from "../typesAndInterfaces/orderTypes"; // Assuming the itemType type is imported from your types
import { cache } from "react";

// Function to fetch and format item type data
export async function fetchItemTypesFromDB(): Promise<Record<string, itemType>> {
    const { data, error } = await supabase
        .from("item_types")
        .select("*"); // Fetch all columns from the item_types table

    if (error) throw new Error(error.message);

    // Transform the DB structure to match itemTypes.ts format
    const formattedItemTypes: Record<string, itemType> = {};

    data.forEach((dbType) => {
        formattedItemTypes[dbType.type] = {
            id: dbType.id,
            type: dbType.type,
            name: dbType.name,
            description: dbType.description || "",
            listOrder: dbType.list_order || undefined,
        };
    });

    return formattedItemTypes;
}

// Revalidate cache every X minutes
export async function revalidateItemTypes() {
    revalidateTag("item_types"); // This tag is tied to cached data for item types
}

// Cache fetching of item types
export const getCachedItemTypes = cache(async () => {
    return fetchItemTypesFromDB();
});
