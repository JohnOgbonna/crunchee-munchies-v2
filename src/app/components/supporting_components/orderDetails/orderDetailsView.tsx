"use client";

import { useEffect, useState } from "react";
import { fetchOrderDetail } from "@/app/actions/fetchOrderDetails";
import { updateOrderStatus } from "@/app/actions/updateOrder/updateOrderStatus";
import { updateOrderPaid } from "@/app/actions/updateOrder/updateOrderPaid";
import { fetchedOrder, OrderItemType } from "@/app/typesAndInterfaces/orderTypes";
import Loading from "./loading";
import Link from "next/link";
import { toast, Toaster } from "sonner";

interface OrderDetailViewProps {
    orderId: string;
    email?: string;
    isAdmin?: boolean;
}

const OrderDetailView = ({ orderId, email, isAdmin = false }: OrderDetailViewProps) => {
    const [orderData, setOrderData] = useState<{
        order: fetchedOrder | null;
        orderItems: OrderItemType[] | null;
    }>({ order: null, orderItems: null });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { order, orderItems } = await fetchOrderDetail(orderId, email);
                setOrderData({ order, orderItems });
                setIsLoading(false);
            } catch (err) {
                setError("Failed to load order details.");
                setIsLoading(false);
            }
        };
        fetchData();
    }, [orderId, email]);

    const handleStatusChange = async (newStatus: string) => {
        const oldStatus = orderData.order?.status;
        if (!orderData.order) return;

        setOrderData((prev) => ({
            ...prev,
            order: { ...prev.order!, status: newStatus },
        }));

        try {
            if (oldStatus !== newStatus) {
                const updated = await updateOrderStatus(orderId, newStatus);
                if (updated.success) {
                    setOrderData((prev) => ({
                        ...prev,
                        order: { ...prev.order!, status: newStatus },
                    }));
                    toast.success(`Order status updated to ${newStatus}`);
                }
            }

        } catch (err) {
            alert("Error updating status");
        }
    };

    const handlePaidChange = async (paid: boolean) => {
        if (!orderData.order) return;

        setOrderData((prev) => ({
            ...prev,
            order: { ...prev.order!, paid },
        }));

        try {
            const updated = await updateOrderPaid(orderId, paid);
            if (updated.success) {
                setOrderData((prev) => ({
                    ...prev,
                    order: { ...prev.order!, paid },
                }));
                toast.success(`Order paid status updated to ${paid}`);
            }

        } catch (err) {
            toast.error("Error updating paid status");
        }
    };

    if (isLoading) return <Loading message="Loading Order" />;
    if (error) return <div className="p-6 text-red-600">{error}</div>;
    if (!orderData.order || !orderData.orderItems)
        return <div className="p-6">No order data available.</div>;

    const total = orderData.orderItems.reduce(
        (sum, item) => sum + item.quantity * item.variant.price,
        0
    );

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6 bg-[#fff8e1] text-slate-700 rounded-lg shadow-md">
            <Toaster richColors={true} position="top-center" />
            <h1 className="text-2xl font-bold text-yellow-600 mb-2">
                Order #{orderData.order.id}
            </h1>

            <div className="text-gray-800 space-y-1 mb-6">
                {/* Status */}
                <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {isAdmin ? (
                        <select
                            value={orderData.order.status as string}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            className="ml-2 p-1 border rounded"
                        >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="ready for pickup">Ready for Pickup</option>
                            <option value="shipped">Shipped</option>
                        </select>
                    ) : (
                        orderData.order.status
                    )}
                </p>

                {/* Paid */}
                <p className="flex gap-2 items-center">
                    <span className="font-semibold">Paid:</span>{" "}
                    {isAdmin ? (
                        <input
                            type="checkbox"
                            checked={orderData.order.paid ?? false}
                            onChange={(e) => handlePaidChange(e.target.checked)}
                            className="ml-2"
                        />
                    ) : orderData.order.paid ? (
                        "Yes"
                    ) : (
                        "No"
                    )}
                </p>

                <p>
                    <span className="font-semibold">Customer:</span>{" "}
                    {orderData.order.customer_name}
                </p>
                <p>
                    <span className="font-semibold">Email:</span> {orderData.order.email}
                </p>
                {orderData.order.phone_number && (
                    <p>
                        <span className="font-semibold">Phone:</span>{" "}
                        {orderData.order.phone_number}
                    </p>
                )}
                {orderData.order.needs_delivery && (
                    <p>
                        <span className="font-semibold">Address:</span>{" "}
                        {orderData.order.address}
                    </p>
                )}
                <p>
                    <span className="font-semibold">Notes:</span>{" "}
                    {orderData.order.notes || "N/A"}
                </p>
            </div>

            <h2 className="text-xl font-bold text-gray-700 mb-4">Order Items</h2>
            <div className="space-y-6">
                {orderData.orderItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 border-b pb-4 border-gray-200 max-w-[600px]"
                    >
                        <img
                            src={item.variant.url}
                            alt={item.variant.name}
                            className="w-32 h-32 object-cover rounded-md"
                        />
                        <div className="flex flex-col gap-y-1">
                            <h3 className="text-lg font-semibold text-yellow-600">
                                {item.variant.name}
                            </h3>
                            <p className="text-sm md:text-[1rem] hover:underline hover:text-blue-500">
                                <Link href={`/shop/${item.parent.id}?`}>
                                    Item Type: <span>{item.parent.name}</span>
                                </Link>
                            </p>
                            <p className="text-sm md:text-[1rem]">
                                Quantity: <span>{item.quantity}</span>
                            </p>
                            <p className="text-sm md:text-[1rem]">
                                Price: <span>${item.variant.price}</span>
                            </p>
                            <p className="text-sm md:text-[1rem]">
                                Total:{" "}
                                <span>
                                    ${(item.variant.price * item.quantity).toFixed(2)}
                                </span>
                            </p>
                        </div>
                        <button className="p-2 bg-orange-300 text-white font-bold sm:text-md rounded-md hover:underline">
                            <Link
                                href={`/shop/${item.parent.id}?variant=${item.variant.id}`}
                                target="_blank"
                            >
                                View Item
                            </Link>
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200 space-y-2 max-w-[600px]">
                <p>
                    <span className="font-bold">Delivery Method:</span>{" "}
                    {orderData.order.needs_delivery
                        ? "Shipping"
                        : "Pickup (Northwest Calgary)"}
                </p>
                {orderData.order.needs_delivery && (
                    <p>
                        <span className="font-bold">Address:</span>{" "}
                        {orderData.order.address}
                    </p>
                )}
                <p>
                    <span className="font-bold">Order Total:</span> ${total.toFixed(2)}
                </p>
            </div>

            <footer className="text-center pt-8 text-xs text-gray-500">
                &copy; 2025 Crunchee Munchies. All rights reserved.
            </footer>
        </div>
    );
};

export default OrderDetailView;
