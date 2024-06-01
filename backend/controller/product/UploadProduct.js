const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/ProductModels");

async function uploadProduct(req, res) {
    try {
        const sessionUserId = req.userId;

        // Check if user has permission to upload product
        if (!uploadProductPermission(sessionUserId)) {
            return res.status(403).json({
                message: "User does not have permission to upload product",
                error: true,
                success: false
            });
        }

        // Create and save the new product
        const uploadProduct = new productModel(req.body);
        const saveProduct = await uploadProduct.save();

        // Respond with success message
        res.status(201).json({
            message: "Product uploaded successfully",
            error: false,
            success: true,
            data: saveProduct
        });
    } catch (error) {
        // Catch any errors and respond with appropriate message
        res.status(400).json({
            message: error.message || err,
            error: true,
            success: false
        });
    }
}


module.exports = uploadProduct;
