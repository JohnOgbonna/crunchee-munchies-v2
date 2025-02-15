import React, { useState, useEffect } from "react";
import { itemSizeVariation } from "@/app/typesAndInterfaces/orderTypes";
import { useOrderContext } from "@/app/context/OrderContext";
import Link from "next/link";
import { toast } from "sonner";

interface SelectedVariationDisplayProps {
  selectedVariation: itemSizeVariation;
}

const SelectedVariationDisplay: React.FC<SelectedVariationDisplayProps> = ({
  selectedVariation,
}) => {
  const { orders, addOrder } = useOrderContext();
  const existingOrder = orders[selectedVariation.parentId]?.variations[selectedVariation.id]?.quantity || 0;
  const minOrderQuantity = selectedVariation?.minimumQuantity || 0;
  const maxOrderQuantity = selectedVariation?.maximumQuantity || 300;
  const initialQuantity = existingOrder > 0 ? existingOrder : minOrderQuantity;

  const [quantity, setQuantity] = useState(initialQuantity);
  const [orderUpdated, setOrderUpdated] = useState(false);

  useEffect(() => {
    if (existingOrder !== quantity) {
      setOrderUpdated(
        quantity !== existingOrder || (existingOrder > 0 && quantity === 0)
      );
    }
  }, [quantity, existingOrder]);

  const handleQuantityChange = (newQuantity: number, viaButton = false) => {
    if (!selectedVariation) return;

    if (viaButton && newQuantity < minOrderQuantity) {
      toast.error(`Minimum order quantity for ${selectedVariation.name} is ${minOrderQuantity}`);
      return;
    }
    if (viaButton && newQuantity > maxOrderQuantity) {
      toast.error(`Maximum order quantity for ${selectedVariation.name} is ${maxOrderQuantity}`);
      return;
    }

    setQuantity(newQuantity);
  };

  const handleAddToOrder = () => {
    if (!selectedVariation) return;
    if (quantity < minOrderQuantity) {
      toast.error(`Minimum order quantity for ${selectedVariation.name} is ${minOrderQuantity}`);
      setQuantity(minOrderQuantity);
      return;
    }
    if (quantity > maxOrderQuantity) {
      toast.error(`Maximum order quantity for ${selectedVariation.name} is ${maxOrderQuantity}`);
      setQuantity(maxOrderQuantity);
      return;
    }
    addOrder(selectedVariation.parentId, { variantId: selectedVariation.id, quantity });
    setOrderUpdated(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 text-center md:text-left md:items-center md:w-[70%] md:min-w-[530px] lg:min-w-[600px] mb-6">
      <div className="h-[400px] md:min-w-[200px] lg:min-w-[350px] flex items-center justify-center overflow-hidden">
        <img
          src={selectedVariation.url}
          alt={selectedVariation.name}
          className="w-full h-auto max-h-[400px] object-contain"
        />
      </div>
      <div>
        <div className="flex flex-col items-center">
          {selectedVariation.savings && (
            <p className="text-white font-semibold py-2 px-4 bg-red-700 rounded-[20px] mb-4 md:display-none">
              {`Savings of  $${selectedVariation.savings}!`}
            </p>
          )}
          <div>
            <h2 className="text-lg font-semibold">{selectedVariation.name}</h2>
            <p className="text-gray-600">Price: ${selectedVariation.price}</p>
            <p className="text-gray-700 font-semibold mt-2">Total: ${(selectedVariation.price * quantity).toFixed(2)}</p>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-2 pb-1">
            <button
              className={`w-12 h-12 border-2 rounded-full flex items-center justify-center text-lg font-bold transition ${quantity <= minOrderQuantity
                ? "border-gray-400 text-gray-400 cursor-not-allowed"
                : "border-gray-700 hover:bg-gray-200"}`}
              onClick={() => handleQuantityChange(quantity - 1, true)}
              disabled={quantity <= minOrderQuantity}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)}
              className="w-16 text-center text-lg font-semibold border-b-[1px] border-slate-700 outline-none bg-transparent"
            />
            <button
              className={`w-12 h-12 border-2 rounded-full flex items-center justify-center text-lg font-bold transition border-gray-700 hover:bg-gray-200`}
              onClick={() => handleQuantityChange(quantity + 1, true)}
            >
              +
            </button>
          </div>
          <button
            className={`mt-4 px-6 py-2 font-bold rounded-lg ${orderUpdated ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-500 cursor-not-allowed"}`}
            onClick={handleAddToOrder}
            disabled={!orderUpdated && !(initialQuantity === 0 && quantity > 0)}
          >
            Update Order
          </button>
          {orders[selectedVariation.parentId] && (
            <Link href="/" className="text-md font-semibold text-red-600 hover:underline hover:red-800 mt-4 text-center hover:scale-105 transition-all duration-300">
              Complete Order
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedVariationDisplay;
