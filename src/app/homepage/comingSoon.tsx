
export default function ComingSoon() {
    return (
        <div>
            <div className={`p-4 flex flex-col items-center justify-center gap-4 mb-4 md:flex-row md:flex-wrap min-h-[400px] h-[70vh] md:max-h-[600px] w-full max-w-[1440px] mx-auto lg:min-h-[500px]`}>
                <h1 className="font-bold text-[1.3rem] self-start md:text-[1.6rem] w-full">Coming Soon!</h1>
                <div className="w-full flex flex-col items-center justify-center lg:text-[1.2rem]">
                    <h2 className="font-bold mb-2 italic w-full max-w-[600px]">We've got a lot more in store! Here is just some of what we have planned:</h2> 
                </div>                
            </div>
        </div>
    )
}