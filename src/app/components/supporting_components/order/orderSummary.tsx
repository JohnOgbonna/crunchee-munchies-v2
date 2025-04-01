'use client'
import React, { useState } from "react";
import { item, itemId, itemSizeVariation } from "@/app/typesAndInterfaces/orderTypes";
import Link from "next/link";
import CloseIcon from "../icons/close";
import { useOrderContext } from "@/app/context/OrderContext";
import LoadingItems from "./loadingItems";

interface OrderSummaryProps {
    selectedItemId: itemId;
    orders: {
        [id in itemId]?: {
            variations: {
                [variantId: string]: {
                    quantity: number;
                };
            };
        };
    };
    isNav?: boolean;
    closeCart?: () => void;
    isOrderPage?: boolean;
    isSelected?: boolean;
    items?: Record<string, item>;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ selectedItemId, orders, isNav = false, closeCart, isOrderPage, isSelected, items }) => {
    const { clearItemVariation, removeOrder } = useOrderContext();

    if (!items) {
        return <LoadingItems />
    }

    const selectedOrder = orders[selectedItemId];
    if (!selectedOrder) return null;

    const selectedItem = items[selectedItemId];

    if (!selectedItem) {
        return <div className="text-center text-gray-600">Item not found.</div>;
    }

    const variations: { [variantId: string]: itemSizeVariation } = {};
    selectedItem.size_variants?.forEach(variation => {
        variations[variation.id] = variation;
    });

    const handleClose = () => {
        if (isNav && closeCart) closeCart();
    };

    let orderTotal = 0;

    Object.entries(selectedOrder.variations).forEach(([variantId, orderItem]) => {
        orderTotal += orderItem.quantity * variations[variantId].price;
    });

    return (
        <div className={`${isNav ? 'mt-6' : ''} ${isSelected && isOrderPage ? 'border-2 border-blue-500 shadow-xl' : 'border-gray-300 scale-95'} transition-all duration-400 ease-in-out p-2 md:p-4 border rounded-lg bg-[#f5e3c5] shadow-md sm:w-full max-w-[450px] mx-auto md:min-w-[340px] lg:min-w-[375px]`}>
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-semibold underline">{`${selectedItem.name} Order Total: $${orderTotal.toFixed(2)}`}</h3>
                {isNav && (
                    <Link
                        href={`/shop/${selectedItem.id}`}
                        className="text-blue-500 text-sm font-semibold underline hover:text-blue-700"
                        onClick={handleClose}
                    >
                        Edit
                    </Link>
                )}
            </div>
            <ul className="space-y-1 flex flex-col justify-center">
                {Object.entries(selectedOrder.variations).map(([variantId, orderItem]) =>
                    orderItem.quantity > 0 ? (
                        <li key={variantId} className="flex gap-x-2 items-center text-gray-700 w-full text-[.8rem] md:text-[.9rem] justify-between">
                            <span className="w-[120px] md:w-[180px]">
                                <span>
                                    {`${selectedItem.name}: ${variations[variantId].name} - `}
                                    <span className="font-semibold">{`$${variations[variantId].price}`}</span>
                                </span>
                            </span>
                            <span className="font-semibold">{`x ${orderItem.quantity} = `}</span>
                            <span className="font-semibold">${(orderItem.quantity * variations[variantId].price).toFixed(2)}</span>
                            <span className="cursor-pointer"
                                onClick={() => clearItemVariation(selectedItemId, variantId)}
                            >
                                <CloseIcon className="hover:scale-105 transition-all duration-300" />
                            </span>
                        </li>
                    ) : null
                )}
            </ul>
            {isNav &&
                <Link href={`/order?item=${selectedItem.id}`} className="text-md block cursor-pointer font-semibold mt-2 text-center text-red-600 hover:text-red-800 hover:underline w-full"
                    onClick={handleClose}
                >Complete Order</Link>
            }
            <p className="font-bold text-sm text-gray-600 text-center mt-1 hover:underline cursor-pointer hover:text-gray-800 hover:scale-105 transition-all duration-300 w-fit mx-auto"
                onClick={() => removeOrder(selectedItemId)}
            >Remove</p>
        </div>
    );
};

export default OrderSummary;
