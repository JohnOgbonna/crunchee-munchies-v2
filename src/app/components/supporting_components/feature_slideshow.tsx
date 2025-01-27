'use client'

import { featuredItem } from "@/app/typesAndInterfaces/orderTypes";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Props {
    sections: featuredItem[]
}

export default function FeaturedSlideShow({ sections }: Props) {
    const [featuredIndex, setFeaturedIndex] = useState<number>(0);

    // Cycle through featured items every 8 seconds
    useEffect(() => {
        if (sections.length === 0) return; // Prevent running if sections are empty

        const interval = setInterval(() => {
            setFeaturedIndex((prev) => (prev + 1) % sections.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [featuredIndex, sections.length]); // Dependency array updated

    if (sections.length === 0) {
        return <div className="text-center">No featured items available</div>;
    }

    const featured = sections[featuredIndex];

    return (
        <div className="w-full ">
            <div className="flex flex-col justify-center items-center w-full aspect-w-16 aspect-h-9 overflow-hidden rounded-lg md:flex-row min-h-[500px]">
                {/* Image */}
                <div className="md:max-w-[60%]">
                    <AnimatePresence mode="wait" >
                        <motion.img
                            key={featured.image}
                            src={featured.image}
                            alt={featured.name}
                            className="w-full h-full object-cover"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        />
                    </AnimatePresence>
                </div>

                <motion.div className="left-4 p-3  md:w-[40%]"
                    key={featured.description}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }}
                >
                    <h3
                        key={`${featured.name}-title`}
                        className="sm:text-center text-slate-700 text-xl font-semibold">
                        {featured.name}
                    </h3>

                    <p
                        key={`${featured.description}-desc`}
                        className="text-slate-700 text-sm"

                    >
                        {featured.description}
                    </p>

                </motion.div>

            </div>

        </div>
    );
}
