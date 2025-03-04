'use server';

import { formData } from "../data/connectContent";

const LAMBDA_ENDPOINT = process.env.NEXT_LAMBDA_MESSAGE_URL as string;
const SECRET_ACCESS_KEY = process.env.NEXT_API_SECRET_ACCESS_KEY as string;

export async function sendMessage(data: formData): Promise<{ error?: string; message?: string }> {
    try {
        const response = await fetch(LAMBDA_ENDPOINT as string, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Secret-Access-Key": SECRET_ACCESS_KEY,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server error: ${errorText}`);
        }
        return await response.json();

    } catch (error) {
        console.error("Error sending customer inquiry:", error);
        return { error: "Failed to send message. Please try again." };
    }
}

