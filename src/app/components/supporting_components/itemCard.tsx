import React from "react";
import { item } from "@/app/typesAndInterfaces/orderTypes";
import Link from "next/link";

interface ItemCardProps {
    link: string
    item: item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, link }) => {
    return (
        <Link href={link} className="bg-[#f5e3c5] rounded-lg shadow-md hover:shadow-lg transition-all duration-300 min-h-[400px] flex flex-col items-center cursor-pointer justify-between p-4">
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
        </Link>
    );
};



export default ItemCard;
