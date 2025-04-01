"use server";
import { supabase } from "@/utils/supabase";
import { revalidateTag } from "next/cache"; // Enables revalidation

import { item, itemSizeVariation } from "../typesAndInterfaces/orderTypes";

// Function to fetch and format item data
export async function fetchItemsFromDB(): Promise<Record<string, item>> {
    const { data, error } = await supabase
        .from("items")
        .select("*, item_variations(*)"); // Join variations

    if (error) throw new Error(error.message);

    // Transform the DB structure to match items.ts format
    const formattedItems: Record<string, item> = {};

    data.forEach((dbItem) => {
        const sizeVariants: itemSizeVariation[] = dbItem.item_variations.map((variant: any) => ({
            parentId: dbItem.id,
            id: variant.id,
            name: variant.name,
            price: variant.price,
            description: variant.description,
            type: variant.type,
            url: variant.url,
            maximumQuantity: variant.maximum_quantity || undefined,
            minimumQuantity: variant.minimum_quantity || undefined,
            savings: variant.savings || undefined,
            bundleSize: variant.bundle_size || undefined,
        }));
        formattedItems[dbItem.id] = {
            id: dbItem.id,
            type: dbItem.type,
            name: dbItem.name,
            description: dbItem.description,
            size_variants: sizeVariants,
            heroImage: dbItem.hero_image,
            listOrder: dbItem.list_order || undefined,
        };
    });

    return formattedItems;
}

// Revalidate cache every X minutes
export async function revalidateItems() {
    revalidateTag("items"); // This tag is tied to cached data
}
