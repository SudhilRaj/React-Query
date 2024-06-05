import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Post from "./Post";
import { createPost } from "./api/posts";

const CreatePost = ({ setCurrentPage }: {setCurrentPage: Function}) => {
   const titleRef = useRef<HTMLInputElement>(null);
   const bodyRef = useRef<HTMLInputElement>(null);
   const queryClient = useQueryClient()
   const createPostMutation = useMutation({
      mutationFn: createPost,
      // mutationFn: (variables) => createPost(variables),
      // The above mentioned variables is the exact same values we are passing to the mutate function of useMutation
      // It is the default first paramter, so we dont need to pass it explicitly!
      onSuccess: data => {
         queryClient.setQueryData(["posts", data.id], data)
         // queryClient.setQueryData(["posts", data.id], (oldData => ...oldData, data))
         queryClient.invalidateQueries({ queryKey: ['posts']})
         // queryClient.invalidateQueries({ queryKey: ['posts'], exact})
         // queryClient.invalidateQueries(["posts"], { exact: true })
         setCurrentPage(<Post id={data.id} />)
      },
      // Other main functions
      // onMutate: (variables) => {}, // onMutate will be called before the mutationFn
      // onError: (error, variables, context) => {},
      // onSettled: (data, error, variables, context) => {},
   })

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (titleRef.current && bodyRef.current) {
         createPostMutation.mutate({
            title: titleRef.current.value,
            body: bodyRef.current.value,
         });
      }
   }

   return (
      <div>
         {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
         <h1>Create Post</h1>
         <form onSubmit={handleSubmit}>
            <div className="mb-3">
               <label htmlFor="title" className="me-2">Title</label>
               <input id="title" ref={titleRef} className="h-[30px] text-black p-2 outline-none rounded-lg"/>
            </div>
            <div className="mb-3">
               <label htmlFor="body" className="me-2">Body</label>
               <input id="body" ref={bodyRef} className="h-[30px] text-black p-2 outline-none rounded-lg"/>
            </div>
            <button disabled={createPostMutation.isPending}>
               {createPostMutation.isPending ? "Loading..." : "Create"}
            </button>
         </form>
      </div>
   )
}


export default CreatePost;