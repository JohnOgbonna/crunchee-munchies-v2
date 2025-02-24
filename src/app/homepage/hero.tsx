import { chinChin750Hero as heroImage } from "../data/images";
import Image from "next/image";

export default function Hero() {
    return (
        <div className="bg-[#f5e3c5]">
            <div className={`p-4 flex flex-col items-center justify-center gap-4 mb-4 md:flex-row md:flex-wrap min-h-[400px] md:max-h-[700px] max-w-[1440px] mx-auto`}>
                <h2 className="font-bold text-[1.3rem] self-start md:text-[1.6rem] mb-4 md:w-full">Crunchee Munchies</h2>
                <Image
                    src={heroImage}
                    alt="chinChinHero"
                    className={`h-[50vh] min-h-[300px] max-h-[400px]`}
                    width={0}
                    height={0}
                    style ={ {width: "auto", height: "auto"} }
                    sizes="100vw"
                />
                <h1 className={`text-[1.1rem] md:text-[1.3rem] lg:text-[1.6rem]`}>Chin-Chin. The Staple African Snack. Perfected.</h1>
            </div>
        </div>
    )
}