const AddToCartModel = require("../../models/CartProduct")


const AddToCart = async (req,res)=>{
try {
    const {productId} = req?.body
    const currentUser = req.userId

  const isproductavailable = await AddToCartModel.findOne({productId,userId : currentUser})

  if(isproductavailable){
    return res.json({
        message : "already exists",
        success:false,
        error:true
    })
  }

    const  payload ={
        productId : productId,
        quantity : 1,
        userId : currentUser,

    }

    const newcart = new AddToCartModel(payload)
    const saveproduct = await newcart.save()

    console.log("saveproduct:",saveproduct)

   return res.json({
        data:saveproduct,
        message:"product added to cart",
        success:true,
        error:false
    })

} catch (error) {
    res.json({
        message:error?.message || err,
        error:true,
        success:false
    })
}
}
module.exports =AddToCart