const uploadProductPermission = require("../../helpers/permission");
const  productModel = require("../../models/ProductModels");

async function UpdateProduct  (req,res){
try {

    if (!uploadProductPermission(req.userId)) {
        return res.status(403).json({
            message: "User does not have permission to upload product",
            error: true,
            success: false
        });
    }

    const { _id, ...resBody} = req.body
  const UpdateProduct =await productModel.findByIdAndUpdate(_id,resBody)
   
  res.status(200).json({
    message:"product updated successfully",
    data:UpdateProduct,
    success:true,
    error:false
  })
    
} catch (error) {
    res.status(400).json({
        message: error.message || err,
        error: true,
        success: false
    });
}
}
module.exports=UpdateProduct