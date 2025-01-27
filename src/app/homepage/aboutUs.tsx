
export default function AboutUsHome() {
    return (
        <div className="bg-[#f5e3c5]">
            <div className={`p-4 flex flex-col items-center justify-center gap-4 mb-4 md:flex-row md:flex-wrap min-h-[400px] h-[70vh] md:max-h-[600px] w-full max-w-[1440px] mx-auto lg:min-h-[500px]`}>
                <h1 className="font-bold text-[1.3rem] self-start md:text-[1.6rem] w-full">Who We Are</h1>
                <div className="w-full flex flex-col items-center justify-center lg:text-[1.2rem]">
                    <h2 className="font-bold mb-2 italic w-full max-w-[600px]">We're a Homemade Company!</h2>
                    <p className="w-full max-w-[600px]">We beleive we make the best Chin-Chin in the world and we want to share it with you! And then with the world! With out refined recipie, we've recieved rave customer reviews. We're based in Calgary, Alberta and we're expanding our market!</p>
                </div>
                <a href="/" className="hover:underline">Learn More About Us!</a>
            </div>
        </div>
    )
}