import { fetchItemsFromDB } from "@/app/lib/fetchItems";
import { cache } from "react";

export const getCachedItems = cache(async () => {
    return fetchItemsFromDB();
});

// API Route to manually trigger revalidation
export async function GET() {
    const items = await getCachedItems();
    return Response.json(items);
}
