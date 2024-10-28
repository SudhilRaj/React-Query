# Tanstack Query (Formerly known as React Query)

In order to run this project you need to start both the client and the server(API).

<b>NOTE: For better undertanding of the Performance and Caching behaviour you can throttle the network speed to Slow 3G, and use the integrated ```react-query-devtools``` to understand the query/mutation flow.</b>

## Start Client
```cd client```

```npm run dev```

## Start Server
```cd server```

```npm start```

## About React Query
- Data fetching is fairly simple, managing the asynchronous state is difficult!
- React Query is a powerful asynchronous state management tool/library!
- React query is a library that simplifies the way we fetch, cache and synchronize data.
- React itself has no opinion about how we fetch data - We can use native browser ```fetch``` API or ```axios``` or anything. In order to do this type of normal data fetching we also need the hooks like ```useState``` and ```UseEffect```.
- It is difficult to manage when we have the requirements like caching, retries, etc. React Query handles all these caching, retries, invalidation and much more out of the box. 
- There are many other features like Auto Refetching, Parallel Queries, Dependent Queries, Infinite scroll, Offline Support, Window Focus Refetching, Scroll Recovery, Offline Support, Request Cancellation, Mutations API etc

## Key Concepts 
### 1) ```useQuery```
- It is one of the most important hook in React Query to fetch and manage some data from a server.
- We can choose any fetching logic (fetch, axios) it needs to have a promise.
- ```useQuery``` must needs a ```queryKey``` and a ```queryFn```.

Example:
```
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios
        .get('https://api.github.com/repos/tannerlinsley/react-query')
        .then((res) => res.data),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? 'Updating...' : ''}</div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(<App />)
```

 There are many other optional params that we can add to the ```useQuery``` such as ```staleTime```, ```gcTime```, ```refetchOnWindowFocus```, etc
 #### ```staleTime```
- Providing a stale time not actually refetch a query. Stale queries are refethed automatically in the background when few things are happened:
    - When the new instance of the query is mounted
    - When the window is re-focused
    - When the network is re-connected
    - On the provided ```refetchInterval```
- We can provide a default ```staleTime``` that applies to all the queries/mutations in the main ```queryClient``` declaration
  
```const queryClient = new QueryClient({defaultOptions: {queries: {stateTime: 6000}}})```

#### ```gcTime``` - Garbage Collection Time (Cache Time)
- By default 5 minutes
  
```const queryClient = new QueryClient({defaultOptions: {queries: {stateTime: 6000, gcTime: 10*(60*1000)}}})```

#### ```refetchOnWindowFocus```
- ```true``` by default

#### ```retry```
- By default 3
- We can provide a ```retryDelay``` also


### 2) ```useMutation```
- To update the state of a server
- There should be a ```mutationFn```
- There different mutation life cycles for ```useMutation```: ```onMutate```, ```onError```, ```onSuccess```, ```onSettled```

Example:
```
const createPostMutation = useMutation({
      mutationFn: createPost,
      // mutationFn: (variables) => createPost(variables),
      // The above mentioned variables is the exact same values we are passing to the mutate function of useMutation
      // It is the default first paramter, so we dont need to pass it explicitly!
      onSuccess: data => {
         queryClient.setQueryData(["posts", data.id], data)
         queryClient.invalidateQueries({ queryKey: ['posts']})
      },
      onMutate: (variables) => {}, // onMutate will be called before the mutationFn
      onError: (error, variables, context) => {},
      onSettled: (data, error, variables, context) => {},
   })

const BASE_URL = "http://localhost:3000/";
const axiosInstance = axios.create({baseURL: BASE_URL});

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

Now we can use the actual mutate function from the createPostMutation to update the data
createPostMutation.mutate({
    title: titleRef.current.value,
    body: bodyRef.current.value,
 });

We can also access the other states such as error and pending.
```


### 3) ```Parallel Queries```

### 4) ```Dependent Queries```
- One query depends the other
- Based on the ```enabled``` parameter

### 5) ```useInfiniteQuery```


Read the official docs <a href="https://tanstack.com/query/latest/docs/framework/react/overview" target="_blank"><b>here</b></a> for more details

<!-- <h3>:fire:<a href="https://srk-weatherapp.netlify.app/" target="_blank"><b>Live Demo</b></a>:fire:</h3> -->
