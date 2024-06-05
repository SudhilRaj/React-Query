import { useQuery } from "@tanstack/react-query";
import Post from "./Post";
import { getPosts } from "./api/posts";

interface Post {
   id: number;
   title: string;
}

const PostsList2 = ({ setCurrentPage }: {setCurrentPage: Function}) => {
   const postsQuery = useQuery({
      queryKey: ["posts"],
      queryFn: getPosts,
   })

   if (postsQuery.isLoading) return <h1>Loading...</h1>
   if (postsQuery.isError) {
      return <h1>{JSON.stringify(postsQuery.error)}</h1>
   }
   // if (postsQuery.status === "loading") return <h1>Loading...</h1>
   // if (postsQuery.status === "error") {
   //    return <h1>{JSON.stringify(postsQuery.error)}</h1>
   // }

   return (
      <div>
         <h1>Post List 2</h1>
         <ol>
            {postsQuery.data.map((post: Post)  => (
               <div key={post.id} className="flex flex-row items-center justify-between mb-2">
                  <li>{post.title}</li>
                  <button onClick={() =>setCurrentPage(<Post id={post.id} />)}>
                     Details
                  </button>
               </div>
            ))}
         </ol>
      </div>
   )
}


export default PostsList2;