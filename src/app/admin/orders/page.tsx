'use client';

import { useState, useEffect, useMemo } from 'react';
import { fetchOrdersForAdmin } from '@/app/actions/fetchOrderForAdmin';
import { OrderType } from '@/app/typesAndInterfaces/orderTypes';
import OrderTable from './ordersTable';
import OrderSearchBar from './orderSearchBar';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [loading, setLoading] = useState(true);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

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

    // Filter orders client-side based on search term
    const filteredOrders = useMemo(() => {
        if (!searchTerm.trim()) return orders;

        const lower = searchTerm.toLowerCase();
        return orders.filter((order) =>
            order.customer_name.toLowerCase().includes(lower) ||
            order.email.toLowerCase().includes(lower) ||
            order.id.toLowerCase().includes(lower)
        );
    }, [orders, searchTerm]);

    return (
        <div className="min-h-screen bg-[#fff9f2] p-4 text-slate-800">
            <h1 className="text-3xl font-bold mb-4 text-primary">Admin Orders</h1>

            <div className="mb-4">
                <OrderSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            </div>

            <OrderTable
                orders={filteredOrders}
                loading={loading}
                totalOrders={filteredOrders.length}
                pageIndex={pageIndex}
                pageSize={pageSize}
                setPageIndex={setPageIndex}
                setPageSize={setPageSize}
            />
        </div>
    );
}
