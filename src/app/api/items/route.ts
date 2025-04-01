import { NextResponse } from "next/server";
import { fetchItemsFromDB } from "@/app/lib/fetchItems";
import { cache } from "react";

// Cache the database call to optimize performance
export const getCachedItems = cache(async () => {
    return fetchItemsFromDB();
});

export async function GET() {
    try {
        const items = await getCachedItems();
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
    }
}
