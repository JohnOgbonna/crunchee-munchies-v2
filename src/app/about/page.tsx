'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { aboutUsContent } from '../data/aboutUsContent';
import type { AboutUsSection, BasicListSection, BasicQuoteSection, HeroSection, TopicSection } from '../typesAndInterfaces/aboutTypes';
import { delayedFadeInAnimationVariants } from '../data/ui';
import Image from 'next/image';


const AboutUs = () => {
    return (
        <div className={`mx-auto text-slate-700 bg-[#f5e3c5]`}>
            <div className={``}>
                <motion.h1 className="text-3xl font-bold py-4 pl-4 max-w-[1440px] mx-auto"
                    variants={{
                        hidden: { opacity: .01, x: -155 },
                        visible: { opacity: 1, x: 0 }
                    }}
                    initial="hidden"
                    whileInView={"visible"}
                    transition={{ duration: 0.5, delay: 0.7, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}
                >About Us
                </motion.h1>
                <div className="mx-auto ">
                    {Object.entries(aboutUsContent).map(([key, section]) => (
                        <SectionRenderer key={key} section={section} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const SectionRenderer = ({ section }: { section: AboutUsSection }) => {
    switch (section.type) {
        case 'hero':
            return <HeroSection section={section} />;
        case 'topic':
            return <TopicSection section={section} />;
        case 'basicList':
            return <BasicListSection section={section} />;
        case 'basicQuote':
            return <QuoteSection section={section} />;
        default:
            return null;
    }
};

const HeroSection = ({ section }: { section: HeroSection }) => (
    <motion.div className="p-4 w-full max-w-[1440px] mx-auto"
        variants={{
            hidden: { opacity: .01, y: 155 },
            visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        whileInView={"visible"}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}
    >
        <h2 className="text-2xl font-bold text-primary">{section.title}</h2>
        <motion.p className='italic text-xl font-semibold text-center py-32 md:py-48'
            variants={{
                hidden: { opacity: .01, x: -155 },
                visible: { opacity: 1, x: 0 }
            }}
            initial="hidden"
            whileInView={"visible"}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.7, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}
        >{`" ${section.quote} "`}</motion.p>
        <div className={`md:flex gap-4 md:justify-center items-center w-full lg:gap-16`}>
            <p className="text-lg text-gray-700 mb-8 md:w-1/2 lg:w-[40%]">{section.description}</p>
            <motion.div className="flex justify-center w-[400px] sm:mx-auto lg:w-[500px]"
                variants={{
                    hidden: { opacity: .01, x: 155 },
                    visible: { opacity: 1, x: 0 }
                }}
                initial="hidden"
                whileInView={"visible"}
                transition={{ duration: 0.4, delay: 1.2, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}
            >
                <Image src={section.image} alt={section.title} 
                 width={0}
                 height={0}
                 style ={ {width: "auto", height: "auto"} }
                 sizes="100vw"
                />
            </motion.div>
        </div>
    </motion.div>
);

const TopicSection = ({ section }: { section: TopicSection }) => (
    <div className='bg-[#faf0e0]'>
        <div className='p-4 w-full max-w-[1440px] mx-auto'>
            <motion.h2 className="text-3xl font-semibold text-primary mb-6"
                variants={{
                    hidden: { opacity: .01, x: -155 },
                    visible: { opacity: 1, x: 0 }
                }}
                initial="hidden"
                whileInView={"visible"}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}
            >{section.title}</motion.h2>
            <motion.p className={`text-xl italic mb-8 sm:text-center`}
                variants={{
                    hidden: { opacity: .01, x: -155 },
                    visible: { opacity: 1, x: 0 }
                }}
                initial="hidden"
                whileInView={"visible"}
                transition={{
                    duration: 0.7, delay: 1.3, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" }
                }}
            >{section.description}</motion.p>
            <div className="flex flex-col md:flex-row sm:space-y-4 w-full md:space-x-4 md:overflow-x-scroll scrollbar-hide md:p-2 md:min-h-[700px] md:items-center">
                {Object.entries(section.subSections).map(([key, item], index) => (
                    <Link href={item.link as string} key={key} className="md:hover:scale-105 transition-all duration-300">
                        <motion.div key={key} className="p-4 border rounded-lg shadow-md bg-[#f5e3c5]"
                            variants={delayedFadeInAnimationVariants}
                            initial="initial"
                            whileInView={"animate"}
                            custom={index}
                            viewport={{ once: true }}
                        >
                            <div className="w-[90vw] mx-auto sm:max-h-[280px] max-w-[400px] min-w-[300px] md:max-h-[300px] md:w-[400px] lg:w-[400px] flex justify-center items-center">
                                <Image
                                    src={item.image as string}
                                    alt={key}
                                    className="max-w-[350px] h-[200px] object-contain rounded-lg"
                                    width={0}
                                    height={0}
                                    style ={ {width: "auto", height: "200px"} }
                                    sizes="100vw"
                                    objectFit='contain'
                                />
                            </div>
                            <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
                            <p className="text-gray-600 mt-2 md:line-clamp-3 hover:line-clamp-none">{item.description}</p>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
);

const BasicListSection = ({ section }: { section: BasicListSection }) => {
    const endMessage = section.title === "What We're Planning" ? "Stay tuned, we've got much more to come!" : "We're just getting started!";
    return (
        <div className='p-4 max-w-[1440px] mx-auto'>
            <motion.h2 className="text-3xl font-semibold text-primary mb-6"
                variants={{
                    hidden: { opacity: .01, x: -155 },
                    visible: { opacity: 1, x: 0 }
                }}
                initial="hidden"
                whileInView={"visible"}
                transition={{ duration: 0.5, delay: 0.7, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}
            >{section.title}</motion.h2>
            <ul className="space-y-4">
                {Object.entries(section.listItems).map(([key, item], index) => (
                    <li key={key} className="p-4 min-h-[400px] md:min-h-[450px] md:text-[1.25rem] flex flex-col justify-center italic max-w-[600px] lg:max-w-[700px] text-center mx-auto md:hover:scale-105 transition-all duration-300">
                        <motion.div
                            variants={{
                                hidden: { opacity: .01, x: (-1) ** index * 155 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            initial="hidden"
                            whileInView={"visible"}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 1, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}
                        >
                            <h3 className="text-lg font-semibold md:text-[1.3rem]">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </motion.div>
                    </li>
                ))}
            </ul>
            <motion.p className='text-center text-xl md:text-2xl italic font-semibold p-6'
                variants={{
                    hidden: { opacity: .01, x: -155 },
                    visible: { opacity: 1, x: 0 }
                }}
                initial="hidden"
                viewport={{ once: true }}
                whileInView={"visible"}
                transition={{ duration: 0.5, delay: 0.7, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}
            >{endMessage}</motion.p>
        </div>
    )
};

const QuoteSection = ({ section }: { section: BasicQuoteSection }) => (
    <div className='bg-[#faf0e0]'>
        <div className="text-center italic text-xl md:text-2xl text-gray-700 p-6 max-w-[1440px] min-h-[400px] h-[100vh] max-h-[1000px] flex flex-col justify-center mx-auto">
            <div className='md:hover:scale-105 transition-all duration-300'>
                <motion.p className='max-w-[800px] lg:max-w-[900px] mx-auto'
                    variants={{
                        hidden: { opacity: 0, x: -300 },
                        visible: { opacity: 1, x: 0 }
                    }}
                    initial="hidden"
                    whileInView={"visible"}
                    transition={{ duration: 1, delay: 1.2, ease: "easeInOut", x: { type: "spring", stiffness: 30 }, opacity: { duration: .8, delay: 0.2, ease: "easeInOut" } }}
                >“ {section.description} ”</motion.p>
            </div>
        </div>
    </div>
);

export default AboutUs;
