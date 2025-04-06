"use server";

import { FormDataType } from "../data/customerFields";
import { sendOrder } from "../typesAndInterfaces/orderTypes";

const LAMBDA_ENDPOINT = process.env.NEXT_LAMBDA_ORDER_URL as string;
const SECRET_ACCESS_KEY = process.env.NEXT_API_SECRET_ACCESS_KEY as string;

export async function sendOrderEmail(orderId: string, customer: FormDataType, order: sendOrder) {
    try {
        // Include orderId in the order payload
        const payload = {
            orderId,  // 🔹 Ensure orderId is included
            customer,
            order: { ...order }, // 🔹 Order object now includes the orderId
        };

        const response = await fetch(LAMBDA_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Secret-Access-Key": SECRET_ACCESS_KEY,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Email request failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send order email.");
    }
}
