'use client';

import { createContext, useContext, useState, ReactNode } from "react";

enum itemId {
    chin_chin_standard = 'ch-1',
    chin_chin_wholesale = 'ch-w',
    chin_chin_event_order = 'ch-sp',
    chin_chin_bundle = 'ch-b',
}

interface orderVariantion {
    variantId: string;
    quantity: number;
    notes?: string;
}

interface orderItemGroup {
    id: itemId;
    items: orderVariantion[];
}

interface OrderContextType {
    orders: orderItemGroup[];
    addOrder: (id: itemId, variant: orderVariantion) => void;
    removeOrder: (id: itemId) => void;
    clearOrders: () => void;
    increaseQuantity: (id: itemId, variantId: string) => void;
    decreaseQuantity: (id: itemId, variantId: string) => void;
    clearItem: (id: itemId, variantId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<orderItemGroup[]>([]);

    // Add an order
    const addOrder = (id: itemId, variant: orderVariantion) => {
        setOrders(prevOrders => {
            const existingOrder = prevOrders.find(order => order.id === id);
            if (existingOrder) {
                return prevOrders.map(order =>
                    order.id === id
                        ? { ...order, items: [...order.items, variant] }
                        : order
                );
            }
            return [...prevOrders, { id, items: [variant] }];
        });
    };

    // Remove an entire order group
    const removeOrder = (id: itemId) => {
        setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
    };

    // Clear all orders
    const clearOrders = () => {
        setOrders([]);
    };

    // Increase quantity of a variant
    const increaseQuantity = (id: itemId, variantId: string) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === id
                    ? {
                          ...order,
                          items: order.items.map(item =>
                              item.variantId === variantId
                                  ? { ...item, quantity: item.quantity + 1 }
                                  : item
                          ),
                      }
                    : order
            )
        );
    };

    // Decrease quantity, remove if zero
    const decreaseQuantity = (id: itemId, variantId: string) => {
        setOrders(prevOrders =>
            prevOrders
                .map(order =>
                    order.id === id
                        ? {
                              ...order,
                              items: order.items
                                  .map(item =>
                                      item.variantId === variantId
                                          ? { ...item, quantity: item.quantity - 1 }
                                          : item
                                  )
                                  .filter(item => item.quantity > 0), // Remove item if quantity is 0
                          }
                        : order
                )
                .filter(order => order.items.length > 0) // Remove empty order groups
        );
    };

    // Clear a specific item variation (with confirmation)
    const clearItem = (id: itemId, variantId: string) => {
        const confirmRemove = window.confirm("Are you sure you want to remove this item?");
        if (!confirmRemove) return;

        setOrders(prevOrders =>
            prevOrders
                .map(order =>
                    order.id === id
                        ? {
                              ...order,
                              items: order.items.filter(item => item.variantId !== variantId),
                          }
                        : order
                )
                .filter(order => order.items.length > 0) // Remove empty order groups
        );
    };

    return (
        <OrderContext.Provider
            value={{
                orders,
                addOrder,
                removeOrder,
                clearOrders,
                increaseQuantity,
                decreaseQuantity,
                clearItem,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

// Hook for using order context
export const useOrderContext = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrderContext must be used within an OrderProvider");
    }
    return context;
};
