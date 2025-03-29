"use client";

import { navSections, NavSubsection, NavSubsections } from "@/app/data/structures";
import { useState, useEffect } from "react";
import ShoppingCart from "../../supporting_components/icons/shoppingCart";
import HamburgerMenu from "../../supporting_components/icons/hamburgerMenu";
import OrderPanel from "../../supporting_components/shop/orderPanel";
import Link from "next/link";
import { MobileSubsections, DesktopSubsections } from "../../supporting_components/navBar/navSubsections";
import CloseIcon from "../../supporting_components/icons/close";
import { motion } from "framer-motion";
import { delayedFadeInAnimationVariants } from "@/app/data/ui";
import { getCachedItems } from "@/app/api/items/route";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [hoveredSection, setHoveredSection] = useState<string | null>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [navSubsections, setNavSubsections] = useState<NavSubsections>({});

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const cachedItems = await getCachedItems();
                const updatedSubsections: NavSubsections = { shop: {} };

                Object.values(cachedItems).forEach((item) => {
                    updatedSubsections.shop[item.id] = { link: `shop/${item.id}`, name: item.name };
                });

                setNavSubsections(updatedSubsections);
            } catch (error) {
                console.error("Failed to fetch items for navbar:", error);
            }
        };

        fetchItems();
    }, []);

    const toggleSubsections = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <motion.nav className="md:bg-orange-200 text-slate-700 z-20 md:z-10 md:p-1 sticky top-0"
            initial={{ y: -100, opacity: .75 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                y: { duration: 0.3, ease: 'easeOut', delay: 0.25 },
                opacity: { duration: 0.8, delay: 0.8 },
            }}
        >
            <div className="md:flex md:justify-between max-w-[1440px] mx-auto">
                <div className="flex justify-between bg-orange-200 p-2 max-w-[1400px]">
                    <Link href="/"><h1 className="font-bold cursor-pointer hover:underline text-[1.2rem] hover:scale-105 transition-all ease-in-out">Crunchee Munchies</h1></Link>
                    <div className="flex items-center">
                        <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} hideOnMd={true} />
                        <HamburgerMenu actionState={isOpen} actionSet={setIsOpen} />
                    </div>
                </div>

                {isOpen && <div className="absolute inset-0 bg-black bg-opacity-50 md:hidden" onClick={() => setIsOpen(false)}></div>}

                <ul className={`
                        flex flex-col z-30 md:z-10 items-stretch gap-2 p-2 bg-orange-200 fixed top-0 right-0 h-full transition-transform duration-700 md:static md:flex-row md:gap-4 md:items-center md:text-[.9rem]
                        ${isOpen ? ' w-[320px] translate-x-0 ' : 'translate-x-full'} md:w-auto md:min-w-0 md:translate-x-0
                    `}>
                    <li onClick={() => setIsOpen(false)}
                        className="absolute top-2 right-2 cursor-pointer md:hidden"
                    >
                        <CloseIcon className="md:hidden" size={28} />
                    </li>

                    {Object.entries(navSections).map(([key, value], index) => (
                        <motion.li key={key} className="cursor-pointer text-lg md:text-base relative group md:inline-block"
                            onMouseEnter={() => setHoveredSection(key)}
                            onMouseLeave={() => setHoveredSection(null)}
                            variants={delayedFadeInAnimationVariants}
                            initial="initial"
                            whileInView={"animate"}
                            custom={index}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center md:w-auto" onClick={() => setIsOpen(false)}>
                                <Link href={`/${key}`} className="text-[1.3rem] md:text-[1rem] hover:underline hover:scale-105 transition-all ease-in-out">{value}</Link>
                                {navSubsections[key] && (
                                    <svg
                                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                        className={`ml-2 transition-transform duration-300 md:hidden ${expandedSection === key ? 'rotate-180' : 'rotate-0'}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleSubsections(key);
                                        }}
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                )}
                            </div>

                            <MobileSubsections
                                sectionKey={key}
                                subsections={navSubsections[key] as NavSubsection || {}}
                                isExpanded={expandedSection === key}
                                onClose={() => setIsOpen(false)}
                            />

                            <DesktopSubsections
                                sectionKey={key}
                                subsections={navSubsections[key] as NavSubsection || {}}
                                isHovered={hoveredSection === key}
                            />
                        </motion.li>
                    ))}
                    <li className="md:mr-2 lg:mr-4 sm:hidden">
                        <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} hideOnSm={true} />
                    </li>
                </ul>

            </div>

            <OrderPanel isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        </motion.nav>
    );
}
