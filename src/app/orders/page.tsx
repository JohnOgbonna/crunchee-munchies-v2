"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const OrderSearchPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [confirmationNumber, setConfirmationNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        if (!confirmationNumber.trim()) {
            setErrorMessage("Please enter your confirmation number.");
            return;
        }

        if (!email.trim()) {
            setErrorMessage("Please enter your email.");
            return;
        }

        // Remove leading '#' and sanitize input to uppercase
        const sanitizedConfirmation = confirmationNumber.trim().toUpperCase().replace(/^#/, "").toUpperCase();
        // Go to order detail page
        router.push(`/orders/${sanitizedConfirmation}?email=${encodeURIComponent(email.trim())}`);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
                <h1 className="text-2xl font-semibold mb-4 text-center text-yellow-600">
                    Find Your Order
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="confirmation" className="block text-sm font-medium text-gray-700">
                            Confirmation Number
                        </label>
                        <input
                            type="text"
                            id="confirmation"
                            value={confirmationNumber}
                            onChange={(e) => setConfirmationNumber(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        />
                    </div>

                    {errorMessage && (
                        <div className="text-red-600 text-sm font-medium">{errorMessage}</div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded font-semibold"
                    >
                        View Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OrderSearchPage;
