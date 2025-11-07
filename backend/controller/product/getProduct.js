const  productModel = require('../../models/ProductModels')

const getProduct = async(req,res)=>{
    try {
        const allproduct = await productModel.find().sort({ createdAt : -1 })
        res.status(200).json({
            message: "all product",
            error: false,
            success: true,
            data : allproduct
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false
        });
    }
}

module.exports=getProduct