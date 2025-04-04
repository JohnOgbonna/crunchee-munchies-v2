'use client'
import FeaturedSlideShow from "../components/supporting_components/feature_slideshow"
import { chinChin750Group, chinChinBulkOrder } from "../data/images"
import { useEffect, useState } from "react"
import Link from "next/link"

import { featuredItem } from "../typesAndInterfaces/orderTypes"
const featuredSections: featuredItem[] = [
    {
        name: 'New Products Available',
        description: 'We have new products available; Meat pies and Fish Rolls! (Pickup only)',
        link: '/shop/meat_pie_fish_roll?variant=mp-1',
        image: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/busy-bee/meat-pie-fish-roll-hero.jpg'
    },
    {
        name: 'Connect With Us',
        description: 'Follow us on social media for updates, to learn more about us and to see what we\'re up to!',
        link: '/connect', 
        image: 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/team/team-1.png'
    },
    {
        name: 'Chin Chin',
        description: 'A Staple African Snack. Perfected, Order Now!',
        link: '/shop/chin_chin_standard?variant=ch-1-750',
        image: chinChin750Group
    },
    {
        name: 'Chin Chin Wholesale',
        description: 'We sell in bulk! Ideal for resale or large events!',
        link: '/shop/chin_chin_wholesale?variant=ch-by-kg',
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
            <h2 className="font-bold text-[1.3rem] self-start md:text-[1.6rem] px-4">Featured</h2>
            <div className="min-h-[550px] h-[70vh] rounded-lg md:max-h-[800px] mb-4 md:h-[50vh] justify-center p-4 flex flex-col items-center max-w-[1440px] mx-auto">
                <div className=" w-full">
                    <Link href={featuredSections[featuredIndex].link} className="block w-full">
                        <FeaturedSlideShow sections={featuredSections} />
                    </Link>
                </div>
            </div>
        </div>
    );
}