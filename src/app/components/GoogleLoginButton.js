'use client'
import { useState, useEffect } from "react"
import app from "../utils/firebaseConfig";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Dashboard from "../dashboard/page";

const GoogleLoginButton = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(()=>{
        const auth = getAuth(app);
        const unsubscribe = auth.onAuthStateChanged((user)=>{
            if(user){
                setUser(user);
            }else{
                setUser(null);
            }
        });

        return ()=> unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        try{
            await signInWithPopup(auth, provider);
            router.push("/dashboard");
        } catch (error){
            console.error("Error signing in with Google:", error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {user? (
                // User is logged in , render dashboard or redirect to the dashboard
                <Dashboard/>
            ) : (
                // User is not logged in, render the login button
                <button
                    onClick={signInWithGoogle}
                    className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Sign In with Google
                </button>
            )}
        </div>
    );
};

export default GoogleLoginButton;