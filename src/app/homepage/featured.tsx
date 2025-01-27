'use client'
import FeaturedSlideShow from "../components/supporting_components/feature_slideshow"
import { chinChin750Group, chinChinBulkOrder, chinChinBulk } from "../data/images"
import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion";

import { featuredItem } from "../typesAndInterfaces/orderTypes"
const featuredSections: featuredItem[] = [
    {
        name: 'Chin-Chin',
        description: 'A Staple African Snack. Perfected, Order Now!',
        link: '/',
        image: chinChin750Group
    },
    {
        name: 'Chin-Chin Wholesale',
        description: 'We sell in bulk! Ideal for resale or large events!',
        link: '/',
        image: chinChinBulkOrder
    },
]
export default function Featured() {
    const [featuredIndex, setFeaturedIndex] = useState<number>(0)

    // Cycle through featured items every 8 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setFeaturedIndex((prev) => (prev + 1) % featuredSections.length)
        }, 8000)
        return () => clearInterval(interval)
    }, [])
 

    return (
        <div>
            <div className="min-h-[550px] h-[70vh] rounded-lg md:max-h-[800px] md:min-h-[600px] mb-4 md:h-[50vh] lg:min-h-[700px] p-4 flex flex-col items-center justify-center max-w-[1440px] mx-auto">
                <h2 className="font-bold text-[1.3rem] self-start md:text-[1.6rem]">Featured</h2>
                <div className=" w-full">
                    <Link href={featuredSections[featuredIndex].link} className="block w-full">
                      <FeaturedSlideShow sections={featuredSections} />
                    </Link>
                </div>
            </div>
        </div>
    );
}