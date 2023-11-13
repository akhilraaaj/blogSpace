/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface PostProps {
    id: string;
    author: string;
    date: string;
    thumbnail?: string;
    authorEmail?: string;
    title: string;
    content: string;
    links?: string[];
    category?: string;
}

export default async function Post({ id, author, date, thumbnail, authorEmail, title, content, links, category } : PostProps ) {
  
  const session = await getServerSession(authOptions);

  const isEditable = session && session?.user?.email === authorEmail;  

  const dateObject = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  return (
    <div className="my-4 border-b border-b-300 py-8">
        <div className="mb-4">
            { author ? (<div className="flex">Posted by: <span className="font-bold ml-2 mr-1">{author}</span> on {formattedDate}<Image src="https://em-content.zobj.net/source/apple/354/pushpin_1f4cc.png" className="ml-2" width={20} height={18} alt="posted-img"/></div>) :
              (<>Posted on {formattedDate}</>)
            }
        </div>
        <div className="w-full h-80 relative">
            {thumbnail ? 
              (<Image className="object-cover rounded-md object-center" src={thumbnail} alt={title} fill />) : 
                (<Image className="object-cover rounded-md object-center" src={"/thumbnail-placeholder.png"} alt="title" fill /> )
            } 
        </div>
        {category && <Link className="bg-slate-800 w-fit text-white px-4 py-0.5 text-sm font-bold rounded-md mt-4 block border border-slate-700" href={`categories/${category}`}>{category}</Link>}
        <h2 className="text-[#62A388] font-bolder">{title}</h2>
        <p className="content font-Poppins">{content}</p>

        {links && (
            <div className="my-4 flex flex-col gap-3">
                {links.map((link, i) => (<div key={i} className="flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                    <Link className="link" href={link}>{link}</Link>
                </div>))}
            </div>

        )}

        {isEditable && (
            <div className="btn first-letter:flex gap-3 font-bold py-2 px-4 rounded-md w-fit">
                <Link href={`/edit-post/${id}`}>Edit</Link>
                <DeleteButton id={id} />
            </div>
        )}

    </div>
  )
}
