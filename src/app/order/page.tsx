'use client';

import ExpandedOrderView from "../components/supporting_components/order/expandedOrderView";
import { useOrderContext } from "@/app/context/OrderContext";
import { item, itemId } from "@/app/typesAndInterfaces/orderTypes";
import OrderSummary from "../components/supporting_components/order/orderSummary";
import { Suspense, use, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { OrderSubmitProvider, useOrderSubmitContext } from "../context/OrderSubmitContext";
import Confirmation from "../components/supporting_components/confirmation";
import { getCachedItems } from "../lib/fetchItems";

const OrderPageContent = () => {
    const { orders } = useOrderContext();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { formSubmitted, customerData, setFormSubmitted, setCustomerData } = useOrderSubmitContext();
    const router = useRouter();
    const [items, setItems] = useState<Record<string, item> | undefined>(undefined);
    const [selectedItem, setSelectedItem] = useState<itemId | null>(null);
    const [isExiting, setIsExiting] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getCachedItems();
                setItems(data);
            } catch (err) {
                console.error("Failed to fetch items:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    useEffect(() => {
        const itemParam = searchParams.get("item");
        if (itemParam && items) {
            const itemMatch = Object.values(items).find(item => item.id === itemParam);
            const isInOrder = Object.keys(orders).includes(itemParam);

            if (itemMatch && isInOrder) {
                if (itemMatch.id !== selectedItem) {
                    setSelectedItem(itemMatch.id); // Update selectedItem only if it's different
                }
            } else {
                setSelectedItem(null);
                const params = new URLSearchParams(searchParams.toString());
                params.delete("item");
                router.replace(`${pathname}?${params.toString()}`);
            }
        }
    }, [items, searchParams, orders, pathname, router]); // Removed `selectedItem` from dependencies
    const handleClose = () => {
        setIsExiting(true);
        const params = new URLSearchParams(searchParams.toString());
        params.delete("item");
        router.replace(`${pathname}?${params.toString()}`);
        setTimeout(() => {
            setSelectedItem(null);
            setIsExiting(false);

        }, 500);
    };

    const handleItemSelection = (id: itemId) => {
        if (selectedItem === id) return;

        setSelectedItem(id); // Schedule the state update
        const params = new URLSearchParams(searchParams.toString());
        params.set("item", id); // Use `id` directly instead of `selectedItem`
        router.replace(`${pathname}?${params.toString()}`);
    };

    const handleSummaryClose = () => {
        setFormSubmitted(false);
        setCustomerData({ name: '', email: '', submittedOrderId: '' });
    }

    const finalOrder : boolean = useMemo(() => {
        return Object.keys(orders).find(id => id !== selectedItem) ? false : true;
    }, [orders, selectedItem]);

    return (
        <div className="p-4 mx-auto max-w-[1440px]">
            {formSubmitted && customerData && <Confirmation handleItemClose = {handleClose} handleClose={handleSummaryClose} customerData={customerData} type="order" finalOrder={finalOrder} />}
            <h2 className="text-xl font-semibold mb-4 text-slate-700">
                Select Order to Complete:
            </h2>

            <div
                className={`relative flex gap-4 transition-all duration-500 ease-in-out md:justify-center ${selectedItem ? "md:flex-row" : ""
                    }`}
            >
                {/* Order Summary List */}
                <div
                    className={`sm:w-full transition-all duration-500 ease-in-out overflow-hidden md:min-w-[355px] lg:min-w-[385px] flex flex-col gap-4 ${selectedItem ? " p-0 m-0" : " md:w-1/3"
                        }`}
                >
                    {Object.keys(orders).length > 0 ? Object.keys(orders).map((id) => (
                        <div key={id} onClick={() => handleItemSelection(id as itemId)}>
                            <OrderSummary
                                selectedItemId={id as itemId}
                                orders={orders}
                                isOrderPage={true}
                                isSelected={id === selectedItem}
                                items={items}
                            />
                        </div>
                    )) : (
                        <div className="flex flex-col gap-4 font-bold">
                            {<p className="text-slate-700">No orders found.</p>}
                            <a href="/shop" className="text-blue-600 hover:scale-105 transition-all ease-out duration-400 underline">
                                Shop Now
                            </a>
                        </div>
                    )}
                </div>

                {/* Expanded Order View */}
                <div
                    className={`fixed top-0 left-0 w-full h-full bg-white md:relative md:w-2/3 lg:ml-4 transition-transform duration-500 ease-in-out md:max-w-[600px] overflow-y-scroll scrollbar-hide 
                    ${selectedItem ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-95"} 
                    ${isExiting ? "translate-x-[130%] opacity-0 scale-90" : ""}`}
                >
                    {selectedItem && orders[selectedItem] &&
                        <ExpandedOrderView
                            selectedItemId={selectedItem as itemId}
                            orders={orders}
                            handleClose={handleClose}
                            items={items}
                        />
                    }
                </div>
            </div>
        </div>
    );
};


const OrderPage = () => {
    return (
        <Suspense fallback={<div>Loading Order Page...</div>}>
            <OrderSubmitProvider> {/* Wrap the component in OrderProvider instead of manually providing values */}
                <OrderPageContent />
            </OrderSubmitProvider>
        </Suspense>
    );
};

export default OrderPage;