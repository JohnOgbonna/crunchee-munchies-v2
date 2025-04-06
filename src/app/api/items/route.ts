import { NextResponse } from "next/server";
import { fetchItemsFromDB, getCachedItems } from "@/app/lib/fetchItems";
import { cache } from "react";

// Cache the database call to optimize performance

// Named export for the GET handler
export async function GET(request: Request) {
    try {
        const items = await getCachedItems();
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
    }
}