"use server";

import { SendOrderStatusEmailPayload } from "./sendStatusEmail";

const LAMBDA_ENDPOINT = process.env.NEXT_LAMBDA_STATUS_UPDATE_URL as string;
const SECRET_ACCESS_KEY = process.env.STATUS_SECRET_ACCESS_KEY as string;

export async function sendPaidEmail({
  orderId,
  orderNumber,
  customerName,
  email,
  note,
  paid,
  status
}: {
  orderId: string;
  orderNumber: string;
  customerName: string;
  email: string;
  note?: string;
  paid: boolean;
  status: string;
}) {
  try {
    const payload: SendOrderStatusEmailPayload = {
      type: "paymentUpdate",
      orderId,
      orderNumber,
      customerName,
      email,
      paid,
      note,
      newStatus: status
    };

    const response = await fetch(LAMBDA_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret-access-key": SECRET_ACCESS_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Email request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending paid email:", error);
    throw new Error("Failed to send paid email.");
  }
}
