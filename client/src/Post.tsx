import { getPost } from "./api/posts";
import { getUser } from "./api/users";
import { useQuery } from "@tanstack/react-query";

// interface Post {
//    id: number;
//    title: string;
// }
// interface PostsQuery {
//    status: 'loading' | 'error' | 'success';
//    data?: Post[];
//    error?: { message: string };
// }

const Post = ({ id }: {id: number}) => {
   const postQuery = useQuery({
      queryKey: ["posts", id],
      queryFn: () => getPost(id),
   })

   const userQuery = useQuery({
      queryKey: ["users", postQuery?.data?.userId],
      enabled: postQuery?.data?.userId !== null,
      queryFn: () => getUser(postQuery.data.userId),
   })

   if (postQuery.isLoading) return <h1>Loading...</h1>
   if (postQuery.status === "error") {
      return <h1>{JSON.stringify(postQuery.error)}</h1>
   }

   return (
      <>
         <h1>
         {postQuery?.data?.title} <br />
         <small>
            {userQuery.isLoading
               ? "Loading User..."
               : userQuery.isError
               ? "Error Loading User"
               : userQuery?.data?.name}
         </small>
         </h1>
         <p>{postQuery?.data?.body}</p>
      </>
   )
}


export default Post;