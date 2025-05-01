"use client";

import { use, useEffect, useMemo, useState } from "react";
import { fetchOrderDetail } from "@/app/actions/fetchOrderDetails";
import { fetchedOrder, OrderItemType } from "@/app/typesAndInterfaces/orderTypes";
import Loading from "./loading";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import { handleStatusChange, commitStatusChange, commitPaidChange, handlePaidChange } from "@/app/admin/orders/helperFunctions/orderStatusHelpers";
import StatusUpdateModal from "@/app/admin/orders/modals/statusUpdateModal";
import PaidUpdateModal from "@/app/admin/orders/modals/paidModal";
import { orderStatuses } from "@/app/data/orderContent";

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
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [pendingStatusChange, setPendingStatusChange] = useState<string | null>(null);
    const [showPaidModal, setShowPaidModal] = useState(false);
    const [pendingPaidChange, setPendingPaidChange] = useState<boolean | null>(null);
    const [paidChecked, setPaidChecked] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { order, orderItems } = await fetchOrderDetail(orderId, email);
                setOrderData({ order, orderItems });
                setPaidChecked(order?.paid);
                setIsLoading(false);
            } catch (err) {
                setError("Failed to load order details.");
                setIsLoading(false);
            }
        };
        fetchData();
    }, [orderId, email]);

    const total = useMemo(() => {
        let total = 0;
        orderData.orderItems?.forEach((item) => {
            total += item.variant.price * item.quantity;
        });
        return total;
    }, [orderData.orderItems]);


    const onStatusChange = (newStatus: string) => {
        if (!isAdmin) return;
        handleStatusChange({
            newStatus,
            currentStatus: orderData.order?.status || "",
            onImportantStatusChange: (status) => {
                setPendingStatusChange(status);
                setShowStatusModal(true);
            },
            onSimpleStatusChange: (status) => {
                commitStatusChange({
                    orderId,
                    newStatus: status,
                    oldStatus: orderData.order?.status || "",
                    orderData,
                    setOrderData,
                });
            },
        });
    };

    const onPaidChange = (paid: boolean) => {
        if (!isAdmin) return;
        handlePaidChange({
            newPaid: paid,
            oldPaid: !paid,
            onImportantPaidChange: (paidValue) => {
                setPendingPaidChange(paidValue);
                setShowPaidModal(true); // trigger modal with optional note/email
            },
            onSimplePaidChange: async (paidValue) => {
                await commitPaidChange({
                    status: orderData.order?.status || "",
                    orderId,
                    newPaid: paidValue,
                    oldPaid: paidChecked ?? false,
                    note: "",
                    emailCustomer: false,
                    orderData,
                    amount: total,
                    paymentMethod: null
                });
                setPaidChecked(paidValue);
            },
        });
    };

    if (isLoading) return <Loading message="Loading Order" />;
    if (error) return <div className="p-6 text-red-600">{error}</div>;
    if (!orderData.order || !orderData.orderItems)
        return <div className="p-6">No order data available.</div>;


    const handlePaidCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPaidChecked = !paidChecked; // Calculate the new state
        setPaidChecked(newPaidChecked); // Update the state
        onPaidChange(newPaidChecked); // Pass the updated state explicitly
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6 bg-[#fff8e1] text-slate-700 rounded-lg shadow-md">
            <Toaster richColors={true} position="top-center" />
            <h1 className="text-2xl font-bold text-yellow-600 mb-2">
                Order #{orderData.order.id}
            </h1>

            <div className="text-gray-800 space-y-2 mb-6">
                {/* Status */}
                <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {isAdmin ? (
                        <select
                            value={orderData.order.status as string}
                            onChange={(e) => onStatusChange(e.target.value)}
                            className="ml-2 p-1 border rounded"
                        >
                            {
                                Object.entries(orderStatuses).map(([key, value]) => (
                                    <option key={key} value={key}>
                                        {value}
                                    </option>
                                ))
                            }
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
                            checked={paidChecked ?? false}
                            onChange={handlePaidCheckboxChange}
                            className="ml-2"
                        />
                    ) : orderData.order.paid ? ("Yes") : ("No")}
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
            <StatusUpdateModal
                visible={showStatusModal}
                onClose={() => setShowStatusModal(false)}
                onConfirm={(note, emailCustomer) => {
                    if (pendingStatusChange) {
                        commitStatusChange({
                            orderId,
                            newStatus: pendingStatusChange,
                            oldStatus: orderData.order?.status as string,
                            orderData,
                            setOrderData,
                            note,
                            emailCustomer,
                        });
                        setPendingStatusChange(null);
                    }
                }}
                newStatus={pendingStatusChange || ""}
                customerName={orderData.order.customer_name}
                orderNumber={orderData.order.id}
            />
            <PaidUpdateModal
                visible={showPaidModal}
                onClose={() => setShowPaidModal(false)}
                onConfirm={(note, emailCustomer, paymentMethod) => {
                    if (pendingPaidChange) {
                        commitPaidChange({
                            status: orderData.order?.status as string,
                            orderId,
                            newPaid: paidChecked ?? false,
                            oldPaid: !(paidChecked ?? false),
                            note,
                            emailCustomer,
                            orderData,
                            amount: total,
                            paymentMethod
                        });
                        setPendingPaidChange(null);
                    }
                }}
                paid={paidChecked || false}
                customerName={orderData.order.customer_name}
                orderNumber={orderData.order.id}
                setPaidChecked={setPaidChecked}
            />
        </div>
    );
};

export default OrderDetailView;
