import { connectContent } from "@/app/data/connectContent";

const commonFieldStyles = `focus:outline-none focus:ring-none focus:border-2 focus:border-blue-500`;
/**
 * Renders the contact form section of the webpage.
 * 
 * This section includes a header, a description, and a form
 * that allows users to send messages. The form dynamically
 * renders fields based on the configuration provided in
 * connectContent.contactForm.formFields. It supports various
 * input types such as text, email, textarea, and radio buttons.
 * 
 * The form's submit button is styled to match the primary
 * theme and is labeled "Send Message".
 */

export default function ContactFormSection() {
    return (
        <section className="max-w-[800px] mx-auto pb-11">
            <h2 className="text-2xl font-bold text-center mb-4 underline">
                {connectContent.contactForm.header}
            </h2>
            <p className="text-center mb-4">{connectContent.contactForm.description}</p>
            <form className="gap-y-4 flex flex-col items-center md:flex-row md:flex-wrap md:justify-center md:gap-x-2">
                {Object.values(connectContent.contactForm.formFields).map((field) => (
                    <div key={field.id} className={`flex flex-col w-full sm:max-w-[450px] md:${field.inputType === 'textarea' ? 'max-w-[600px]' : 'w-[45%]'}`}>
                        <label className="font-medium" htmlFor={field.id}>{field.display}</label>
                        {field.inputType === 'radio' ? (
                            <div className="flex gap-4">
                                {field.listOptions && Object.values(field.listOptions).map((option) => (
                                    <label key={option.id} className="flex items-center space-x-2">
                                        <input type="radio" name={field.id} id={option.id} defaultChecked={option.checkedByDefault} />
                                        <span>{option.display}</span>
                                    </label>
                                ))}
                            </div>
                        ) : field.inputType === 'textarea' ? (
                            <textarea id={field.id} className={`p-2 border rounded-md ${commonFieldStyles}`} required={field.required}></textarea>
                        ) : (
                            <input type={field.inputType} id={field.id} className={`p-2 border rounded-md ${commonFieldStyles}`} required={field.required} />
                        )}
                    </div>
                ))}
                <button type="submit" className="bg-primary py-2 px-4 rounded-md hover:bg-opacity-90">
                    Send Message
                </button>
            </form>
        </section>

    )
}