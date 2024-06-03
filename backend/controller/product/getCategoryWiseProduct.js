const productModel = require("../../models/ProductModels");

const getCategoryWiseProduct = async (req, res) => {
    try {
        const { category } = req.body; // Assuming category is sent in the request body
        const products = await productModel.find({ category });

        res.status(200).json({
            message: "Products found",
            error: false,
            success: true,
            data: products
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || "Error retrieving products",
            error: true,
            success: false
        });
    }
};

module.exports = getCategoryWiseProduct;
