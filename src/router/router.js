import About from "../pages/About";
import Login from "../pages/Login";
import Post from "../pages/Post";
import PostIdPage from "../pages/PostIdPage";


export const privateRoutes = [
    {path: '/about', element: <About />, exact: true},
    {path: '/posts', element: <Post />, exact: true},
    {path: '/posts/:id', element: <PostIdPage />, exact: true}
]

export const publicRoutes = [
    {path: '/login', element: <Login />, exact: true},
]

