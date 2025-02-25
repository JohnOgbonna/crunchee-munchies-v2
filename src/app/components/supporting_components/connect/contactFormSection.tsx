import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { connectContent } from "@/app/data/connectContent";

const commonFieldStyles = `focus:outline-none focus:ring-none focus:border-2 focus:border-blue-500`;

export default function ContactFormSection() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    const onSubmit = (data: typeof connectContent.contactForm.formFields) => {
        console.log("Form submitted:", data);
        toast.success("Message sent successfully!");
    };

    const handleErrors = () => {
        Object.keys(errors).forEach((field) => {
            toast.error(`${field} is required.`);
        });
    };

    return (
        <section className="max-w-[800px] mx-auto pb-11">
            <h2 className="text-2xl font-bold text-center mb-4 underline">
                {connectContent.contactForm.header}
            </h2>
            <p className="text-center mb-4">{connectContent.contactForm.description}</p>

            <form
                onSubmit={handleSubmit(onSubmit, handleErrors)}
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
                                                {...register(field.id, { required: field.required })}
                                                id={option.id}
                                                defaultChecked={option.checkedByDefault}
                                            />
                                            <span>{option.display}</span>
                                        </label>
                                    ))}
                            </div>
                        ) : field.inputType === "textarea" ? (
                            <textarea
                                id={field.id}
                                {...register(field.id, { required: field.required })}
                                className={`p-2 border rounded-md ${commonFieldStyles} h-[100px]`}
                            />
                        ) : (
                            <input
                                type={field.inputType}
                                id={field.id}
                                {...register(field.id, { required: field.required })}
                                className={`p-2 border rounded-md ${commonFieldStyles}`}
                            />
                        )}
                    </div>
                ))}

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
