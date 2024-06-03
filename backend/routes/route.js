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

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",AuthToken,userDetailsController)
router.get("/userLogout",userLogout)
router.get("/all-user",AuthToken,AllUsersController)
router.put("/update-user",AuthToken,updateUserController)
router.post("/upload-product",AuthToken,uploadProduct)
router.get("/get-product",getProduct)
router.put("/update-product",AuthToken,UpdateProduct)
router.get("/get-ProductCategory",getProductCategory)
router.post("/category-product",CategoryWiseProduct)
router.post("/product-details",getproductDetails)

module.exports =router