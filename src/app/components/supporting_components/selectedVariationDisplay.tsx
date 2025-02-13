import React from "react";
import { itemSizeVariation } from "@/app/typesAndInterfaces/orderTypes";

interface SelectedVariationDisplayProps {
  selectedVariation: itemSizeVariation;
  quantity: number;
  handleQuantityChange: (newQuantity: number) => void;
  handleAddToOrder: () => void;
  orderUpdated: boolean;
}

const SelectedVariationDisplay: React.FC<SelectedVariationDisplayProps> = ({
  selectedVariation,
  quantity,
  handleQuantityChange,
  handleAddToOrder,
  orderUpdated,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 text-center md:text-left md:items-center md:w-[70%] md:min-w-[530px] lg:min-w-[600px] mb-6">
      <div className="h-[400px] lg:min-w-[350px] flex items-center justify-center overflow-hidden">
        <img
          src={selectedVariation.url}
          alt={selectedVariation.name}
          className="w-full h-auto max-h-[400px] object-contain"
        />
      </div>
      <div>
        <div className="flex flex-col items-center">
            {
                selectedVariation.savings && 
                <p className="text-white font-semibold py-2 px-4 bg-red-700 rounded-[20px] mb-4 md:display-none">{`Savings of  $${selectedVariation.savings}!`}</p>
            }
          <div>
            <h2 className="text-lg font-semibold">{selectedVariation.name}</h2>
            <p className="text-gray-600">Price: ${selectedVariation.price}</p>
            <p className="text-gray-700 font-semibold mt-2">Total: ${(selectedVariation.price * quantity).toFixed(2)}</p>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-2 pb-1">
            <button
              className={`w-12 h-12 border-2 rounded-full flex items-center justify-center text-lg font-bold transition ${quantity <= 1
                ? "border-gray-400 text-gray-400 cursor-not-allowed"
                : "border-gray-700 hover:bg-gray-200"
                }`}
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
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
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </button>
          </div>
          <button
            className={`mt-4 px-6 py-2 font-bold rounded-lg ${orderUpdated ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-500 cursor-not-allowed"}`}
            onClick={handleAddToOrder}
            disabled={!orderUpdated}
          >
            Update Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedVariationDisplay;
