'use client'

import { navSections, navSubsections } from "@/app/data/structures";
import { useState } from "react";
import { useOrderContext } from "@/app/context/OrderContext";
import OrderSummary from "../../supporting_components/orderSummary";
import { itemId } from "@/app/typesAndInterfaces/orderTypes";
import ShoppingCart from "../../supporting_components/icons/shoppingCart";
import HamburgerMenu from "../../supporting_components/icons/hamburgerMenu";
import OrderPanel from "../../supporting_components/orderPanel";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [hoveredSection, setHoveredSection] = useState<string | null>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { orders } = useOrderContext();

    const toggleSubsections = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <nav className="md:bg-orange-200 text-slate-700">
            <div className="md:flex md:justify-between max-w-[1440px] mx-auto">
                <div className="flex justify-between bg-orange-200 p-2 max-w-[1400px]">
                    <h1 className="font-bold cursor-pointer">Crunchee Munchies</h1>
                    <div className="flex items-center">
                        <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} hideOnMd={true} />
                        <HamburgerMenu actionState={isOpen} actionSet={setIsOpen} />
                    </div>
                </div>

                {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden" onClick={() => setIsOpen(false)}></div>}

                <ul className={`
                    flex flex-col items-stretch gap-2 p-2 bg-orange-200 fixed top-0 right-0 h-full transition-transform duration-700 md:static md:flex-row md:gap-4 md:items-center md:text-[.9rem]
                    ${isOpen ? 'w-[92vw] min-w-[320px] translate-x-0' : 'translate-x-full'} md:w-auto md:min-w-0 md:translate-x-0
                `}>
                    {Object.entries(navSections).map(([key, value]) => (
                        <li key={key} className="cursor-pointer text-lg md:text-base relative group md:inline-block"
                            onMouseEnter={() => setHoveredSection(key)}
                            onMouseLeave={() => setHoveredSection(null)}>
                            <div className="flex items-center md:w-auto" onClick={() => setIsOpen(false)}>
                                <Link href={`/${key}`}>{value}</Link>
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

                            <ul className={`md:hidden overflow-hidden transition-max-height duration-500 ease-in-out ${expandedSection === key ? 'max-h-96' : 'max-h-0'}`}>
                                {navSubsections[key] && Object.entries(navSubsections[key]).map(([subKey, subValue]) => (
                                    <li key={subKey} className="pl-4 py-1 text-sm text-gray-700">
                                        <a href={`/${subValue.link}`} onClick={() => setIsOpen(false)}>{subKey.replace(/_/g, ' ')}</a>
                                    </li>
                                ))}
                            </ul>

                            {navSubsections[key] && (
                                <ul className={`hidden md:block absolute left-0 top-full bg-orange-200 shadow-lg rounded-md p-2 transition-all duration-300 ease-in-out 
                                    ${hoveredSection === key ? 'opacity-100 visible scale-100 max-h-[400px]' : 'opacity-0 invisible scale-95 max-h-0 p-0'}`}
                                >
                                    {Object.entries(navSubsections[key]).map(([subKey, subValue]) => (
                                        <li key={subKey} className="py-1 px-3 text-sm text-gray-700 hover:bg-orange-300 rounded-md">
                                            <a href={`/${subValue.link}`}>{subKey.replace(/_/g, ' ')}</a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                    <li className="md:mr-2 lg:mr-4">
                        <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} hideOnSm={true} />
                    </li>
                </ul>
            </div>

            {/* Order Panel */}
           <OrderPanel isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        </nav>
    );
}
