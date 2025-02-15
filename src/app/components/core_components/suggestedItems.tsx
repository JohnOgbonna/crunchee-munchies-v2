import { useRef } from "react";
import SuggestedItemCard from "../supporting_components/suggestedItemCard";
import { item } from "@/app/typesAndInterfaces/orderTypes";


const SuggestedItems = ({ items }: { items: item[] }) => {

    return (
        <div className="mt-[100px] z-0 relative ">
            <h3 className="text-2xl font-bold mb-8">More From Our Shop</h3>
            <div
                className="flex space-x-4 overflow-x-scroll  w-full md:space-x-8"
            >
                {items.map((item) => (
                    <SuggestedItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default SuggestedItems;
