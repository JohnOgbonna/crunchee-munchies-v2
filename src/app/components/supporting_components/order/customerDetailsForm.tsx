"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { customerFields, FormDataType, formSchema } from "@/app/data/customerFields";
import { useOrderContext } from "@/app/context/OrderContext";
import { item, itemId, itemSizeVariation } from "@/app/typesAndInterfaces/orderTypes";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useOrderSubmitContext } from "@/app/context/OrderSubmitContext";
import SuspenseLoader from "../suspenseLoader";
import { useState } from "react";
import { handleOrderSubmission } from "./handleOrderSubmission";


interface CustomerDetailsFormProps {
    item: itemId;
    items: Record<string, item> | undefined;
}

const CustomerDetailsForm = ({ item, items }: CustomerDetailsFormProps) => {
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
    const [isLoading, setLoading] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const { setCustomerData, setFormSubmitted } = useOrderSubmitContext();

    const handleOrderSuccess = (name: string, email: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("item");

        // ✅ Replace history
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });

        // ✅ Update state after navigation
        setTimeout(() => {
            setCustomerData({ name, email });
            setFormSubmitted(true);
        }, 100); // Delay ensures state updates don't interfere
    };


    const onSubmit = async (data: FormDataType) => {
        await handleOrderSubmission(
            data,
            item,
            items,
            orders,
            removeOrder,
            handleOrderSuccess,
            reset,
            setLoading,
            toast as (message: string, options?: { error?: boolean } | undefined) => void
        );
    };

    const watchedValues = watch();
    const selectedSizeVariants: Record<string, itemSizeVariation> = {};
    const selectedItem = items?.[item] || null;

    if (selectedItem) {
        selectedItem.size_variants?.forEach((sizeVariant) => {
            if (orders[item]?.variations?.[sizeVariant.id]) {
                selectedSizeVariants[sizeVariant.id] = sizeVariant;
            }
        });
    }
    const pickUpOnlyOrder = Object.values(selectedSizeVariants).some((sizeVariant) => sizeVariant.pickupOnly);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border-t-[1px] mt-4 py-4">
            <Toaster richColors position="bottom-center" closeButton={true} />
            <SuspenseLoader isLoading={isLoading} type="order" />
            <p className="text-[12px] text-red-600 italic">Note: We prepare and package every order individually. Once we approve your order, we will send you a follow up email and the details about how you can pick up your order and make payment.</p>

            {pickUpOnlyOrder &&
                <div>
                    {
                        <p className="text-[12px] text-red-600 italic">Note: This order is only available for pick up because of these items:</p>}
                    {Object.values(selectedSizeVariants).map((sizeVariant) => {
                        if (sizeVariant.pickupOnly) {
                            return <p key={sizeVariant.id} className="text-[12px] text-red-600 italic mt-[2px]">{`- ${sizeVariant.name}`}</p>
                        }
                    })}
                </div>
            }
            <h3 className="text-lg font-semibold">Your Information</h3>

            {Object.values(customerFields).map((field) => {
                if (field.dependsOn && !watchedValues[field.dependsOn as keyof FormDataType]) return null;
                if (field.id === "needsDelivery" && pickUpOnlyOrder) return null
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
            {
                pickUpOnlyOrder &&
                <p className="text-[14px] text-red-600 italic">Please note that this order is only available for pick up in North West Calgary.</p>
            }

            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 sm:block sm:mx-auto">
                Submit Order
            </button>
        </form>
    );
};

export default CustomerDetailsForm;
