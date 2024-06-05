import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getPost } from "./api/posts";
import PostsList1 from "./PostsList1";
import PostsList2 from "./PostsList2";
import Post from "./Post";
import CreatePost from "./CreatePost";
// import PostListInfinite from "./PostListInfinite";
// import PostListPaginated from "./PostListPaginated";

const App = () => {
  const [currentPage, setCurrentPage] = useState<React.ReactNode>(undefined);
  const queryClient = useQueryClient();

  // Just to pass the setCurrentPage
  useEffect(() => {
    setCurrentPage(<PostsList1 setCurrentPage={setCurrentPage}/>)
  }, []) 

  function onHoverPostOneLink() {
    // Pre-fetching
    queryClient.prefetchQuery({
      queryKey: ["posts", 1],
      queryFn: () => getPost(1),
    })
  }

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostsList1 setCurrentPage={setCurrentPage}/>)}>
        Posts List 1
      </button>
      <button onClick={() => setCurrentPage(<PostsList2 setCurrentPage={setCurrentPage}/>)}>
        Posts List 2
      </button>
      <button
        onMouseEnter={onHoverPostOneLink}
        onClick={() => setCurrentPage(<Post id={1} />)}
      >
        First Post
      </button>
      <button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }
      >
        New Post
      </button>
      {/* <button onClick={() => setCurrentPage(<PostListPaginated />)}>
        Post List Paginated
      </button>
      <button onClick={() => setCurrentPage(<PostListInfinite />)}>
        Post List Infinite
      </button> */}
      <br />
      <div className="pt-5">
        {currentPage}
      </div>
    </div>
  )
}

export default App;
