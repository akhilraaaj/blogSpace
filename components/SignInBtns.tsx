"use client";

import Image from "next/image";
import { signIn } from "next-auth/react"

function SignInBtns() {
  return (
    <div className="p-24">
      <h1 className="flex text-center justify-center font-bold text-red-500">Sign In<Image src="https://em-content.zobj.net/source/apple/354/dizzy_1f4ab.png" className="ml-2 mb-1" width={25} height={10} alt="dashboard-img"/></h1>
      <div className="mt-4 p-4 flex flex-col items-center justify-center gap-4">
        <button onClick={() => signIn("github")} className="flex items-center border p-4 rounded-full gap-4 hover:bg-slate-100/25 transition">
            <span>
                <Image src={"/github-logo.svg"} width={30} height={30} alt="GitHub logo" />
            </span>
            Sign In with GitHub
        </button>
        <button onClick={() => signIn("google")} className="flex items-center border p-4 rounded-full gap-4 hover:bg-slate-100/25 transition">
            <span>
                <Image src={"/google-logo.svg"} width={30} height={30} alt="Google logo" />
            </span>
            Sign In with Google
        </button>
      </div>
    </div>
  )
}

export default SignInBtns