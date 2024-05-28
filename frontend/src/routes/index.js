import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import AdminPanel from "../pages/adminpanel/Adminpanel";
import AllUsers from "../pages/Alluser/AllUsers";
import AllProducts from "../pages/allproducts/AllProducts";

const router = createBrowserRouter([
    {
        path:"",
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"sign-up",
                element:<Signup/>
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    }
                ]
            },
            
        ]
    }
])

export default router