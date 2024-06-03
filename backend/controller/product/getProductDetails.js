const productModel = require("../../models/ProductModels")

const getProductDetail =async (req,res)=>{
    try {
        const {productId} = req.body 
        const product = await productModel.findById(productId);

        res.json({
            data:product,
            message:"get product success",
            success:true,
            error:false
        })
    } catch (error) {
        res.json({
            message:error||error,
            success:false,
            error:true
        })
    }
}
module.exports=getProductDetail