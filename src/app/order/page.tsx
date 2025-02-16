'use client'
import ExpandedOrderView from "../components/supporting_components/expandedOrderView";
import { useOrderContext } from "@/app/context/OrderContext";
import { itemId } from "@/app/typesAndInterfaces/orderTypes";
import OrderSummary from "../components/supporting_components/orderSummary";
import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { shopLinks } from "../data/items";
import { usePathname } from "next/navigation";

const OrderPage = () => {
    const { orders } = useOrderContext();
    const [selectedItem, setSelectedItem] = useState<itemId | null>(null);
    const [isExiting, setIsExiting] = useState(false); // Tracks exit animation
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (searchParams && searchParams.get("item")) {
            const itemParams = searchParams.get("item") as itemId;
            if (itemParams) {
                setSelectedItem(() => itemParams);
            }
        }
    }, [searchParams])

    useEffect(() => {
        if (selectedItem && !orders[selectedItem]) {
            setSelectedItem(null);
        }
    }, [orders])

    const handleClose = () => {
        setIsExiting(true); // Start exit animation
        setSelectedItem(null); // Hide after animation
        setIsExiting(false); // Reset exit state
    };

    const handleItemSelection = (id: itemId) => {
        setSelectedItem(id);
        const params = new URLSearchParams(searchParams.toString());
        params.set("item", shopLinks[id]);
        // router.replace(`${pathname}?${params.toString()}`);
    }
    return (
        <div className="p-4 mx-auto max-w-[1440px]">
            <h2 className="text-xl font-semibold mb-4 text-slate-700">Select Order to Complete:</h2>
            <div className={`relative flex gap-4 transition-all duration-[700ms] ease-in-out md:justify-center ${selectedItem ? "md:flex-row" : ""}`}>
                {/* Order Summary List */}
                <div
                    className={`transition-[transform] duration-[700ms] ease-in-out overflow-hidden md:min-w-[355px] lg:min-w-[385px] flex flex-col gap-4 
                        ${selectedItem ? "w-0 p-0 m-0 translate-x-[-100%]" : "max-w-full md:w-1/3 translate-x-0"}`}
                >
                    {Object.keys(orders).map((id) => (
                        <div key={id} onClick={() => handleItemSelection(id as itemId)}>
                            <OrderSummary selectedItemId={id as itemId} orders={orders} isOrderPage={true} isSelected={id === selectedItem} />
                        </div>
                    ))}
                </div>

                {/* Expanded Order View (Always Rendered) */}
                <div
                    className={`fixed top-0 left-0 w-full h-full bg-white md:relative md:w-2/3 lg:ml-4 transition-transform duration-[700ms] ease-in-out md:max-w-[600px]
                        ${selectedItem ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"}
                        ${isExiting ? "translate-x-full" : ""}`}
                >
                    {selectedItem && (
                        <div>
                            <ExpandedOrderView selectedItemId={selectedItem} orders={orders} handleClose={handleClose} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
