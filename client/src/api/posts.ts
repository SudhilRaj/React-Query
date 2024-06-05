import axios from "axios";

const BASE_URL = "http://localhost:3000/";
const axiosInstance = axios.create({baseURL: BASE_URL});

export const getPosts = (obj: object) => {
   // We are not using any values from the obj object here. But it is possible to get the different values inside 
   // the queryFn including the queryKey. Also other values are available like AbortSignal.
   console.log(obj)

   return axiosInstance
      .get("posts", { params: { _sort: "title" } })
      .then(res => res.data)
}

export const getPostsPaginated = (page: number) => {
   return axiosInstance
      .get("posts", {
         params: { _page: page, _sort: "title", _limit: 2 },
      })
      .then(res => {
         // const hasNext = 12;
         console.log({res})
         const hasNext = page * 2 <= parseInt(res.headers["x-total-count"])
         return {
            nextPage: hasNext ? page + 1 : undefined,
            previousPage: page > 1 ? page - 1 : undefined,
            posts: res.data,
         }
      })
}

export const getPost = (id: number) => {
   return axiosInstance.get(`posts/${id}`).then(res => res.data)
}

export const createPost = ({ title, body }: {title: string, body: string }) => {
   return axiosInstance
      .post("posts", {
         title,
         body,
         userId: Math.floor(Math.random() * 5) + 1, // To assign a random user from the list of 5
         id: String(Date.now()),
      })
      .then(res => res.data)
}
