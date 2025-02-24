"use client";

import { featuredItem } from "@/app/typesAndInterfaces/orderTypes";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Props {
    sections: featuredItem[];
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
    }, [sections.length]);

    if (sections.length === 0) {
        return <div className="text-center">No featured items available</div>;
    }

    const featured = sections[featuredIndex];

    return (
        <div className="w-full flex justify-center items-center overflow-hidden rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-[400px] gap-4">
                {/* Image Section */}
                <div className="relative flex justify-center items-center w-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={featured.image}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="rounded-lg overflow-hidden"
                        >
                            <Image
                                src={featured.image as string}
                                alt={featured.name}
                                width={500} // Adjust width dynamically
                                height={375} // Set height based on screen size
                                className="object-contain rounded-lg"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
                                style={{
                                    height: "auto", // Maintain aspect ratio
                                    maxHeight: "375px",
                                }}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Text Section */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={featured.description}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.3 }}
                        className="p-3 text-center md:text-left"
                    >
                        <h3 className="text-slate-700 text-xl font-semibold">
                            {featured.name}
                        </h3>

                        <p className="text-slate-700 text-sm max-w-[500px]">{featured.description}</p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
