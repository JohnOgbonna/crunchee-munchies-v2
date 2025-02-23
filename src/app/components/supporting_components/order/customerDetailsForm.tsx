'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';
import { customerFields } from '@/app/data/customerFields';

// 🔹 Define Schema with Zod
const formSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email format'),
    phone: z.string().min(10, 'Phone number is required'),
    notes: z.string().optional(),
    needsDelivery: z.boolean(),
    streetAddress: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    postalZipCode: z.string().optional(),
});

// 🔹 Infer Type from Schema
type FormDataType = z.infer<typeof formSchema>;

const CustomerDetailsForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormDataType>({
        resolver: zodResolver(formSchema),
    });

    // Watch the needsDelivery field for conditional rendering
    const needsDelivery = watch('needsDelivery');

    const onSubmit = (data: FormDataType) => {
        toast.success('Form submitted successfully!');
        console.log('Submitted data:', data);
    };
    const watchedValues = watch(); // ✅ Move watch outside the map
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border-t-[1px] mt-4 py-4">
            <h3 className="text-lg font-semibold">Your Information</h3>

            {Object.values(customerFields).map((field) => {
                if (field.dependsOn && !watchedValues[field.dependsOn as keyof FormDataType]) return null; // ✅ Use watchedValues

                return (
                    <div key={field.id} className="flex flex-col">

                        {
                            field.inputType !== 'checkbox' &&
                            <label htmlFor={field.id} className="font-medium">
                                {field.display} {field.required && '*'}
                            </label>
                        }

                        {field.inputType === 'checkbox' ? (
                            <div className="flex items-center gap-2 mt-4 mb-2">
                                <input
                                    type="checkbox"
                                    id={field.id}
                                    {...register(field.id as keyof FormDataType)}
                                    className="w-5 h-5 focus:ring-blue-500"
                                />
                                <span>{field.display}</span>
                            </div>
                        ) : field.inputType === 'textarea' ? (
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
