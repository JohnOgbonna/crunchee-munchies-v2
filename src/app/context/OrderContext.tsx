"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { itemId, OrderContextType, orderVariantion } from "../typesAndInterfaces/orderTypes";

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<OrderContextType["orders"]>({});

    // Load orders from local storage on mount
    useEffect(() => {
        const storedOrders = localStorage.getItem("orders");
        if (storedOrders) {
            setOrders(JSON.parse(storedOrders));
        }
    }, []);

    // Save orders to local storage whenever they change
    useEffect(() => {
        if (Object.keys(orders).length > 0) {
            localStorage.setItem("orders", JSON.stringify(orders));
        } else {
            localStorage.removeItem("orders");
        }
    }, [orders]);

    // Add an order or update existing quantity
    const addOrder = (id: itemId, variant: orderVariantion) => {
        setOrders(prevOrders => {
            const newOrders = { ...prevOrders };

            if (!newOrders[id]) {
                newOrders[id] = { variations: {} };
            }

            if (variant.quantity > 0) { // Ensure we only add if quantity is > 0
                newOrders[id].variations[variant.variantId] = { quantity: variant.quantity };
            }
            
            if (variant.quantity === 0) {
                delete newOrders[id].variations[variant.variantId];
                if (Object.keys(newOrders[id].variations).length === 0) {
                    delete newOrders[id];
                }
            }

            return newOrders;
        });
    };

    // Remove an entire item group
    const removeOrder = (id: itemId) => {
        setOrders(prevOrders => {
            const newOrders = { ...prevOrders };
            delete newOrders[id];
            return newOrders;
        });
    };

    // Clear all orders
    const clearOrders = () => {
        setOrders({});
    };

    // Increase quantity of a variant
    const increaseQuantity = (id: itemId, variantId: string) => {
        setOrders(prevOrders => {
            const newOrders = { ...prevOrders };

            if (newOrders[id] && newOrders[id].variations[variantId]) {
                newOrders[id].variations[variantId].quantity += 1;
            }

            return newOrders;
        });
    };

    // Decrease quantity, remove if zero
    const decreaseQuantity = (id: itemId, variantId: string) => {
        setOrders(prevOrders => {
            const newOrders = { ...prevOrders };

            if (newOrders[id] && newOrders[id].variations[variantId]) {
                if (newOrders[id].variations[variantId].quantity > 1) {
                    newOrders[id].variations[variantId].quantity -= 1;
                } else {
                    delete newOrders[id].variations[variantId];
                }

                if (Object.keys(newOrders[id].variations).length === 0) {
                    delete newOrders[id];
                }
            }

            return newOrders;
        });
    };

    // Clear a specific item variation
    const clearItemVariation = (id: itemId, variantId: string) => {
        if (!window.confirm("Are you sure you want to remove this item?")) return;

        setOrders(prevOrders => {
            const newOrders = { ...prevOrders };

            if (newOrders[id]) {
                delete newOrders[id].variations[variantId];

                if (Object.keys(newOrders[id].variations).length === 0) {
                    delete newOrders[id];
                }
            }

            return newOrders;
        });
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
                clearItemVariation,
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
