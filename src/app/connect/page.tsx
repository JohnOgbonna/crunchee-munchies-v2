'use client';
import Link from 'next/link';
import { connectContent } from '../data/connectContent';
import SocialMediaSection from '../components/supporting_components/connect/socialMediaSection';
import ContactFormSection from '../components/supporting_components/connect/contactFormSection';
import {motion} from 'framer-motion';

export default function Connect() {
  return (
    <div className="max-w-[1440px] mx-auto p-4 space-y-20 text-slate-700">
      <motion.h1 className="text-3xl font-bold mb-4"
         variants={{
          hidden: { opacity: .01, x: -155 },
          visible: { opacity: 1, x: 0 }
      }}
      initial="hidden"
      whileInView={"visible"}
      transition={{ duration: 0.5, delay: 0.7, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}

      >Connect With Us</motion.h1>
      {/* Social Media Section */}
     <SocialMediaSection />
      {/* Contact Form Section */}
     <ContactFormSection />
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
