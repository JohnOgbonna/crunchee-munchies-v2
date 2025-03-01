'use server';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { ContactFormData, contactFormSchema } from '../data/connectContent';



export async function sendMessage(formData: ContactFormData) {
    try {
        // Validate form data using Zod
        const validatedData = contactFormSchema.parse(formData);

        // Send data to AWS Lambda function
        const response = await fetch(process.env.LAMBDA_CONTACT_URL as string, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Lambda function error: ${errorText}`);
            return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
