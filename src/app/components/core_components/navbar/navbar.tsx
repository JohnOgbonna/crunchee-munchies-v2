'use client'
import { navSections } from "@/app/data/structures";
import { useState } from "react";


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <nav className={`md:bg-orange-200 text-slate-700 md:pr-4`}>
            <div className={`md:flex md:justify-between max-w-[1440px] mx-auto`}>
                <div className={`flex justify-between  bg-orange-200 p-2 max-w-[1400px]`}>
                    <h1 className={`font-bold cursor-pointer`}>Crunchee Munchies</h1>
                    {/* hamburger menu */}
                    <svg width="24" id="hamburger" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className={`md:hidden cursor-pointer`}
                        onClick={() => setIsOpen(!isOpen)}>
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </div>
                <ul className={`${isOpen ? 'sm:max-h-[600px]' : 'sm:max-h-0 sm:overflow-hidden sm:p-0'} transition-all duration-700 flex sm:flex-col sm:gap-2 sm:items-end sm:bg-orange-200 sm:pr-2 md:flex-row md:gap-4 md:items-center md:text-[.9rem]`}>
                    {
                        Object.entries(navSections).map(([key, value]) => {
                            return <li key={key} className={`cursor-pointer`}>{value}</li>
                        })
                    }
                </ul>
            </div>
        </nav>
    )
}