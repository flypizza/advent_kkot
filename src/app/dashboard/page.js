"use client";
import React, {useEffect, useState } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import app from "../utils/firebaseConfig"

import AddItem from "../components/AddItem"
import ListItems from "../components/ListItems"

function DashboardPage(){
    const auth = getAuth();
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user);
            } else{
                router.push("/");
            }
        });

        return () => unsubscribe();
    }, [auth, router]);

    const handleLogout = async ()=>{
        try{
            await signOut(auth);
            router.push("/");   
        } catch(error){
            console.error("Error signing out :",error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">
                    Welcome to the Dashboard, {user ? user.displayName : "Guest"}!
                </h1>
                <AddItem></AddItem>
                <ListItems/>      


                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        LogOut
                    </button>
            </div>
        </div>
    );
}

export default DashboardPage;