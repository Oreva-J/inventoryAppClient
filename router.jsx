import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import App from "./src/App";
import Contact from "./src/pages/home/Contact";
import ErrorPage from "./src/components/ErrorPage";
import Home from "./src/pages/home/Home";
import About from "./src/pages/home/About";
import Layout from "./src/pages/home/Layout";
import DashboardLayout from "./src/pages/dashboard/DashboardLayout";
import Profile from "./src/pages/profile/Profile";
import Dashboard from "./src/pages/dashboard/Dashboard";
import MuiDashboard from "./src/pages/muiDashboard/MuiDashboard";
import AdminMui from "./src/pages/admin/AdminMui";
import Register from "./src/pages/authPages/Register";
import Login from "./src/pages/authPages/Login";
import ResetPassword from "./src/pages/authPages/ResetPassword";
import Kanban from "./src/pages/productPages/Kanban";
import CreateProduct from "./src/pages/productPages/CreateProduct";


export const router = createBrowserRouter([
    {
        path: "dashboard/", 
        element: <DashboardLayout />, 
        errorElement: <ErrorPage />,
        children: [
            {path: "", element: <Dashboard />},
            {path: "profile", element: <Profile />},
            {path: "kanban", element: <Kanban />},
            {path: "createProduct", element: <CreateProduct />}
           
        ]
    },
    {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
        {path:"", element: <Home />},
        {path: "/about", element: <About />},
        {path: "/contact", element: <Contact />},

    ]

    },
    {
        path: "/admin",
        element: <AdminMui />,
        children: [
            {path: "", element: <AdminMui />},
        ]
    },
    {path:"/register", element: <Register />},
    {path:"/login", element: <Login />},
    {path:"/resetPassword", element: <ResetPassword />},
    
   
])