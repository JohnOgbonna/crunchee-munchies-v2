'use client'
import { itemId, itemSizeVariation } from "@/app/typesAndInterfaces/orderTypes";
import { shopLinks, itemDataMap } from "@/app/data/items";
import CloseIcon from "./icons/close";
import { useOrderContext } from "@/app/context/OrderContext";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SetStateAction } from "react";
import CustomerDetailsForm from "./customerDetailsForm";

interface ExpandedOrderViewProps {
  selectedItemId: itemId;
  setSelectedItem: (value: SetStateAction<itemId | null>) => void;
  orders: {
    [id in itemId]?: {
      variations: {
        [variantId: string]: {
          quantity: number;
        };
      };
    };
  };
  handleClose: () => void;
}

const ExpandedOrderView: React.FC<ExpandedOrderViewProps> = ({ selectedItemId, setSelectedItem, orders, handleClose }) => {
  const { clearItemVariation } = useOrderContext();
  const selectedOrder = orders[selectedItemId];
  const searchParams = useSearchParams();

  if (!selectedOrder) return null;

  const selectedItem = itemDataMap[shopLinks[selectedItemId] as keyof typeof itemDataMap];
  const variations: { [variantId: string]: itemSizeVariation } = {};
  selectedItem.size_variants?.forEach(variation => {
    variations[variation.id] = variation;
  });

  let orderTotal = 0;

  return (
    <div className="p-4 md:border md:shadow-md w-full overflow-y-scroll">
      <div className="flex gap-4 mb-4 items-center">
        {/* Back Button */}
        <button
          onClick={handleClose}
          className=" bg-gray-200 p-2 rounded-full hover:bg-gray-300"
        >
          <CloseIcon size={24} />
        </button>
        <h3 className="text-lg font-semibold text-center">{`${selectedItem.name} Order Summary`}</h3>
      </div>
      <ul className="space-y-3">
        {Object.entries(selectedOrder.variations).map(([variantId, orderItem]) => {
          const variation = variations[variantId];
          const itemTotal = orderItem.quantity * variation.price;
          orderTotal += itemTotal;

          return (
            <li key={variantId} className="flex items-center justify-between border-b pb-2">
              <img src={variation.url || selectedItem.heroImage} alt={variation.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex items-center gap-4 sm:text-sm">
                <p className="font-semibold">{variation.name}</p>
                <p className="font-semibold text-gray-700">{`$${variation.price.toFixed(2)} x ${orderItem.quantity}`}</p>
                <p className="font-bold"> = ${itemTotal.toFixed(2)}</p>
              </div>
              <button onClick={() => clearItemVariation(selectedItemId, variantId)} className="text-red-600 hover:text-red-800">
                <CloseIcon size={20} />
              </button>
            </li>
          );
        })}
      </ul>
      <div className="flex gap-4 items-center justify-center mb-10 mt-4">
        <h4 className="text-lg font-bold text-center">Total: ${orderTotal.toFixed(2)}</h4>
        <Link href={`/shop/${shopLinks[selectedItemId]}?variant=${Object.keys(selectedOrder.variations)[0]}`} className="block text-center text-blue-600 hover:text-blue-800 font-bold underline">
          Edit
        </Link>
      </div>
      <CustomerDetailsForm />
    </div>
  );
};

export default ExpandedOrderView;
