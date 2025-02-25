import { featuredItem } from "../typesAndInterfaces/orderTypes";
import FeaturedSlideShow from "../components/supporting_components/feature_slideshow";
import { buns1, possibleFlavors, worldWideShipping } from "../data/images";

const featuredSections: featuredItem[] = [
    {
        name: 'Crunchee Munchies Buns',
        description: 'Our original creation! Crispy on the outside, soft on the inside. Delicious inside and out!',
        link: '/',
        image: buns1
    },
    {
        name: 'All New Chin Chin Flavors',
        description: "We're expanding our original and timeless recipe to include more flavors! You won't want to miss what we'll have in store!", 
        link: '/',
        image: possibleFlavors
    },
    {
        name: 'Worldwide Shipping',
        description: "We're expanding our market! Right now, we offer shipping in Canada, but soon we'll be shipping to many countries around the world!",
        link: '/',
        image: worldWideShipping
    }
];

export default function ComingSoon() {
    return (
        <div>
            <div className={`p-4 flex flex-col gap-4 mb-4 min-h-[400px] h-[70vh] md:max-h-[600px] w-full max-w-[1440px] mx-auto lg:min-h-[500px]`}>
                <h1 className="font-bold text-[1.3rem] self-start md:text-[1.6rem] w-full">Coming Soon!</h1>
                <div className="w-full items-center justify-center lg:text-[1.2rem]">
                    <h2 className="mb-2 italic w-full max-w-[600px]">{"We've got a lot more in store! Here is just some of what we have planned:"}</h2> 
                </div>                
                {/* Featured Slideshow */}
                <FeaturedSlideShow sections={featuredSections} />
            </div>
        </div>
    );
}
