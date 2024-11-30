'use client'

import Image from "next/image";
import GoogleLoginButton from "./components/GoogleLoginButton";



export default function Home() {
  return (
    <div className="bg-white h-screen w-screen text-black flex flex-col justify-center items-center">
      <h1>Next Js fire base fire store</h1>
      <GoogleLoginButton></GoogleLoginButton>

    </div>
  );
}