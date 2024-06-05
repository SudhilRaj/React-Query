import { useQuery } from "@tanstack/react-query";
import Post from "./Post";
import { getPosts } from "./api/posts";

interface Post {
   id: number;
   title: string;
}

interface PostsList1Props {
   setCurrentPage?: Function;
}

const PostsList1 = ({ setCurrentPage }: PostsList1Props) => {
   const postsQuery = useQuery({
      queryKey: ["posts"],
      queryFn: (obj) => getPosts(obj),
      placeholderData: [{ id: 1, title: "Initial Data" }],
   })
   
   if (postsQuery.isLoading) return <h1>Loading...</h1>
   if (postsQuery.isError) {
      return <h1>{JSON.stringify(postsQuery.error.message)}</h1>
   }

   const goToDetails = (id: number) => {
      if (setCurrentPage) setCurrentPage(<Post id={id} />)
   }

   return (
      <div>
         <h1>Posts List 1</h1>
         <ol>
            {postsQuery.data.map((post: Post)  => (
               <div key={post.id} className="flex flex-row items-center justify-between mb-2">
                  <li>{post.title}</li>
                  <button onClick={() => goToDetails(post.id)}>Details</button>
               </div>
            ))}
         </ol>
      </div>
   )
}

export default PostsList1;
