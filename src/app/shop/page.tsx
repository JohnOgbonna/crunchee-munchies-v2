import ItemCard from "../components/supporting_components/shop/itemCard";
import { getCachedItems } from "../lib/fetchItems";
import { getCachedItemTypes } from "../lib/fetchItemTypes";

const Shop: React.FC = async () => {
    const itemTypes = await getCachedItemTypes();
    const items = await getCachedItems();
    const sortedItems = Object.values(items).sort((a, b) => (a.listOrder ?? Infinity) - (b.listOrder ?? Infinity));
    const sortedItemTypes = Object.values(itemTypes).sort((a, b) => (a.listOrder ?? Infinity) - (b.listOrder ?? Infinity));

    // Group items by type
    const groupedItems: Record<string, typeof sortedItems> = {};
    sortedItems.forEach(item => {
        if (!groupedItems[item.type]) {
            groupedItems[item.type] = [];
        }
        groupedItems[item.type].push(item);
    });

    return (
        <div className="container mx-auto p-4 text-slate-700">
            <h1 className="text-3xl font-bold mb-4">Shop</h1>
            <p className="mb-4">Browse our items!</p>
            <div>
                {Object.entries(groupedItems).map(([type, items]) => (
                    <div key={type} className="mb-16 md:last:mb-10">
                        <div className="mb-4 max-w-[500px]">
                            <h2 className="text-2xl font-semibold mb-3 capitalize">{itemTypes[type].name}</h2>
                            <p>{itemTypes[type].description}</p>
                        </div>
                        <div className="relative rounded-lg">
                            <div className="flex space-x-4 overflow-x-scroll pb-2 w-full scrollbar-hidden">
                                {items.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="flex-none w-[90%] max-w-[300px] min-w-[120px] md:w-[35%] md:min-w-[250px] md:max-w-[350px] lg:w-[30%] lg:max-w-[400px] lg:min-w-[325px]"
                                    >
                                        <ItemCard item={item} index={index} link={`shop/${item.id}`} />
                                    </div>
                                ))}
                            </div>
                            {/* Left blur overlay */}
                            <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-5 md:w-16 bg-gradient-to-r from-[#f5e3c5] to-transparent filter md:blur-[xl]" />
                            {/* Right blur overlay with increased width and blur filter */}
                            {items.length > 2 &&
                                <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-5 md:w-16 bg-gradient-to-l from-[#f5e3c5] to-transparent filter blur-[2xl]" />
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;
