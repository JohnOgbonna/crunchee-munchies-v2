'use client'
import { motion } from "framer-motion";
import SuggestedItemCard from "./suggestedItemCard";
import { item } from "@/app/typesAndInterfaces/orderTypes";


const SuggestedItems = ({ items }: { items: item[] }) => {
    return (
        <div className="mt-[100px] z-0 relative ">
            <motion.h3 className="text-2xl font-bold mb-8"
                variants={{
                    hidden: { opacity: .01, x: -155 },
                    visible: { opacity: 1, x: 0 }
                }}
                initial="hidden"
                whileInView={"visible"}
                transition={{ duration: 0.5, delay: 0.7, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}

            >More From Our Shop</motion.h3>
            <div
                className="flex space-x-4 overflow-x-scroll scrollbar-hidden w-full md:space-x-8"
            >
                {items.map((item, index) => (
                    <SuggestedItemCard key={item.id} item={item} index={index} />
                ))}
            </div>
        </div>
    );
};

export default SuggestedItems;
