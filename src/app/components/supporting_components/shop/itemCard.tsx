'use client'
import React from "react";
import { item } from "@/app/typesAndInterfaces/orderTypes";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { delayedFadeInAnimationVariants } from "@/app/data/ui";

interface ItemCardProps {
    link: string
    item: item;
    index: number
}

const ItemCard: React.FC<ItemCardProps> = ({ item, link, index }) => {
    return (
        <Link href={`/${link}${item.size_variants ? '?variant=' + item.size_variants[0].id : ""}`} className="w-full bg-[#f5e3c5] rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105  flex flex-col items-center cursor-pointer justify-between p-4 h-full">
            <motion.div className="flex-1 flex items-center justify-center mb-2 w-full"
                variants={delayedFadeInAnimationVariants}
                initial="initial"
                whileInView={"animate"}
                custom={index}
                viewport={{ once: true }}
            >
                <Image
                    src={item.heroImage}
                    alt={item.name}
                    className="object-contain h-[200px] w-full transition-all duration-300 ease-in-out rounded-lg"
                    width={0}
                    height={0}
                    style={{}}
                    sizes="100vw"
                />
            </motion.div>
            <motion.div
                variants={{
                    hidden: { opacity: .01, x: -155 },
                    visible: { opacity: 1, x: 0 }
                }}
                initial="hidden"
                whileInView={"visible"}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.2, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}

            >
                <motion.h2 className="text-xl font-semibold">{item.name}</motion.h2>
                <p className="text-gray-700 line-clamp-2 hover:line-clamp-none">{item.description}</p>
            </motion.div>
        </Link>
    );
};



export default ItemCard;
