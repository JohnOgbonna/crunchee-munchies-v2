// pages/admin/items.tsx
'use client';

import { useEffect, useState } from 'react';
import { fetchItemsFromDB } from '@/app/lib/fetchItems';
import { item } from '@/app/typesAndInterfaces/orderTypes';
import AdminItemCard from '@/app/components/supporting_components/items/adminItemCard';
import { useValidateAdmin } from '@/app/lib/hooks/useValidateAdmin';

export default function AdminItemsPage() {
    const [items, setItems] = useState<Record<string, item>>({});
    const { validationFailed } = useValidateAdmin();
    

    useEffect(() => {
        const loadItems = async () => {
            try {
                const data = await fetchItemsFromDB();
                setItems(data);
            } catch (err) {
                console.error('Failed to load items:', err);
            }
        };
        loadItems();
    }, []);

    return (
        <div className="p-2">
            <h1 className="text-3xl font-bold mb-6 text-primary">Manage Items</h1>
            <div className="space-y-6">
                {Object.values(items)
                    .sort((a, b) => (a.listOrder || 0) - (b.listOrder || 0))
                    .map((item) => (
                        <AdminItemCard
                            key={item.id}
                            item={item}
                        />
                    ))}
            </div>
        </div>
    );
}
