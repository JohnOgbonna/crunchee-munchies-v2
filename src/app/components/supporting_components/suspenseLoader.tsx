import { useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
    isLoading: boolean;
    type: 'order' | 'message';
}
export default function SuspenseLoader({ isLoading, type }: Props) {
    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isLoading]);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 h-[screen]">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="sm:fixed sm:top-[80%] flex flex-col items-center bg-white p-6 rounded-lg shadow-lg"
            >
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-700 font-medium">Sending your {type === 'order' ? 'order' : 'message'}...</p>
            </motion.div>
        </div>
    );
}
