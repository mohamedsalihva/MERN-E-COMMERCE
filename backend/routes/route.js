const express = require ('express')

const router = express.Router()


const userSignUpController = require('../controller/user/userSignup')
const userSignInController = require('../controller/user/userSignin')
const userDetailsController = require("../controller/user/userDetail")
const AuthToken = require('../middleware/AuthToken')
const userLogout = require('../controller/user/userLogout')
const AllUsersController =require('../controller/user/allUser')
const updateUserController = require('../controller/user/UpdateUser')
const uploadProduct = require('../controller/product/UploadProduct')
const getProduct = require('../controller/product/getProduct')
const UpdateProduct = require('../controller/product/UpdateProduct')
const getProductCategory = require ('../controller/product/getProductCategory')
const CategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getproductDetails = require('../controller/product/getProductDetails')
const addToCart = require('../controller/user/addToCart')
const countAddToCart = require ('../controller/user/countcart')
const  veiwCartProduct = require('../controller/user/addToCartVeiw')
const updatecart = require("../controller/user/updateAddtoCartProduct") 
const deletecart = require ("../controller/user/deleteCart")
const SearchProduct = require('../controller/product/SearchProduct')
const DeleteUser = require('../controller/user/DeleteUser')
const DeleteProduct = require('../controller/product/DeleteProduct')
const filterProduct = require('../controller/product/FilterProduct')
const paymentController = require('../controller/order/PaymentController')
const webhooks = require('../controller/order/webhook')
const orderController = require('../controller/order/OrderController')
const allOrderController = require('../controller/order/allorderController')





router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",AuthToken,userDetailsController)
router.get("/userLogout",userLogout)
router.get("/all-user",AuthToken,AllUsersController)
router.put("/update-user",AuthToken,updateUserController)
router.delete("/delete-user",AuthToken,DeleteUser)
router.post("/upload-product",AuthToken,uploadProduct)
router.get("/get-product",getProduct)
router.put("/update-product",AuthToken,UpdateProduct)
router.get("/ProductCategory",getProductCategory)
router.post("/category-product",CategoryWiseProduct)
router.get("/product-details",getproductDetails)
router.post("/add-to-cart",AuthToken,addToCart)
router.get("/countAddToCart",AuthToken,countAddToCart)
router.get("/view-cart-product",AuthToken,veiwCartProduct)
router.put("/update-cartProduct",AuthToken,updatecart)
router.delete("/delete-cart",AuthToken,deletecart)
router.get("/search",SearchProduct)
router.delete("/delete-product",AuthToken,DeleteProduct)
router.post("/filter-product",filterProduct)


// payment
router.post("/checkout",AuthToken,paymentController)
router.post("/webhook",webhooks)
router.get("/order-list",AuthToken,orderController)
router.get("/all-orders",AuthToken,allOrderController)

module.exports=router