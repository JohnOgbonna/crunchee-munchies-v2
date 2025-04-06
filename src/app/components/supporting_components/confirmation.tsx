import React from "react";
import CloseIcon from "./icons/close";
import { motion } from "framer-motion";


interface ConfirmationProps {
    type: 'order' | 'message';
    customerData: {
        name: string;
        email: string;
        submittedOrderId?: string
    };
    handleClose: () => void;
    finalOrder?: boolean;
    handleItemClose?: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ customerData, handleClose, type, finalOrder, handleItemClose }) => {
    const onClose = () => {
        handleClose();
        if (type === 'order' && finalOrder) window.location.href = "/shop";
        else if (type === 'order' && !finalOrder && handleItemClose) handleItemClose()
    }
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
            <motion.div
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center"
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-slate-700">{type === 'order' ? 'Order Confirmed!' : 'We Got Your Message!'}</h3>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                        <CloseIcon size={24} />
                    </button>
                </div>
                {customerData.submittedOrderId && <p className="text-gray-700 mb-3 font-bold">Order Number: {customerData.submittedOrderId}.</p>}
                {
                    type === 'order' ?
                        <div>
                            <p className="text-gray-700 ">Thank you, <span className="font-bold">{customerData.name}</span>!</p>
                            <p className="text-gray-700 ">A confirmation has been sent to <span className="font-bold">{customerData.email}</span>.</p>
                        </div>
                        :
                        <div>
                            <p className="text-gray-700 ">Thank you, <span className="font-bold">{customerData.name}</span> for reaching out to us!</p>
                            <p className="text-gray-700 ">We will get back to you as soon as possible!<span className="font-bold">{customerData.email}</span>.</p>
                        </div>
                }
                <div className="flex justify-center mt-6">
                    <button onClick={onClose} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800">
                        Close
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Confirmation;
