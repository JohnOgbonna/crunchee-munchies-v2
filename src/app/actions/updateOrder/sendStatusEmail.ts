// app/actions/sendStatusEmail.ts
"use server";

export interface SendOrderStatusEmailPayload {
    type: 'orderStatus' | 'paymentUpdate',
    orderId: string;
    orderNumber: string;
    customerName: string;
    email: string;
    newStatus?: string;
    oldStatus?: string;
    note?: string;
    paid?: boolean;
}

const STATUS_LAMBDA_ENDPOINT = process.env.NEXT_LAMBDA_STATUS_UPDATE_URL as string;
const SECRET_ACCESS_KEY = process.env.STATUS_SECRET_ACCESS_KEY as string;

export async function sendStatusEmail(payload: SendOrderStatusEmailPayload) {
    try {
        const response = await fetch(STATUS_LAMBDA_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Secret-Access-Key": SECRET_ACCESS_KEY,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.log(response.statusText)
          throw new Error(`Status email failed: ${response.statusText}`);
         
        }

        return await response.json();
    } catch (error) {
        console.error("Error sending status email:", error);
        throw new Error("Failed to send status update email.");
    }
}
