'use client';
import { motion } from "framer-motion";
import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { navSections } from "@/app/data/structures";


const Footer = () => {
    return (
        <footer className="w-full bg-primary text-slate-700 py-8 px-4 md:px-12 lg:px-20 bg-[#f5e3c5] mt-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8 text-center md:text-left">
                {/* Branding & About */}
                <div className="flex-1">
                    <motion.h2 className="text-xl font-bold"
                        variants={{
                            hidden: { opacity: .01, x: -155 },
                            visible: { opacity: 1, x: 0 }
                        }}
                        initial="hidden"
                        whileInView={"visible"}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.7, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}
                    >Crunchee Munchies</motion.h2>
                    <p className="text-sm mt-2">
                        The best Chin Chin in the world.
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="flex-1">
                    <h3 className="text-lg font-semibold">Quick Links</h3>
                    <ul className="mt-2 space-y-2">
                        {Object.entries(navSections).map(([key, value]) => (
                            <li key={key}>
                                <Link href={`/${key}`} className="hover:underline">{value}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Media */}
                <div className="flex-1">
                    <h3 className="text-lg font-semibold">Follow Us</h3>
                    <div className="flex justify-center md:justify-start space-x-4 mt-2">
                        <a href="https://www.instagram.com/crunchee_munchies/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={24} className="hover:text-accent transition" />
                        </a>
                        <a href="https://www.tiktok.com/@crunchee.munchies" target="_blank" rel="noopener noreferrer">
                            <FaTiktok size={24} className="hover:text-accent transition" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-sm mt-8 border-t border-opacity-50 pt-4">
                <p>&copy; {new Date().getFullYear()} Crunchee Munchies. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
