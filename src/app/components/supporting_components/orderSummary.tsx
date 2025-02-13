import React from "react";
import { itemId, itemSizeVariation } from "@/app/typesAndInterfaces/orderTypes";
import { shopLinks, itemDataMap } from "@/app/data/items";

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
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ selectedItemId, orders }) => {
    const selectedOrder = orders[selectedItemId];

    if (!selectedOrder) return null;

    const variations: { [variantId: string]: itemSizeVariation }  = {}
    itemDataMap[shopLinks[selectedItemId] as keyof typeof itemDataMap].size_variants?.forEach(variation => {
       variations[variation.id] = variation
    })
    const selectedItem = itemDataMap[shopLinks[selectedItemId] as keyof typeof itemDataMap];
    let orderTotal = 0

    Object.entries(selectedOrder.variations).forEach(([variantId, orderItem]) => {
        orderTotal += orderItem.quantity * variations[variantId].price
    })

    return (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray[#f5e3c5] max-w-[450px] shadow-md mx-auto md:min-w-[300px] lg:min-w-[350px]">
            <h3 className="text-md font-semibold mb-2">{`${selectedItem.name} Order Total: $${orderTotal}`}</h3>
            <ul className="space-y-1">
                {Object.entries(selectedOrder.variations).map(([variantId, orderItem]) => {

                    return (
                        orderItem.quantity > 0 ? (
                            <li key={variantId} className="flex gap-x-2 items-between text-gray-700 overflow-x-scroll w-fit text-[.8rem]">
                                <span className={`md:w-[180px] lg:w-[200px]`}>{ `${selectedItem.name}: ${variations[variantId].name } - $${variations[variantId].price}`}</span>
                                <span className="font-semibold">{`x ${orderItem.quantity} = `}</span>
                                <span className="font-semibold">${orderItem.quantity * variations[variantId].price}</span>
                            </li>
                        ) : null
                    )
                })}
            </ul>
        </div>
    );
};

export default OrderSummary;
