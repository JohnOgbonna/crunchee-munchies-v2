'use client'
import { signOut } from "@/app/lib/cognitoAuth";


const SignOut = () => {
    setTimeout(() => {
        signOut();
        window.location.href = '/admin';
    }, 700);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-slate-800">
            <h1 className="text-2xl font-bold mb-4">Signing Out...</h1>
        </div>
    );
};
export default SignOut