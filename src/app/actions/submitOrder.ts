"use server";

import { FormDataType } from "../components/supporting_components/order/customerDetailsForm";
import { sendOrder } from "../typesAndInterfaces/orderTypes";


const LAMBDA_ENDPOINT = process.env.NEXT_LAMBDA_ORDER_URL as string; // Lambda function URL

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

