'use client';

import { connectContent } from "@/app/data/connectContent";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SocialMediaSection() {
    return (
        <section>
            <motion.h2 className="text-2xl font-bold text-center mb-4 underline"
                variants={{
                    hidden: { opacity: .01, x: -155 },
                    visible: { opacity: 1, x: 0 }
                }}
                initial="hidden"
                whileInView={"visible"}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}
            >
                {connectContent.socialMedia.header}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(connectContent.socialMedia.networks).map((network) => (
                    <div
                        key={network.name}
                        className="p-4 border rounded-lg shadow-md flex flex-col items-center space-y-2"
                    >
                        <div className="flex items-center space-x-2">
                            <network.icon size={24} />
                            <h3 className="text-lg font-semibold">{network.name}</h3>
                        </div>
                        <Link
                            href={network.link}
                            target="_blank"
                            className="text-primary hover:underline text-blue-600 underline italic"
                        >
                            {network.description}
                        </Link>
                        {'iframe' in network && network.iframe && <network.iframe />}
                    </div>
                ))}
            </div>
        </section>
    )
}