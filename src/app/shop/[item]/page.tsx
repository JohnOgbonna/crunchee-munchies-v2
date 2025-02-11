"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useOrderContext } from "@/app/context/OrderContext";
import { item, itemId, itemSizeVariation } from "@/app/typesAndInterfaces/orderTypes";
import { itemDataMap } from "@/app/data/items";
import ItemVariationSelector from "@/app/components/supporting_components/itemVariationSelector";

const ShopItemPage = ({ params: { item } }: { params: { item: string } }) => {
  const searchParams = useSearchParams();
  const { orders, addOrder } = useOrderContext();

  const selectedItem: item | undefined = itemDataMap[item as keyof typeof itemDataMap];
  if (!selectedItem) return <div className="text-center">Item not found</div>;

  const { id, size_variants, name } = selectedItem;
  const selectedVariantId = searchParams.get("variant") || "";
  const [selectedVariation, setSelectedVariation] = useState<itemSizeVariation | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [orderUpdated, setOrderUpdated] = useState(false);

  useEffect(() => {
    setSelectedVariation(
      size_variants?.find(({ id }) => id === selectedVariantId) || null
    );
  }, [selectedVariantId, size_variants]);

  useEffect(() => {
    if (selectedVariation) {
      const existingOrder = orders.find(order => order.id === itemId[id]);
      const existingItem = existingOrder?.items.find(item => item.variantId === selectedVariation.id);
      setQuantity(existingItem ? existingItem.quantity : 0);
    }
  }, [selectedVariation, orders]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      setOrderUpdated(true);
    }
  };

  const handleAddToOrder = () => {
    if (selectedVariation) {
      addOrder(itemId[id], { variantId: selectedVariation.id, quantity });
      setOrderUpdated(false);
    }
  };

  return (
    <div className="p-4 text-slate-700 flex flex-col">
      <h2 className="text-2xl font-bold mb-2 sm:text-center">{name}</h2>
      <div className="md:flex md:items-center md:justify-center gap-4 items-start md:mt-4">
        <ItemVariationSelector
          itemId={itemId[id]}
          variations={size_variants ?? []}
          selectedVariantId={selectedVariantId}
        />
        {selectedVariation && (
          <div className="flex flex-col md:flex-row gap-4 text-center md:text-left md:items-center md:w-[60%] md:max-w-[600px]">
            <div className="md:w-[60%] h-[400px] flex items-center justify-center overflow-hidden">
              <img
                src={selectedVariation.url}
                alt={selectedVariation.name}
                className="w-full h-auto max-h-[400px] object-contain"
              />
            </div>
            <div className="order-summary md:w-[40%]">
              <div>
                <h2 className="text-lg font-semibold">{selectedVariation.name}</h2>
                <p className="text-gray-600">Price: ${selectedVariation.price}</p>
                <p className="text-gray-700 font-semibold mt-2">Total: ${(selectedVariation.price * quantity).toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                <button
                  className="w-12 h-12 border-2 border-gray-700 rounded-full flex items-center justify-center text-lg font-bold"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  className="w-12 h-12 border-2 border-gray-700 rounded-full flex items-center justify-center text-lg font-bold"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                className={`mt-4 px-6 py-2 font-bold rounded-lg ${orderUpdated ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-500 cursor-not-allowed"}`}
                onClick={handleAddToOrder}
                disabled={!orderUpdated}
              >
                {orderUpdated ? "Updated Order" : "Add to Order"}
              </button>
            </div>
          </div>
        )}
      </div>
      {orders.length > 0 && (
        <button className="fixed bottom-4 right-4 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700">
          View Order
        </button>
      )}
    </div>
  );
};

export default ShopItemPage;
