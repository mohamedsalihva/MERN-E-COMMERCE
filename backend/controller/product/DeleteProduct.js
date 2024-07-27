const productModel = require("../../models/ProductModels"); // Ensure the correct path
const userModel = require("../../models/userModel"); // Ensure the correct path

async function DeleteProduct(req, res) {
    const {_id} = req.body;
    const requestorId = req.userId; 

    try {
       
        let requestor = await userModel.findById(requestorId);
        if (!requestor || requestor.role !== 'ADMIN') {
            return res.status(403).json({
                message: "You do not have permission to delete products",
                error: true,
                success: false
            });
        }

        let result = await productModel.deleteOne({ _id });
        console.log("Delete Result:", result);

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            success: true,
            error: false
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({
            message: "Internal server error",
            error: true,
            success: false
        });
    }
}

module.exports = DeleteProduct;
