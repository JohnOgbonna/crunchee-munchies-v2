'use client'
import { whereToFindUsContent } from "../data/whereToFindUsContent";
import { WhereToFindUsContent } from "../typesAndInterfaces/whereToFindUsTypes";
import { PremiumSeller, SupplyToSeller } from "../components/core_components/whereToFindUs/sectionComponents";
import { motion } from "framer-motion";

const WhereToFindUs = () => {
    const content: WhereToFindUsContent = whereToFindUsContent;
    return (
        <div className="mx-auto text-slate-700">
            <motion.h1 className="text-3xl font-bold p-4 max-w-[1440px] mx-auto"
                variants={{
                    hidden: { opacity: .01, x: -155 },
                    visible: { opacity: 1, x: 0 }
                }}
                initial="hidden"
                whileInView={"visible"}
                transition={{ duration: 0.5, delay: 0.7, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}

            >Where to Find Us</motion.h1>

            {/* Premium Sellers Section */}
            <section className="bg-[#f5e3c5] py-4 border-b border-slate-200">
                <div className="max-w-[1440px] mx-auto">
                    <div className="px-4 md:max-w-[700px] lg:max-w-[800px]">
                        <motion.h2 className="text-2xl font-semibold mb-4 italic"
                            variants={{
                                hidden: { opacity: .01, x: -155 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            initial="hidden"
                            whileInView={"visible"}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 1.2, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}
                        >{content.premiumSellers.title}</motion.h2>
                        <p className="">{content.premiumSellers.description}</p>
                    </div>
                    {Object.entries(content.premiumSellers.sellers).map(([key, seller]) => (
                        <PremiumSeller key={key} seller={seller} />
                    ))}
                </div>
            </section>

            {/* Supply To Section */}
            <section className="mt-10 bg-[#f5e3c5]">
                <div className="max-w-[1440px] py-4 mx-auto">
                    <div className="px-4 md:max-w-[700px] lg:max-w-[800px]">
                        <motion.h2 className="text-2xl font-semibold mb-4"
                            variants={{
                                hidden: { opacity: .01, x: -155 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            initial="hidden"
                            whileInView={"visible"}
                            transition={{ duration: 0.5, delay: .7, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}
                        >{content.supplyTo.title}</motion.h2>
                        <p className="mb-4">{content.supplyTo.description}</p>
                    </div>
                    <SupplyToSeller sellers={content.supplyTo.sellers} />
                </div>
            </section>
        </div>
    );
};
export default WhereToFindUs;


