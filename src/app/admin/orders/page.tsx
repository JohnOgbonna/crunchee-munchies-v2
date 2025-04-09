// app/admin/orders/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { fetchOrdersForAdmin } from '@/app/actions/fetchOrderForAdmin';
import { OrderType } from '@/app/typesAndInterfaces/orderTypes';
import OrderTable from './ordersTable';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [loading, setLoading] = useState(true);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10); // Default page size is 10
    const [statusFilter, setStatusFilter] = useState<string | null>(null); // Optional filter for status

    useEffect(() => {
        async function fetchOrders() {
            setLoading(true);
            const { orders, count } = await fetchOrdersForAdmin(pageIndex + 1, pageSize, statusFilter);
            setOrders(orders);
            setTotalOrders(count as number);
            setLoading(false);
        }
        fetchOrders();
    }, [pageIndex, pageSize, statusFilter]);

    return (
        <div className="min-h-screen bg-[#fff9f2] p-4 text-slate-800">
            <h1 className="text-3xl font-bold mb-4 text-primary">Admin Orders</h1>

            {/* Pass data to the OrderTable child component */}
            <OrderTable
                orders={orders}
                loading={loading}
                totalOrders={totalOrders}
                pageIndex={pageIndex}
                pageSize={pageSize}
                setPageIndex={setPageIndex}
                setPageSize={setPageSize}
            />
        </div>
    );
}
