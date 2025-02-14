import { useOrderContext } from "@/app/context/OrderContext";
import { itemId, OrderContextType } from "@/app/typesAndInterfaces/orderTypes"
import OrderSummary from "./orderSummary";

interface OrderPanelProps {
    isCartOpen: boolean;
    setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OrderPanel(props: OrderPanelProps) {
    const { orders } = useOrderContext();
    const { isCartOpen, setIsCartOpen } = props

    return (
        <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-500 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Your Order</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-red-500 font-bold">Close</button>
            </div>
            <div className="p-4 space-y-4 overflow-auto h-full">
                {Object.keys(orders).length > 0 ? (
                    Object.entries(orders).map(([orderId, _]) => (
                        <OrderSummary key={orderId} selectedItemId={orderId as itemId} orders={orders} isNav />
                    ))
                ) : (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                )}
            </div>
        </div>
    )
}