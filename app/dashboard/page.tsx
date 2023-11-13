
import Post from "@/components/Post"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import{ redirect } from "next/navigation"
import { TPost } from "../types"
import Image from "next/image"


const getPosts = async(email: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${email}`);
    const { posts } = await res.json();
    return posts; 
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function DashBoard() {

  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  let posts = [];

  if(!session) {
    redirect("/sign-in");
  }

  if(email) {
    posts = await getPosts(email);
  }

  return (
    <div>
      <h1 className="flex text-blue-800">My Posts<Image src="https://em-content.zobj.net/source/apple/354/scroll_1f4dc.png" className="ml-1 mb-1" width={20} height={8} alt="dashboard-img"/></h1>
      {posts && posts.length > 0 ? (
        posts.map((post: TPost) => 
          <Post 
            key={post.id}
            id={post.id}
            author={""}
            authorEmail={post.authorEmail}
            date={post.createdAt}
            thumbnail={post.imageUrl}
            category={post.catName}
            title={post.title}
            content={post.content}
            links={post.links || []} 
          />)
      ) : (
          <div className="py-6">
            No posts created yet.{" "} 
            <Link className="underline" href={"/create-post"}>Create New</Link>
          </div>
      )}
    </div>
  )
}
