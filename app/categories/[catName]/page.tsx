import { TPost } from "@/app/types";
import Post from "@/components/Post";
import Image from "next/image"

const getPosts = async(catName: string): Promise<TPost[] | null> => {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories/${catName}`, { cache: "no-store" });
        if(res.ok) {
            const categories = await res.json();
            const posts = categories.posts;
            return posts;
        }
    } catch (error) {
        console.log(error);
    }
    return null;
}

export default async function CategoryPosts({ params, }: { params: { catName : string};}) {
    const category = params.catName;
    const posts = await getPosts(category);

    return (
        <>
          <h1 className="flex">
            <span className="flex font-semibold text-blue-900 mr-2">Category <Image src="https://em-content.zobj.net/source/apple/354/speech-balloon_1f4ac.png" className="ml-2 mr-2" width={30} height={15} alt="posted-img"/> : </span> {decodeURIComponent(category)}
          </h1>
          {posts && posts.length > 0 ? (
            posts.map((post: TPost) => 
            <Post 
                key={post.id}
                id={post.id}
                author={post.author.name}
                authorEmail={post.authorEmail}
                date={post.createdAt}
                thumbnail={post.imageUrl}
                category={post.catName}
                title={post.title}
                content={post.content}
                links={post.links || []} 
            />)
            ) : (
             <div className="py-6">No posts to display</div>
          )}
        </>
    )
}