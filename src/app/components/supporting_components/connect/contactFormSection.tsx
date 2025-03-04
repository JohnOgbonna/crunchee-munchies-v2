'use client';

import { set, useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { connectContent, formData } from "@/app/data/connectContent";
import { sendMessage } from "@/app/actions/sendMessage";
import { BaseSyntheticEvent, useState } from "react";
import Confirmation from "../confirmation";
import SuspenseLoader from "../suspenseLoader";

const commonFieldStyles = `focus:outline-none focus:ring-none focus:border-2 focus:border-blue-500`;

export default function ContactFormSection() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm();

    const preferredContact = watch("preferedResponseType"); // Watch radio selection
    const [messageSubmitted, setMessageSubmitted] = useState(false);
    const [customerData, setCustomerData] = useState<{ name: string, email: string }>({ name: '', email: '' });
    const [isLoading, setIsLoading] = useState(false);


    const handleSummaryClose = () => {
        setMessageSubmitted(false);
        setCustomerData({ name: '', email: '' });
    }

    const onSubmit = async (data: Record<string, string>, e?: BaseSyntheticEvent) => {
        e?.preventDefault();
        setIsLoading(true);
        const formData: formData = {
            message: data.message,
            preferedResponseType: data.preferedResponseType as formData["preferedResponseType"], // Directly use the selected value
            firstName: data.firstName,
            email: data.email,
            lastName: data.lastName || undefined,
            phone: data.phone || undefined, // Ensure phone is only included when provided
        };
        try {
            const response = await sendMessage(formData);
    
            if (!response) {
                throw new Error("No response from server");
            }
    
            if (response.error) {
                toast.error(response.error.toString());
            } else if (response.message) {
                setMessageSubmitted(true);
                setCustomerData({ name: formData.firstName, email: formData.email });
                reset();
            } else {
                throw new Error("Unexpected response format.");
            }
        } catch (error) {
            console.error("Message submission error:", error);
            toast.error("Failed to send message. Please try again.");
        } finally{
            setIsLoading(false);
        }
    };

    return (
        <section className="max-w-[800px] mx-auto pb-11" id = "contact_message">
            <Toaster richColors position="top-center" closeButton={true} />
            <SuspenseLoader isLoading={isLoading} type = "message" />    
           { messageSubmitted && customerData.name && <Confirmation type="message" customerData={{ name: "", email: "" }} handleClose={handleSummaryClose} />}
            <h2 className="text-2xl font-bold text-center mb-4 underline">
                {connectContent.contactForm.header}
            </h2>
            <p className="text-center mb-4">{connectContent.contactForm.description}</p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="gap-y-4 flex flex-col items-center md:flex-row md:flex-wrap md:justify-center md:gap-x-2 lg:gap-x-4"
            >
                {Object.values(connectContent.contactForm.formFields).map((field) => (
                    <div
                        key={field.id}
                        className={`flex flex-col w-full sm:max-w-[450px] ${field.inputType !== "textarea" ? "md:w-[45%]" : "md:max-w-[600px]"
                            }`}
                    >
                        <label className="font-medium" htmlFor={field.id}>
                            {field.display}
                        </label>

                        {field.inputType === "radio" ? (
                            <div className="flex gap-4">
                                {field.listOptions &&
                                    Object.values(field.listOptions).map((option) => (
                                        <label key={option.id} className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                {...register(field.id, { required: "Please select a contact method" })}
                                                id={option.id}
                                                value={option.value}
                                                defaultChecked={option.checkedByDefault}
                                            />
                                            <span>{option.display}</span>
                                        </label>
                                    ))}
                            </div>
                        ) : field.inputType === "textarea" ? (
                            <textarea
                                id={field.id}
                                {...register(field.id, {
                                    required: field.required ? "This field is required" : false,
                                    minLength: { value: 3, message: "Minimum 3 characters required" },
                                    maxLength: { value: 500, message: "Maximum 500 characters" },
                                })}
                                className={`p-2 border rounded-md ${commonFieldStyles} h-[100px]`}
                            />
                        ) : (
                            <input
                                type={field.inputType}
                                id={field.id}
                                {...register(field.id, {
                                    required: field.required ? "This field is required" : false,
                                    minLength:
                                        field.inputType === "text"
                                            ? { value: 3, message: "Minimum 3 characters required" }
                                            : undefined,
                                    pattern:
                                        field.inputType === "email"
                                            ? {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Invalid email format",
                                            }
                                            : field.inputType === "tel"
                                                ? {
                                                    value: /^\+?[0-9]{10,14}$/,
                                                    message: "Invalid phone number format",
                                                }
                                                : undefined,
                                })}
                                className={`p-2 border rounded-md ${commonFieldStyles}`}
                            />
                        )}

                        {errors[field.id] && (
                            <p className="text-red-500 text-sm mt-1">{errors[field.id]?.message?.toString()}</p>
                        )}
                    </div>
                ))}

                {/* Phone Required if Preferred Contact is Phone */}
                {preferredContact === "phoneOption" && (
                    <div className="w-full sm:max-w-[450px]">
                        <label className="font-medium" htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            {...register("phone", {
                                required: "Phone number is required if you prefer phone contact.",
                                pattern: {
                                    value: /^\+?[0-9]{10,14}$/,
                                    message: "Invalid phone number format",
                                },
                            })}
                            className={`p-2 border rounded-md ${commonFieldStyles} w-full`}
                        />
                        {errors.phone?.message && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone.message.toString()}</p>
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    className="bg-primary py-2 px-4 rounded-md hover:bg-opacity-90 text-white bg-blue-500"
                >
                    Send Message
                </button>
            </form>
        </section>
    );
}
