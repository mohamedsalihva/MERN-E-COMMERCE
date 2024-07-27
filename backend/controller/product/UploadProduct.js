const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/ProductModels");

async function uploadProduct(req, res) {
    try {
        const sessionUserId = req.userId;

       
        if (!uploadProductPermission(sessionUserId)) {
            return res.status(403).json({
                message: "User does not have permission to upload product",
                error: true,
                success: false
            });
        }

      
        const uploadProduct = new productModel(req.body);
        const saveProduct = await uploadProduct.save();

       
        res.status(201).json({
            message: "Product uploaded successfully",
            error: false,
            success: true,
            data: saveProduct
        });
    } catch (error) {
       
        res.status(400).json({
            message: error.message || err,
            error: true,
            success: false
        });
    }
}


module.exports = uploadProduct;
