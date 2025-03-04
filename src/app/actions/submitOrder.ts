"use server";

import { FormDataType } from "../data/customerFields";
import { sendOrder } from "../typesAndInterfaces/orderTypes";


const LAMBDA_ENDPOINT = process.env.NEXT_LAMBDA_ORDER_URL as string; // Lambda function URL
const SECRET_ACCESS_KEY = process.env.NEXT_API_SECRET_ACCESS_KEY as string; // access key

export async function submitOrder(customer: FormDataType, order: sendOrder) {
    try {
        // Ensure there is a valid order
        if (!order || Object.keys(order).length === 0) {
            throw new Error("No order found.");
        }

        // Get the first and only item ID
        const [itemId] = Object.keys(order);

        if (!order || Object.keys(order.variations).length === 0) {
            throw new Error("Order must contain at least one variation.");
        }

        // Construct payload for Lambda function
        const payload = {
            customer,
            order,
        };

        //Send request to AWS Lambda
        const response = await fetch(LAMBDA_ENDPOINT as string, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Secret-Access-Key": SECRET_ACCESS_KEY,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Order request failed: ${response.statusText}`);
        }

        return await response.json(); // Return Lambda response
    } catch (error) {
        console.error("Error submitting order:", error);
        return { error: (error as Error).message };
    }
}

