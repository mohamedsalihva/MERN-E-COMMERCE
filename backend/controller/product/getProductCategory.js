const productModel = require("../../models/ProductModels");

const getProductCategory = async (req, res) => {
    try {
        // Step 1: Get all distinct categories
        const categories = await productModel.distinct("category");
        console.log("categories:", categories);

        // Step 2: Initialize an empty array to hold products by category
        const productsByCategory = [];

        // Step 3: Loop through each category and get products for each
        for (const category of categories) {
            const products = await productModel.find({ category: category });
            productsByCategory.push({
                category: category,
                products: products
            });
        }

        // Step 4: Send the response with products grouped by category
        res.status(200).json({
            data: productsByCategory,
            error: false,
            success: true
        });
    } catch (error) {
        // Step 5: Handle any errors
        res.status(400).json({
            message: error.message || "An error occurred",
            error: true,
            success: false
        });
    }
};

module.exports = getProductCategory;
