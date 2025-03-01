'use client';

import { createContext, useContext, useState } from 'react';
import { OrderSubmitContextType } from '../typesAndInterfaces/orderTypes';

const OrderSubmitContext = createContext<OrderSubmitContextType | null>(null);

export const OrderSubmitProvider = ({ children }: { children: React.ReactNode }) => {
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [customerData, setCustomerData] = useState<{ name: string, email: string }>({ name: '', email: '' });

    return (
        <OrderSubmitContext.Provider value={{ formSubmitted, setFormSubmitted, customerData, setCustomerData }}>
            {children}
        </OrderSubmitContext.Provider>
    );
};

export const useOrderSubmitContext = () => {
    const context = useContext(OrderSubmitContext);
    if (!context) {
        throw new Error("useOrderContext must be used within an OrderProvider");
    }
    return context;
};