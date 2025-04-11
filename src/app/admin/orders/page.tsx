'use client';

import { useState, useEffect, useMemo } from 'react';
import { fetchOrdersForAdmin } from '@/app/actions/fetchOrderForAdmin';
import { OrderType } from '@/app/typesAndInterfaces/orderTypes';
import OrderTable from './ordersTable';
import OrderSearchBar from './orderSearchBar';
import { validateCognitoToken } from '@/app/lib/auth/validateCognitoToken';
import router from 'next/router';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [loading, setLoading] = useState(true);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [validationFailed, setValidationFailed] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('cognitoToken');
        if (!token) {
            router.push('/admin'); // redirect to login
        }
        else if (!validateCognitoToken(token)) {
            setValidationFailed(() => true);
            localStorage.removeItem('cognitoToken');
        }

    }, [router]);

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

    if (validationFailed) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-slate-800">
                <h1 className="text-2xl font-bold mb-4">Invalid Token</h1>
                <p className="text-lg">Please sign in again.</p>
            </div>
        );
    }
    else if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-screen text-slate-800">
            <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
    );
    else return (
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
