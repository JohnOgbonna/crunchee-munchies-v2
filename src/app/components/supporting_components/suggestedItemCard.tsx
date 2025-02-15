import { item } from "@/app/typesAndInterfaces/orderTypes";
import Link from "next/link";
import { shopLinks } from "@/app/data/items";

interface SuggestedItemCardProps {
    item: item;
}

const SuggestedItemCard = ({ item }: SuggestedItemCardProps) => {
    return (
        <Link href={`/shop/${shopLinks[item.id]}${item.size_variants ? '?variant=' + item.size_variants[0].id : ""}`}
            className="relative z-0">
            <div className="relative cursor-pointer group bg-[#f5e3c5] rounded-lg shadow-md transition-all duration-300 z-0 hover:shadow-lg">
                <h3 className="text-lg font-semibold mb-2 p-2">{item.name}</h3>

                {/* Item Image */}
                <div className="w-[90vw] sm:max-h-[280px] max-w-[400px] min-w-[300px] md:max-h-[300px] md:w-[400px] lg:w-[400px] flex justify-center items-center">
                    <img
                        src={item.heroImage}
                        alt={item.name}
                        className="max-w-[350px] max-h-full sm:h-[200px] md:h-[300px] object-contain rounded-lg md:max-h-[300px]"
                    />
                </div>

                {/* Overlay */}
                <div className="relative z-10 inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:rounded-lg transition-opacity">
                    <span className="text-white text-lg font-semibold">Shop {item.name}</span>
                </div>
            </div>
        </Link>
    );
};

export default SuggestedItemCard;
