import { InstagramIFrame } from "../components/supporting_components/connect/instagramiFrame";
import EmailIcon from "../components/supporting_components/icons/email";
import InstagramIcon from "../components/supporting_components/icons/instagram";
import TikTokIcon from "../components/supporting_components/icons/tikTok";
import { customerField } from "./customerFields";

export const ConnectFormFields: { [key: string]: customerField } = {
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
        required: false,
        inputType: 'tel',
    },
    message: {
        id: 'message',
        display: 'What would you like to ask or tell us?',
        required: true,
        inputType: 'textarea',
    },
    preferedResponseType: {
        id: 'preferedResponseType',
        display: 'How would you prefer to be contacted?',
        required: true,
        inputType: 'radio',
        listOptions: {
            email: {
                id: 'emailOption',
                display: 'Email',
                checkedByDefault: true,
                dependsOn: 'email'
            },
            phone: {
                id: 'phoneOption',
                display: 'Phone',
                checkedByDefault: false,
                dependsOn: 'phone'
            }
        }
    }
}

export const connectContent = {
    socialMedia: {
        header: 'Connect With Us on Social Media!',
        networks: {
            instagram: {
                name: 'Instagram',
                description: 'Follow us on Instagram!',
                link: 'https://www.instagram.com/crunchee_munchies/',
                iframe: InstagramIFrame,
                icon: InstagramIcon
            },
            tikTok: {
                name: 'TikTok',
                description: 'Follow us on TikTok!',
                link: 'https://www.tiktok.com/@crunchee.munchies',
                icon: TikTokIcon
            }
        }
    },
    contactForm: {
        header: 'Send Us a Message',
        description: 'Send us a message here and we will get back to you as soon as possible!',
        formFields: ConnectFormFields,

    },
    email: {
        header: 'Or, Email Us!',
        email: `mailto: ${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`,
        icon: EmailIcon
    }
}
