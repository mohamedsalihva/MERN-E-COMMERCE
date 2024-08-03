const productModel = require("../../models/ProductModels");
const getProductDetail = async (req, res) => {
    try {
        const { productId } = req.query;
        const userId = req.userId; // Ensure this is set by your AuthToken middleware

        console.log('Received request with productId:', productId, 'and userId:', userId);

        const product = await productModel.findById(productId).lean();

        if (!product) {
            console.error('Product not found for productId:', productId);
            return res.status(404).json({
                message: "Product not found",
                success: false,
                error: true
            });
        }

        console.log('Fetched product data:', product);

        if (!product.ratings) {
            product.ratings = [];
        }

        const userRating = product.ratings.find(r => r.userId.toString() === userId);

        res.json({
            data: {
                ...product,
                userRating: userRating ? userRating.rating : null
            },
            message: "Get product success",
            success: true,
            error: false
        });
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
};
module.exports=getProductDetail