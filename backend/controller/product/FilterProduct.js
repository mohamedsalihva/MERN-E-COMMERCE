const Product = require("../../models/ProductModels")

const filterProduct=async(req,res)=>{
try {
    const categoryList =req.body?.category
    const product =await Product.find({
        category:{
            "$in":categoryList
        }
    })
    res.json({
        data:product,
        message:"product",
        error:false,
        success:true
    })
} catch (error) {
    res.json({
        message: error.message||error,
        error:true,
        success:false
    })
}
}
module.exports=filterProduct