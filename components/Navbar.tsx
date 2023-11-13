/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import Image from 'next/image'
import { useEffect, useRef, useState } from "react"
import DarkModeButton from "./DarkMode"


const Navbar = () => {

  const { status, data: session } = useSession(); 
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if(popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsPopupVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    if(!isPopupVisible) {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    }

  }, [isPopupVisible]);
  


  return (
    <div className="flex justify-between pb-4 border-b mb-4 relative">
      <div>
        <Link href={"/"} className="flex">
          <h1 className="text-dark text-4xl font-bold tracking-lighter">BlogSpace</h1>
          <Image style={{ marginTop: '-5px' }} className="mb-3 ml-2" src="/blogging.png" width={40} height={40} alt="icon" />
        </Link>
        <p className="flex font-semibold">Create. Explore. Expand. Conquer.<Image src="https://em-content.zobj.net/source/apple/354/hundred-points_1f4af.png" className="ml-2" width={25} height={15} alt="posted-img"/></p>
      </div>
      
      {status === 'authenticated' ?  (
        <>
          <div ref={popupRef} className={`absolute z-30 right-0 top-20 bg-white text-black p-6 shadow-lg rounded-md flex-col gap-2 text-right min-w-[160px]
            ${isPopupVisible ? "flex" : "hidden"}`}

          >
            <div className="flex flex-row-reverse items-center font-bold"><Image src="https://em-content.zobj.net/source/apple/354/bust-in-silhouette_1f464.png" className="ml-1 mb-1" width={18} height={5} alt="user-img"/>{session?.user?.name}</div>
            <div className="text-red-400 font-bold">{session?.user?.email}</div>
            <Link className="flex flex-row-reverse items-center hover:underline font-semibold text-[#62A388]" onClick={() => setIsPopupVisible(false)} href={"/dashboard"}><Image src="https://em-content.zobj.net/source/apple/354/scroll_1f4dc.png" className="ml-1 mb-1" width={18} height={5} alt="dashboard-img"/>DashBoard</Link>
            <Link className="flex flex-row-reverse items-center hover:underline font-semibold text-[#62A388]" onClick={() => setIsPopupVisible(false)} href={"/create-post"}><Image src="https://em-content.zobj.net/source/apple/354/pencil_270f-fe0f.png" className="ml-1 mb-1" width={18} height={5} alt="create-img"/>Create Post</Link>
            <button onClick={() => signOut()} className="rounded-md p-2 bg-gray-800 text-white">Sign Out</button>
          </div>
          <div className="flex gap-2 items-center">
            <Link className="hidden md:flex gap-2 items-center mr-6 mb-4" href={'/create-post'}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span className="flex font-semibold">Create Post<Image src="https://em-content.zobj.net/source/apple/354/pencil_270f-fe0f.png" className="ml-1 mb-1" width={18} height={5} alt="create-img"/></span>
            </Link>
            <div>
            <Image src={session?.user?.image || ""} width={36} height={36} alt="Profile Image" onClick={() => setIsPopupVisible((prev) => !prev)} className="flex rounded-full cursor-pointer mb-4" />
            <DarkModeButton />
            </div>
          </div>
        </>  
      ) : ( 
        <div>
          <Link className="flex btn" href={"/sign-in"}>
            Sign In
          </Link>
          <DarkModeButton />
        </div>
      ) }

      
    </div>
  )
}

export default Navbar