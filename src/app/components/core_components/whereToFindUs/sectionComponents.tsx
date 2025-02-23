import { Seller } from "@/app/typesAndInterfaces/whereToFindUsTypes";
import Link from "next/link";
import { motion } from "framer-motion"
import { delayedFadeInAnimationVariants } from "@/app/data/ui";

export const PremiumSeller = ({ seller }: { seller: Seller }) => {
    return (
        <div className="my-6">
            <div className="mx-auto max-w-[1440px] p-4">
                <motion.h3 className="text-xl font-semibold my-4"
                    variants={{
                        hidden: { opacity: .01, x: -155 },
                        visible: { opacity: 1, x: 0 }
                    }}
                    initial="hidden"
                    whileInView={"visible"}
                    transition={{ duration: 0.5, delay: 1.2, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}
                >{seller.title}</motion.h3>
                <Link href={seller.link} target="_blank" className="text-blue-600 underline italic">
                    Find them online here!
                </Link>
            </div>
            <div className="w-full">
                <div className="flex flex-col md:flex-row gap-4 mt-2 md:gap-8 justify-center px-4 md:pt-6 md:pb-8 mx-auto">
                    {seller.images.map((image, index) => (
                        <motion.div className=""
                            key={index}
                            variants={delayedFadeInAnimationVariants}
                            initial="initial"
                            whileInView={"animate"}
                            custom={index}
                            viewport={{ once: true }}
                        >
                            <img key={index} src={image} alt={seller.title} className="rounded-lg object-contain max-w-[450px] md:max-w-[500px] w-full mx-auto md:h-[400px] lg:max-w:[600px] lg:h-[500px] shadow-lg" />
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="mx-auto max-w-[1440px] p-4">
                {Object.entries(seller.locations).map(([locKey, location]) => (
                    <motion.div key={locKey} className="mt-4"
                        variants={{
                            hidden: { opacity: .01, x: -155 },
                            visible: { opacity: 1, x: 0 }
                        }}
                        initial="hidden"
                        whileInView={"visible"}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1.2, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}
                    >
                        <p className="font-semibold text-[1.1rem] mb-2">Address: {location.address}</p>
                        <Link href={location.googleMapsLink} target="_blank" className="text-blue-600 underline">
                            View on Google Maps
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export const SupplyToSeller = ({ sellers }: { sellers: Record<string, Seller> }) => {
    return (
        <div className="mb-6 px-4 pt-6 md:pt-0 flex flex-col justify-center">
            {Object.entries(sellers).map(([key, seller]) => (
                <div key={key} className="mb-10 border-b border-slate-500 pb-4 last:border-none">
                    <div className="md:flex flex-row-reverse gap-6 justify-center items-center mx-auto">
                        <div className="">
                            <motion.h3 className="text-xl font-semibold mb-4"
                                variants={{
                                    hidden: { opacity: .01, x: -155 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                                initial="hidden"
                                whileInView={"visible"}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: .7, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}

                            >{seller.title}</motion.h3>
                            <Link href={seller.link} target="_blank" className="text-blue-600 underline italic">
                                Find them online here!
                            </Link>
                        </div>
                        <div className="flex gap-4 overflow-x-auto mt-2 rounded-xl">
                            {seller.images.map((image, index) => (
                                <motion.div
                                key={index} 
                                variants={delayedFadeInAnimationVariants}
                                initial="initial"
                                whileInView={"animate"}
                                custom={index}
                                viewport={{ once: true }}
                                >
                                    <img src={image} alt={seller.title} width={200} height={150} className=" object-contain max-w-[450px] md:max-w-[500px] w-full md:h-[400px] shadow-lg" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <motion.h4 className="text-lg font-semibold mt-8 md:mt-2 underline"
                            variants={{
                                hidden: { opacity: .01, x: -155 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            initial="hidden"
                            whileInView={"visible"}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 1.2, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}

                        >Locations:</motion.h4>
                        <div>
                            {Object.entries(seller.locations).map(([locKey, location]) => (
                                <div key={locKey} className="mt-4">
                                    <p className="font-semibold">Address: {location.address}</p>
                                    <Link href={location.googleMapsLink} target="_blank" className="text-blue-600 underline">
                                        View on Google Maps
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};