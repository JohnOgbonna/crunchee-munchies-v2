import { useEffect, useRef } from "react";
import { useOrderContext } from "@/app/context/OrderContext";
import { itemId } from "@/app/typesAndInterfaces/orderTypes";
import OrderSummary from "./orderSummary";

interface OrderPanelProps {
    isCartOpen: boolean;
    setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OrderPanel({ isCartOpen, setIsCartOpen }: OrderPanelProps) {
    const { orders } = useOrderContext();
    const panelRef = useRef<HTMLDivElement | null>(null);

    const closeCart = () => {
        setIsCartOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                closeCart();
            }
        };

        if (isCartOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCartOpen]);

    return (
        <div className={`fixed inset-0 ${isCartOpen ? "visible" : "invisible"} flex justify-end z-20`}>
            {/* Backdrop */}
            {isCartOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={closeCart}></div>
            )}

            {/* Order Panel */}
            <div 
                ref={panelRef} 
                className={`fixed top-0 right-0 h-full min-w-[280px] w-[90vw] md:w-[420px] bg-white shadow-lg transform transition-transform duration-500 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Your Order</h2>
                    <button onClick={closeCart} className="text-red-500 font-bold">Close</button>
                </div>
                <div className="p-4 space-y-4 overflow-auto h-full">
                    {Object.keys(orders).length > 0 ? (
                        Object.entries(orders).map(([orderId, _]) => (
                            <OrderSummary key={orderId} selectedItemId={orderId as itemId} orders={orders} isNav closeCart={closeCart} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
