'use client'
import { useOrderContext } from "@/app/context/OrderContext";
import { Dispatch, SetStateAction, useState } from "react";

export interface socialMediaIconProps {
    size: number
    hideOnMd?: boolean
    hideOnSm?: boolean
}
export default function TikTokIcon(props: socialMediaIconProps) {
    const { hideOnMd, hideOnSm, size } = props
    const { orders } = useOrderContext();
    const hasOrders = Object.keys(orders).length > 0;
    return (
        <div className={`relative cursor-pointer ${hideOnMd ? 'md:hidden' : ''} ${hideOnSm ? 'sm:hidden' : ''}`}>
            <svg fill="currentColor" width={`${size}`} height={`${size}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" /></svg>
            {hasOrders && <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>}
        </div>
    )
}