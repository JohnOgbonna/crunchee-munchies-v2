import React from "react";
import { item } from "@/app/typesAndInterfaces/orderTypes";

interface ItemCardProps {
    item: item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
    return (
        <div className="bg-[#f5e3c5] p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 min-h-[400px] flex flex-col items-center cursor-pointer justify-between">
            <div className="flex-1 flex items-center justify-center mb-2 w-full">
                <img
                    src={item.heroImage}
                    alt={item.name}
                    className="object-contain max-h-[300px] w-full transition-all duration-300 ease-in-out"
                />
            </div>
            <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-700">{item.description}</p>
            </div>
        </div>
    );
};



export default ItemCard;
