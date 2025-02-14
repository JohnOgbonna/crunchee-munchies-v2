'use client';

import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useOrderContext } from "@/app/context/OrderContext";
import { itemSizeVariation } from "@/app/typesAndInterfaces/orderTypes";

interface ItemVariationSelectorProps {
    itemId: string;
    variations: itemSizeVariation[];
    selectedVariantId: string;
}

const ItemVariationSelector: React.FC<ItemVariationSelectorProps> = ({ itemId, variations, selectedVariantId }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const handleSelectVariation = (variantId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("variant", variantId);
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex justify-center md:flex-col sm:mb-4 space-x-2 md:space-x-0 md:space-y-2 overflow-auto md:overflow-visible p-2 md:w-[150px]">
            {variations && variations.map((variation) => (
                <button
                    key={variation.id}
                    className={`px-4 py-2 border rounded-lg text-[1rem] ${selectedVariantId === variation.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleSelectVariation(variation.id)}
                >
                    {variation.name}
                </button>
            ))}
        </div>
    );
};

export default ItemVariationSelector;
