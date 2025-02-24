'use client'
import { useOrderContext } from "@/app/context/OrderContext";
import { Dispatch, SetStateAction, useState } from "react";

interface ShoppingCartProps {
  setIsCartOpen: Dispatch<SetStateAction<boolean>>
  isCartOpen: boolean
  hideOnMd?: boolean
  hideOnSm?: boolean
}
export default function ShoppingCart(props: ShoppingCartProps) {
    const { setIsCartOpen, isCartOpen, hideOnMd, hideOnSm } = props
    const { orders } = useOrderContext();
    const hasOrders = Object.keys(orders).length > 0;
    return (
        //  Shopping Cart Icon 
         <div className={`relative cursor-pointer ${hideOnMd ? 'md:hidden' : ''} ${hideOnSm ? 'sm:hidden' : ''} transition-all duration-300 hover:scale-110`} onClick={() => setIsCartOpen(!isCartOpen)}>
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <circle cx="9" cy="21" r="1" />
             <circle cx="20" cy="21" r="1" />
             <path d="M1 1h4l2.6 13.6a2 2 0 0 0 2 1.4h8.8a2 2 0 0 0 2-1.4L23 6H6" />
         </svg>
         {hasOrders && <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>}
     </div>
    )
}