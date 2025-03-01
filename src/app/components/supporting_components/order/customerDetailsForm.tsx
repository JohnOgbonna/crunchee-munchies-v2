"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import { customerFields } from "@/app/data/customerFields";
import { useOrderContext } from "@/app/context/OrderContext";
import { itemId } from "@/app/typesAndInterfaces/orderTypes";
import { submitOrder } from "@/app/actions/submitOrder";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useOrderSubmitContext } from "@/app/context/OrderSubmitContext";

// 🔹 Define Schema with Zod
const formSchema = z.object({
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

interface CustomerDetailsFormProps {
    item: itemId;
}

const CustomerDetailsForm = ({ item }: CustomerDetailsFormProps) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<FormDataType>({
        resolver: zodResolver(formSchema),
    });

    const { orders, removeOrder } = useOrderContext();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const { setCustomerData, setFormSubmitted } = useOrderSubmitContext();
    const handleOrderSuccess = (name: string, email: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("item");

        // ✅ Replace history entry instead of pushing
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });

        // ✅ Update state after navigation
        setTimeout(() => {
            setCustomerData({ name, email });
            setFormSubmitted(true);
        }, 100); // Delay ensures state updates don't interfere

        toast.success("Order submitted successfully!");
    };

    // ✅ Clear the form properly after successful submission
    const onSubmit = async (data: FormDataType) => {
        const order = { item, ...orders[item] };
        try {
            const response = await submitOrder(data, order);

            if (response?.error) {
                toast.error(`Order failed: ${response.error}`);
            } else if (response) {
                handleOrderSuccess(data.firstName, data.email);

                setTimeout(() => {
                    reset(); // ✅ Clear form safely after updates
                    removeOrder(item);
                }, 150);
            } else {
                toast.error("An unknown error occurred.");
            }
        } catch (error) {
            toast.error(`Order failed: ${error}`);
        }
    };

    const watchedValues = watch();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border-t-[1px] mt-4 py-4">
            <Toaster richColors position="top-center" closeButton={true} />
            <p className="text-[12px] text-red-600 italic">Note: we prepare and package every order individually. Once we approve your order, we will send you a follow up email and the details about how you can pick up your order and make payment.</p>
            <h3 className="text-lg font-semibold">Your Information</h3>

            {Object.values(customerFields).map((field) => {
                if (field.dependsOn && !watchedValues[field.dependsOn as keyof FormDataType]) return null;

                return (
                    <div key={field.id} className="flex flex-col">
                        {field.inputType !== "checkbox" && (
                            <label htmlFor={field.id} className="font-medium">
                                {field.display} {field.required && "*"}
                            </label>
                        )}

                        {field.inputType === "checkbox" ? (
                            <div className="flex  gap-2 mt-4 mb-2">
                                <input
                                    type="checkbox"
                                    id={field.id}
                                    {...register(field.id as keyof FormDataType)}
                                    className="w-5 h-5 focus:ring-blue-500 mt-[1px]"
                                />
                                <span>{field.display}</span>
                            </div>
                        ) : field.inputType === "textarea" ? (
                            <textarea
                                id={field.id}
                                {...register(field.id as keyof FormDataType)}
                                placeholder={field.placeholder || `Enter any ${field.display}`}
                                className="border-2 p-2 rounded focus:border-blue-500 h-[100px] md:h-[150px] focus:ring-0 focus:outline-none"
                            />
                        ) : (
                            <input
                                type={field.inputType}
                                id={field.id}
                                {...register(field.id as keyof FormDataType)}
                                placeholder={field.placeholder || `Enter your ${field.display}`}
                                className="border-2 p-2 rounded focus:border-blue-500 focus:ring-0 focus:outline-none"
                            />
                        )}

                        {/* Error Messages */}
                        {errors[field.id as keyof FormDataType] && (
                            <p className="text-sm text-red-500">
                                {errors[field.id as keyof FormDataType]?.message}
                            </p>
                        )}

                        {/* Disclaimer */}
                        {field.disclaimer && (
                            <div>
                                {field.disclaimer.map((disclaimerItem, index) => (
                                    <p key={index} className="text-sm text-red-500">
                                        {disclaimerItem}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}

            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 sm:block sm:mx-auto">
                Submit Order
            </button>
        </form>
    );
};

export default CustomerDetailsForm;
