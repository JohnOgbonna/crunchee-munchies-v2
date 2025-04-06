"use server";

import { generateOrderId } from "./functions";
import { saveOrderToDatabase } from "./saveOrderToDatabase";
import { sendOrderEmail } from "./sendOrderEmail";
import { FormDataType } from "../data/customerFields";
import { sendOrder } from "../typesAndInterfaces/orderTypes";

export async function submitOrder(customer: FormDataType, order: sendOrder) {
    try {
        if (!order || Object.keys(order).length === 0) {
            throw new Error("No order found.");
        }

        if (!order.variations || Object.keys(order.variations).length === 0) {
            throw new Error("Order must contain at least one variation.");
        }

        // 🔹 Generate Order ID first
        const orderId = generateOrderId();

        // 🔹 Save order to database (pass generated orderId)
        await saveOrderToDatabase(orderId, customer, order);

        // 🔹 Send order email (ensure email also references orderId)
       await sendOrderEmail(orderId, customer, order);

        return { orderId};
    } catch (error) {
        console.error("Error submitting order:", error);
        return { error: (error as Error).message };
    }
}

// //export async function submitOrder(customer: FormDataType, order: sendOrder) {
//     try {
//         // Ensure there is a valid order
//         if (!order || Object.keys(order).length === 0) {
//             throw new Error("No order found.");
//         }

//         if (!order || Object.keys(order.variations).length === 0) {
//             throw new Error("Order must contain at least one variation.");
//         }

//         // Construct payload for Lambda function
//         const payload = {
//             customer,
//             order,
//         };

//         //Send request to AWS Lambda
//         const response = await fetch(LAMBDA_ENDPOINT as string, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "X-Secret-Access-Key": SECRET_ACCESS_KEY,
//             },
//             body: JSON.stringify(payload),
//         });

//         if (!response.ok) {
//             throw new Error(`Order request failed: ${response.statusText}`);
//         }

//         return await response.json(); // Return Lambda response
//     } catch (error) {
//         console.error("Error submitting order:", error);
//         return { error: (error as Error).message };
//     }
// }
