const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl text-slate-700 font-bold mb-4">Loading Shop</h1>
            <div className="flex space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300"></div>
            </div>
        </div>
    );
};

export default Loading;
