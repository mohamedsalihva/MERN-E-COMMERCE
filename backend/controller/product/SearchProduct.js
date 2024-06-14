const productModel = require("../../models/ProductModels")

const SearchProduct = async (req,res) =>{
    try {
        const query = req.query.q
        const regex = new RegExp (query,'i','g')

        const product = await productModel.find({
            "$or":[
                {
                    productName:regex
                   
                },
                {
                    category:regex
                }
            ]
    })
    res.json({
        data:product,
        message:"serach product",
        success:true,
        error:false
    })
    } catch (error) {
        res.json({
            message:error?.message||error,
            success:false,
            error:true
        })
    }
}
module.exports =SearchProduct