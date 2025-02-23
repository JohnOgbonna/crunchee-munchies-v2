import Link from 'next/link';
import { connectContent } from '../data/connectContent';

export default function Connect() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Social Media Section */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-4">
          {connectContent.socialMedia.header}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(connectContent.socialMedia.networks).map((network) => (
            <div
              key={network.name}
              className="p-4 border rounded-lg shadow-md flex flex-col items-center space-y-2"
            >
              <network.icon size={24} />
              <h3 className="text-lg font-semibold">{network.name}</h3>
              <p className="text-center text-sm">{network.description}</p>
              <Link
                href={network.link}
                target="_blank"
                className="text-primary hover:underline"
              >
                Visit {network.name}
              </Link>
              {'iframe' in network && network.iframe && <network.iframe />}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-4">
          {connectContent.contactForm.header}
        </h2>
        <p className="text-center mb-4">{connectContent.contactForm.description}</p>
        <form className="space-y-4">
          {Object.values(connectContent.contactForm.formFields).map((field) => (
            <div key={field.id} className="flex flex-col">
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
                <textarea id={field.id} className="p-2 border rounded-md" required={field.required}></textarea>
              ) : (
                <input type={field.inputType} id={field.id} className="p-2 border rounded-md" required={field.required} />
              )}
            </div>
          ))}
          <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90">
            Send Message
          </button>
        </form>
      </section>

      {/* Email Section */}
      <section className="text-center">
        <h2 className="text-xl font-bold">{connectContent.email.header}</h2>
        <Link href={connectContent.email.email} className="text-primary hover:underline flex items-center justify-center gap-2 mt-2">
          <connectContent.email.icon size={24} />
          {process.env.NEXT_PUBLIC_EMAIL_ADDRESS}
        </Link>
      </section>
    </div>
  );
}
