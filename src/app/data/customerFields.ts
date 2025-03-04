import { z } from "zod";

export interface customerField {
    id: string,
    display: string,
    required: boolean,
    inputType: string,
    placeholder?: string,
    disclaimer?: string[],
    dependsOn?: string,
    checkedByDefault?: boolean,
    listOptions?: { [key: string]: listOption };
}

export interface listOption {
    id: string;
    value: string;
    display: string;
    dependsOn?: string;
    checkedByDefault?: boolean;
}

export type preferedResponseTypeField = {
    id: string;
    display: string;
    required: boolean;
    inputType: string;
    listOptions: { [key: string]: listOption};
};

export interface CustomerFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    notes: string;
    needsDelivery: boolean;
    streetAddress?: string;
    city?: string;
    province?: string;
    postalZipCode?: string;
}

export const customerFields: { [key: string]: customerField } = {
    firstName: {
        id: 'firstName',
        display: 'First Name',
        required: true,
        inputType: 'text',
    },
    lastName: {
        id: 'lastName',
        display: 'Last Name',
        required: false,
        inputType: 'text',
    },
    email: {
        id: 'email',
        display: 'Email',
        required: true,
        inputType: 'email',
    },
    phone: {
        id: 'phone',
        display: 'Phone',
        required: true,
        inputType: 'tel',
    },
    notes: {
        id: 'notes',
        display: 'Additional Notes',
        required: false,
        inputType: 'textarea',
    },
    needsDelivery: {
        id: 'needsDelivery',
        display: 'Do you require delivery? Leave unchecked for pickup in Northwest Calgary.',
        required: true,
        inputType: 'checkbox',
        disclaimer: ['Free pickup in Northwest Calgary, Alberta.', 'If you live outside of Calgary, we will contact you to confirm shipping arrangements. By continuing, you acknowledge that you are responsible for any shipping fees.'],
        checkedByDefault: false
    },
    streetAddress: {
        id: 'streetAddress',
        display: 'Street Address',
        required: true,
        inputType: 'text',
        dependsOn: 'needsDelivery',
    },
    city: {
        id: 'city',
        display: 'City',
        required: true,
        inputType: 'text',
        dependsOn: 'needsDelivery',
    },
    province: {
        id: 'provinceState',
        display: 'Province / State',
        required: true,
        inputType: 'text',
        dependsOn: 'needsDelivery',
    },
    postalZipCode: {
        id: 'postalZipCode',
        display: 'Postal / Zip Code',
        required: true,
        inputType: 'text',
        dependsOn: 'needsDelivery',
    },
}

// 🔹 Define Schema with Zod
export const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email format"),
    phone: z.string().min(10, "Phone number is required"),
    notes: z.string().optional(),
    needsDelivery: z.boolean(),
    streetAddress: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    postalZipCode: z.string().optional(),
});

// 🔹 Infer Type from Schema
export type FormDataType = z.infer<typeof formSchema>;
