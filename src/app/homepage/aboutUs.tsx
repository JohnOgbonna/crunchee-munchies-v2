'use client'

import { motion } from "framer-motion"

export default function AboutUsHome() {
    return (
        <div className="bg-[#f5e3c5]">
            <div className={`p-4 flex flex-col items-center justify-center gap-4 mb-4 md:flex-row md:flex-wrap min-h-[400px] h-[70vh] md:max-h-[600px] w-full max-w-[1440px] mx-auto lg:min-h-[500px]`}>
                <motion.h1 className="font-bold text-[1.3rem] self-start md:text-[1.6rem] w-full"
                    variants={{
                        hidden: { opacity: .01, x: -155 },
                        visible: { opacity: 1, x: 0 }
                    }}
                    initial="hidden"
                    whileInView={"visible"}
                    transition={{ duration: 0.5, delay: 0.7, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}

                >Who We Are</motion.h1>
                <motion.div className="w-full flex flex-col items-center justify-center lg:text-[1.2rem]"
                    variants={{
                        hidden: { opacity: .01, x: -155 },
                        visible: { opacity: 1, x: 0 }
                    }}
                    initial="hidden"
                    whileInView={"visible"}
                    transition={{ duration: 0.5, delay: 0.9, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}

                >
                    <h2 className="font-bold mb-2 italic w-full max-w-[600px]">{"We're a Family Owned Company!"}</h2>
                    <motion.p className="w-full max-w-[600px]"
                    >{"We beleive we make the best Chin-Chin in the world and we want to share it with you- And then with the world! With our special recipie that we refined to perfection, we've recieved rave customer reviews. We're based in Calgary, Alberta and we're expanding our market!"}</motion.p>
                </motion.div>
                <motion.a href="/about" className="hover:underline text-blue-600 cursor-pointer italic hover:scale-105 transition-all duration-400 font-bold"
                     variants={{
                        hidden: { opacity: .01, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    initial="hidden"
                    whileInView={"visible"}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}    
                >Learn More About Us!</motion.a>
            </div>
        </div>
    )
}