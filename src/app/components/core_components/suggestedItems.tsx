import { useRef } from "react";
import SuggestedItemCard from "../supporting_components/suggestedItemCard";
import { item } from "@/app/typesAndInterfaces/orderTypes";


const SuggestedItems = ({ items }: { items: item[] }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: string) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth;
            scrollRef.current.scrollTo({
                left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="mt-[100px] relative">
            <h3 className="text-2xl font-bold mb-8">More From Our Shop</h3>
            <div
                ref={scrollRef}
                className="flex space-x-4 overflow-x-scroll scrollbar-hide w-full md:space-x-8 lg:justify-center"
            >
                {items.map((item) => (
                    <SuggestedItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default SuggestedItems;
