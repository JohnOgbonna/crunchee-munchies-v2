import React from "react";
import ItemCard from "../components/supporting_components/itemCard";
import { item } from "../typesAndInterfaces/orderTypes";
import { chin_chin_standard, chin_chin_wholesale, chin_chin_event_order, chin_chin_bundle } from "../data/items";

const items: item[] = [chin_chin_standard, chin_chin_wholesale, chin_chin_event_order, chin_chin_bundle];

const Shop: React.FC = () => {
    return (
        <div className="container mx-auto p-4 text-slate-700">
            <h1 className="text-3xl font-bold mb-6 ">Shop</h1>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 transition-all duration-300 ease-in-out">
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Shop;
