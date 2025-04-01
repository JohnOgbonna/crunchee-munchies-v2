import { useCallback, useEffect, useRef, useState } from "react";
import { useOrderContext } from "@/app/context/OrderContext";
import { item, itemId } from "@/app/typesAndInterfaces/orderTypes";
import OrderSummary from "../order/orderSummary";

interface OrderPanelProps {
    isCartOpen: boolean;
    setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
    items: Record<string, item> | undefined;
}

export default function OrderPanel({ isCartOpen, setIsCartOpen, items }: OrderPanelProps) {
    const { orders, clearOrders } = useOrderContext();
    const panelRef = useRef<HTMLDivElement | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const closeCart = useCallback(() => {
        setIsAnimating(true); // Start exit animation
        setTimeout(() => {
            setIsCartOpen(false); // Close the cart after animation completes
            setIsAnimating(false); // Reset animation state
        }, 10); // Adjust to match animation duration
    }, [setIsCartOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                closeCart();
            }
        };

        if (isCartOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCartOpen, closeCart]);

    return (
        <div className={`fixed inset-0 flex justify-end z-20 transition-opacity duration-500 ${isCartOpen || isAnimating ? "opacity-100" : "opacity-0 pointer-events-none"}`}>

            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 ${isCartOpen || isAnimating ? "opacity-100" : "opacity-0"}`}
                onClick={closeCart}
            ></div>

            {/* Order Panel */}
            <div
                ref={panelRef}
                className={`fixed top-0 right-0 h-full min-w-[280px] w-[90vw] md:w-[420px] bg-white shadow-lg transform transition-transform duration-500 
                    ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Your Order</h2>
                    <button onClick={closeCart} className="text-red-500 font-bold">Close</button>
                </div>
                <div className="p-4 space-y-4 overflow-auto h-full">
                    {Object.keys(orders).length > 0 ?
                        Object.entries(orders).map(([orderId]) => (
                            <OrderSummary key={orderId} selectedItemId={orderId as itemId} orders={orders} isNav closeCart={closeCart} items = {items} />
                        ))
                        : (
                            <p className="text-center text-gray-500">Your cart is empty.</p>
                        )}
                    {Object.keys(orders).length > 0 && <p className="font-bold hover:cursor-pointer hover:underline hover:scale-105 transition-all duration-400 ease-in-out text-gray-500"
                        onClick={() => { clearOrders() }}
                    >Remove all</p>}
                </div>
            </div>
        </div>
    );
}
