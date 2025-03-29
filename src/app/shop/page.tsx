import ItemCard from "../components/supporting_components/shop/itemCard";
import { getCachedItems } from "../api/items/route";

const Shop: React.FC = async () => {
    const items = await getCachedItems();
    console.log(items)
    return (
        <div className="container mx-auto p-4 text-slate-700">
            <h1 className="text-3xl font-bold mb-4 ">Shop</h1>
            <p className="mb-4">Browse our items!</p>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 transition-all duration-300 ease-in-out">
                {Object.values(items).map((item, index) => {
                    console.log('item id', item.id)
                    return (
                    <ItemCard key={item.id} item={item} index={index} link={`shop/${item.id}`} />
                )})}
            </div>
        </div>
    );
};

export default Shop;
