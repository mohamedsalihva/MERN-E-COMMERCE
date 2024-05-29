const express = require ('express')

const router = express.Router()



const userSignUpController = require('../controller/userSignup')
const userSignInController = require('../controller/userSignin')
const userDetailsController = require("../controller/userDetail")
const AuthToken = require('../middleware/AuthToken')
const userLogout = require('../controller/userLogout')
const AllUsersController =require('../controller/allUser')
const updateUserController = require('../controller/UpdateUser')

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",AuthToken,userDetailsController)
router.get("/userLogout",userLogout)
router.get("/all-user",AuthToken,AllUsersController)
router.put("/update-user",AuthToken,updateUserController)

module.exports =router