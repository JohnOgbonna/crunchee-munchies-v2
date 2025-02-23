'use client'
import ExpandedOrderView from "../components/supporting_components/order/expandedOrderView";
import { useOrderContext } from "@/app/context/OrderContext";
import { itemId } from "@/app/typesAndInterfaces/orderTypes";
import OrderSummary from "../components/supporting_components/order/orderSummary";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { shopLinks } from "../data/items";

const OrderPage = () => {
    const { orders } = useOrderContext();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [selectedItem, setSelectedItem] = useState<itemId | null>(null);
    const [isExiting, setIsExiting] = useState(false); 

    // Initialize selected item from search params on page load
    useEffect(() => {
        const itemParam = searchParams.get("item");
        if (itemParam) {
            const matchedItem = Object.keys(shopLinks).find((key) => shopLinks[key as itemId] === itemParam);
            setSelectedItem(matchedItem as itemId || null);
        }
    }, [searchParams]);

    // Handle case where selected item is removed from orders
    useEffect(() => {
        if (selectedItem && !orders[selectedItem]) {
            setSelectedItem(null);
            const params = new URLSearchParams(searchParams.toString());
            params.delete("item");
            router.replace(`${pathname}?${params.toString()}`);
        }
    }, [selectedItem, orders, router, pathname, searchParams]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setSelectedItem(null);
            setIsExiting(false);
            const params = new URLSearchParams(searchParams.toString());
            params.delete("item");
            router.replace(`${pathname}?${params.toString()}`);
        }, 700);
    };

    const handleItemSelection = (id: itemId) => {
        setSelectedItem(id);
        const params = new URLSearchParams(searchParams.toString());
        params.set("item", shopLinks[id] || id);  // Fallback to `id` if `shopLinks[id]` is undefined
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="p-4 mx-auto max-w-[1440px]">
            <h2 className="text-xl font-semibold mb-4 text-slate-700">Select Order to Complete:</h2>
            <div className={`relative flex gap-4 transition-all duration-[700ms] ease-in-out md:justify-center ${selectedItem ? "md:flex-row" : ""}`}>
                {/* Order Summary List */}
                <div
                    className={`transition-all duration-[700ms] ease-in-out overflow-hidden md:min-w-[355px] lg:min-w-[385px] flex flex-col gap-4 
                        ${selectedItem ? " p-0 m-0" : " md:w-1/3"}`}
                >
                    {Object.keys(orders).map((id) => (
                        <div key={id} onClick={() => handleItemSelection(id as itemId)}>
                            <OrderSummary selectedItemId={id as itemId} orders={orders} isOrderPage={true} isSelected={id === selectedItem} />
                        </div>
                    ))}
                </div>

                {/* Expanded Order View */}
                <div
                    className={`fixed top-0 left-0 w-full h-full bg-white md:relative md:w-2/3 lg:ml-4 transition-transform duration-[700ms] ease-in-out md:max-w-[600px] overflow-y-scroll
                        ${selectedItem ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"}
                        ${isExiting ? "translate-x-[130%]" : ""}`}
                >
                    {selectedItem && (
                        <ExpandedOrderView selectedItemId={selectedItem} orders={orders} handleClose={handleClose} setSelectedItem={setSelectedItem} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
