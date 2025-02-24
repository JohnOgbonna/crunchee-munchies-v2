"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useOrderContext } from "@/app/context/OrderContext";
import { item, itemSizeVariation } from "@/app/typesAndInterfaces/orderTypes";
import { itemDataMap, shopLinks } from "@/app/data/items";
import ItemVariationSelector from "@/app/components/supporting_components/shop/itemVariationSelector";
import { Toaster, toast } from "sonner";
import SuggestedItems from "@/app/components/supporting_components/shop/suggestedItems";
import SelectedVariationDisplay from "@/app/components/supporting_components/shop/selectedVariationDisplay";
import Link from "next/link";
import OrderSummary from "@/app/components/supporting_components/order/orderSummary";

const ShopItemPage = ({ params: { item } }: { params: { item: string } }) => {
  const searchParams = useSearchParams();
  const { orders, addOrder } = useOrderContext();

  const selectedItem: item | undefined = itemDataMap[item as keyof typeof itemDataMap];
  if (!selectedItem) return <div className="text-center">Item not found</div>;

  const { id, size_variants, name, description } = selectedItem;
  const selectedVariantId = searchParams.get("variant") || "";
  const [selectedVariation, setSelectedVariation] = useState<itemSizeVariation | null>(null);
  const [quantity, setQuantity] = useState(0);


  useEffect(() => {
    setSelectedVariation(() =>
      size_variants?.find(({ id }) => id === selectedVariantId) || null
    );
  }, [selectedVariantId, size_variants]);

  useEffect(() => {
    if (selectedVariation) {
      const existingQuantity = orders[id]?.variations[selectedVariation.id]?.quantity;
      const minQuantity = selectedVariation.minimumQuantity || 0;
      setQuantity(existingQuantity ?? minQuantity);
    }
  }, [selectedVariation, orders]);


  return (
    <div className="p-4 text-slate-700 flex flex-col max-w-[1440px] mx-auto">
      <Toaster richColors position="top-center" closeButton={true} />
      <div className="flex items-center justify-center md:justify-start mb-2 w-full">
        <Link href={"/shop"}>
          <svg height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xmlSpace="preserve" className="mr-2">
            <path fill="#f5e3c5" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z" />
            <path fill="#2F3B3F" d="M205.606,234.394 c5.858,5.857,5.858,15.355,0,21.213C202.678,258.535,198.839,260,195,260s-7.678-1.464-10.606-4.394l-80-79.998 c-2.813-2.813-4.394-6.628-4.394-10.606c0-3.978,1.58-7.794,4.394-10.607l80-80.002c5.857-5.858,15.355-5.858,21.213,0 c5.858,5.857,5.858,15.355,0,21.213l-69.393,69.396L205.606,234.394z" />
          </svg>
        </Link>
        <h2 className="text-2xl font-bold sm:text-center">{name}</h2>
      </div>
      <p className="max-w-[600px] mx-auto mt-4 mb-8 p-2 bg-[#f5e3c5] rounded-lg border-[1px] shadow-md md:mb-10 lg:max-w-[750px]">{description}</p>
      <div className="md:flex md:items-center md:justify-center gap-4 items-start mx-auto ">
        <ItemVariationSelector
          itemId={id}
          variations={size_variants ?? []}
          selectedVariantId={selectedVariantId}
        />
        {selectedVariation &&
          <SelectedVariationDisplay
            selectedVariation={selectedVariation}
          />
        }
      </div>
      <OrderSummary selectedItemId={id} orders={orders} />
      <p className="mt-4 font-semibold text-center">{selectedVariation?.description}</p>
      <div className="z-0">
        <SuggestedItems items={Object.values(itemDataMap).filter((item) => item.id !== id)} />
      </div>
      {Object.keys(orders).length > 0 && (
        <Link href={`/order?item=${shopLinks[id]}`}>
          <button className={`fixed bottom-4 right-4 px-6 py-3 font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white`}>
            Complete Order
          </button>
        </Link>
      )}
    </div>
  );
};

export default ShopItemPage;
