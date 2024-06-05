// Some errors are here! Need to correct.

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPostsPaginated } from "./api/posts";

interface Post {
  id: number;
  title: string;
}

interface PaginatedPosts {
  nextPage?: number;
  previousPage?: number;
  posts: Post[];
  total?: number; // Optional total count property
}

const PostListPaginated = () => {
  const [page, setPage] = useState(1);

  const { isLoading, isError, error, data } = useQuery<PaginatedPosts, Error>({
    queryKey: ["posts", { page }],
    keepPreviousData: true,
    queryFn: () => getPostsPaginated(page),
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <>
      <h1>
        Post List Paginated
        <br />
        <small>{data?.isPlaceholderData && "Previous Data"}</small>
      </h1>
      {data?.posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      {data?.previousPage && (
        <button onClick={() => setPage(data.previousPage)}>Previous</button>
      )}
      {data?.total && data.nextPage && data.total > data.posts.length && (
        <button onClick={() => setPage(data.nextPage)}>Next</button>
      )}
    </>
  );
};

export default PostListPaginated;