'use client'
import { motion } from "framer-motion";
import { chinChin750Hero as heroImage } from "../data/images";
import Image from "next/image";

export default function Hero() {
    return (
        <div className="bg-[#f5e3c5]">
            <div className={`p-4 flex flex-col items-center justify-center gap-4 mb-4 md:flex-row md:flex-wrap min-h-[400px] md:max-h-[700px] max-w-[1440px] mx-auto`}>
                <h2 className="font-bold text-[1.3rem] self-start md:text-[1.6rem] mb-4 md:w-full">Crunchee Munchies</h2>
                <motion.div
                    variants={{
                        hidden: { opacity: .01, x: -155 },
                        visible: { opacity: 1, x: 0 }
                    }}
                    initial="hidden"
                    whileInView={"visible"}
                    transition={{ duration: 0.4, delay: .5, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}
                >
                    <Image
                        src={heroImage}
                        alt="chinChinHero"
                        className={`h-[50vh] min-h-[300px] max-h-[400px]`}
                        width={0}
                        height={0}
                        style={{ width: "auto", height: "auto" }}
                        sizes="100vw"
                    />
                </motion.div>
                <motion.h1 className={`text-[1.1rem] md:text-[1.3rem] lg:text-[1.6rem]`}
                    variants={{
                        hidden: { opacity: .01, x: 155 },
                        visible: { opacity: 1, x: 0 }
                    }}
                    initial="hidden"
                    whileInView={"visible"}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 1.1, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}
                >Chin-Chin. The Staple African Snack. Perfected.</motion.h1>
            </div>
        </div>
    )
}