'use client';

import { item, itemId, itemSizeVariation } from "@/app/typesAndInterfaces/orderTypes";
import CloseIcon from "../icons/close";
import { useOrderContext } from "@/app/context/OrderContext";
import Link from "next/link";
import CustomerDetailsForm from "./customerDetailsForm";
import Image from "next/image";
import { useMemo } from "react";


interface ExpandedOrderViewProps {
  selectedItemId: itemId;
  handleClose: () => void;
  items: Record<string, item> | undefined;
  orders: {
    [id in itemId]?: {
      variations: {
        [variantId: string]: {
          quantity: number;
        };
      };
    };
  };
}

const ExpandedOrderView: React.FC<ExpandedOrderViewProps> = ({ selectedItemId, orders, handleClose, items }) => {
  const { clearItemVariation } = useOrderContext();

  const selectedOrder = orders[selectedItemId];

  const selectedItem = items?.[selectedItemId] || null;

  const variations = useMemo(() => {
    const returnVal: { [variantId: string]: itemSizeVariation } = {}
    if (!items || !selectedItem)
      return returnVal;
    
    if (selectedItem && selectedItem.size_variants) {
      selectedItem.size_variants.forEach(variation => {
        returnVal[variation.id] = variation;
      }
      );
    }
    return returnVal;
  }, [items, selectedItem]);


  let orderTotal = 0;

  return (
    <div className="p-4 sm:pt-[60px] md:border md:shadow-md w-full sm:overflow-y-scroll">
      <div className="flex gap-4 mb-4 items-center">
        <button onClick={handleClose} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
          <CloseIcon size={24} />
        </button>
        <h3 className="text-lg font-semibold text-center">{`${selectedItem?.name} Order Summary`}</h3>
      </div>
      <>
        <ul className="space-y-3">
          {selectedOrder && selectedOrder.variations ? Object.entries(selectedOrder.variations).map(([variantId, orderItem]) => {
            const variation = variations[variantId];
            const itemTotal = orderItem.quantity * variation.price;
            orderTotal += itemTotal;
            return (
              <li key={variantId} className="flex items-center justify-between border-b pb-2">
                <Image src={variation.url || selectedItem?.heroImage || 'image'} alt={variation.name} className="w-16 h-16 object-cover rounded" width={64} height={64} />
                <div className="flex items-center gap-4 sm:text-sm">
                  <p className="font-semibold">{variation.name}</p>
                  <p className="font-semibold text-gray-700">{`$${variation.price.toFixed(2)} x ${orderItem.quantity}`}</p>
                  <p className="font-bold">= ${itemTotal.toFixed(2)}</p>
                </div>
                <button onClick={() => clearItemVariation(selectedItemId, variantId)} className="text-red-600 hover:text-red-800">
                  <CloseIcon size={20} />
                </button>
              </li>
            );
          }) :
            <div>
              <p className="text-slate-700">No items in your order visit.</p>
              <Link href={`/shop`} className="text-blue-600 hover:scale-105 transition-all ease-out duration-400 underline">Shop Now</Link>
            </div>

          }
        </ul>
        <div className="flex gap-4 items-center justify-center mb-10 mt-4">
          <h4 className="text-lg font-bold text-center">Total: ${orderTotal.toFixed(2)}</h4>
          <Link href={`/shop/${selectedItem?.id}${selectedOrder && Object.keys(selectedOrder.variations).length > 0 ? `?variant=${Object.keys(selectedOrder.variations)[0]}` : ''}`} className="block text-center text-blue-600 hover:text-blue-800 font-bold underline">
            Edit
          </Link>
        </div>
        <CustomerDetailsForm item={selectedItemId} items = {items} />
      </>

    </div>
  );
};

export default ExpandedOrderView;
