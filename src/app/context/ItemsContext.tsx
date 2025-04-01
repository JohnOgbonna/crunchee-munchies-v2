"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getCachedItems } from "../lib/fetchItems";
import { item } from "../typesAndInterfaces/orderTypes";


interface ItemsMap {
    [key: string]: item; // Store items as an object
}

interface ItemsContextProps {
    items: ItemsMap;
    loading: boolean;
    error: string | null;
}

const ItemsContext = createContext<ItemsContextProps | undefined>(undefined);

export const ItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<ItemsMap>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadItems = async () => {
            try {
                const data = await getCachedItems();
                const itemsArray = Array.isArray(data) ? data : [];
                const itemsMap: Record<string, item> = itemsArray.reduce((acc, currItem) => {
                    acc[currItem.id] = currItem; // Ensure correct assignment
                    return acc;
                }, {} as Record<string, item>); // Explicitly cast as Record<string, item>
                setItems(itemsMap);
            } catch (err) {
                setError("Failed to load items.");
            } finally {
                setLoading(false);
            }
        };
        loadItems();
    }, []);

    return (
        <ItemsContext.Provider value={{ items, loading, error }}>
            {children}
        </ItemsContext.Provider>
    );
};

export const useItems = () => {
    const context = useContext(ItemsContext);
    if (!context) {
        throw new Error("useItems must be used within an ItemsProvider");
    }
    return context;
};
