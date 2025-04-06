const LoadingItems = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-slate-700 font-bold">Loading</h2>
            <div className="flex justify-center items-center gap-1 mt-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0s]"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
        </div>
    );
};

export default LoadingItems;
