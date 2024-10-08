import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import AdminPanel from "../pages/adminpanel/Adminpanel";
import AllUsers from "../pages/Alluser/AllUsers";
import AllProducts from "../pages/allproducts/AllProducts";
// import CategoryProduct from "../pages/CategoryProduct/CategoryProduct";
import ProductDetail from "../pages/productdetail/ProductDetail";
import Cart from "../pages/cart/Cart";
import SearchProduct from "../pages/searchproduct/SearchProduct";
import About from "../pages/about/About";
import ProductFilter from "../pages/filter/ProductFilter";
import SuccessPage from "../pages/successpaymentpage/SuccessPage";
import CancelPage from "../pages/cancelpaymentPage/CancelPage";
import OrderPage from "../pages/orderpage/OrderPage";
import AllOrder from "../pages/allorders/AllOrder";

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
               path:"ProductFilter",
               element:<ProductFilter/>

            },
            {
                path:"login",
                element:<Login/>
            },
            {
               path:"about",
               element:<About/>
            },
            {
                path:"sign-up",
                element:<Signup/>
            },
            {
               path:"product/:id",
               element:<ProductDetail/>
            },
            {
            path:"cart",
            element:<Cart/>
            },
            {
                path :"Success",
                element:<SuccessPage/>
            },
            {
                path :"Cancel",
                element:<CancelPage/>
            },
            {
                path:"orders",
                element:<OrderPage/>
            },
            {
              path:"search",
              element:<SearchProduct/>
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
                    },
                    {
                        path : "all-orders",
                        element : <AllOrder/>
                    }
                ]
            },
            
        ]
    }
])

export default router