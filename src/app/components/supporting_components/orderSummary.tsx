import React from "react";
import { itemId, itemSizeVariation } from "@/app/typesAndInterfaces/orderTypes";
import { shopLinks, itemDataMap } from "@/app/data/items";
import Link from "next/link";

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
    isNav?: boolean; // New prop to indicate if it's used in the navbar
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ selectedItemId, orders, isNav = false }) => {
    const selectedOrder = orders[selectedItemId];

    if (!selectedOrder) return null;

    const variations: { [variantId: string]: itemSizeVariation } = {};
    itemDataMap[shopLinks[selectedItemId] as keyof typeof itemDataMap].size_variants?.forEach(variation => {
        variations[variation.id] = variation;
    });

    const selectedItem = itemDataMap[shopLinks[selectedItemId] as keyof typeof itemDataMap];
    let orderTotal = 0;

    Object.entries(selectedOrder.variations).forEach(([variantId, orderItem]) => {
        orderTotal += orderItem.quantity * variations[variantId].price;
    });

    return (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-[#f5e3c5] max-w-[450px] shadow-md mx-auto md:min-w-[320px] lg:min-w-[350px]">
            <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold mb-2">{`${selectedItem.name} Order Total: $${orderTotal.toFixed(2)}`}</h3>
                {isNav && (
                    <Link
                        href={`/shop/${shopLinks[selectedItemId]}`}
                        className="text-blue-500 text-sm font-semibold underline hover:text-blue-700"
                    >
                        Edit
                    </Link>
                )}
            </div>
            <ul className="space-y-1 flex flex-col justify-center">
                {Object.entries(selectedOrder.variations).map(([variantId, orderItem]) =>
                    orderItem.quantity > 0 ? (
                        <li key={variantId} className="flex gap-x-2 items-center text-gray-700 overflow-x-scroll w-fit text-[.8rem]">
                            <span>
                                <span className={`md:w-[120px] lg:w-[200px]`}>
                                    {`${selectedItem.name}: ${variations[variantId].name} - `}
                                    <span className="font-semibold">{`$${variations[variantId].price}`}</span>
                                </span>
                            </span>
                            <span className="font-semibold">{`x ${orderItem.quantity} = `}</span>
                            <span className="font-semibold">${(orderItem.quantity * variations[variantId].price).toFixed(2)}</span>
                        </li>
                    ) : null
                )}
            </ul>
        </div>
    );
};

export default OrderSummary;
