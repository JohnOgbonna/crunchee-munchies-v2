import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { connectContent, ContactFormData } from "@/app/data/connectContent";
import { sendMessage } from "@/app/actions/sendMessage";

const commonFieldStyles = `focus:outline-none focus:ring-none focus:border-2 focus:border-blue-500`;

export default function ContactFormSection() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const preferredContact = watch("preferedResponseType"); // Watch radio selection

    const onSubmit = async (data: typeof connectContent.contactForm.formFields) => {
    const formData: ContactFormData
     = {
        message: data.message.display,
        preferedResponseType: data.preferedResponseType.listOptions?.email.checkedByDefault ? "email" : "phone",
        firstName: data.firstName.display,
        email: data.email.display,
        lastName: data.lastName ? data.lastName.display : undefined,
        phone: data.phone ? data.phone.display : undefined,
    };

    const response = await sendMessage(formData);
    
    if ('error' in response) {
        toast.error(response.error as unknown as string);
    } else if ('message' in response) {
        toast.success(response.message as unknown as string);
    } else {
        // Handle the case where neither 'error' nor 'message' exists
        toast.error('An unknown error occurred.');
    }
};
    

    return (
        <section className="max-w-[800px] mx-auto pb-11">
            <Toaster richColors position="top-center" closeButton={true} />
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
                                                value={option.id}
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
