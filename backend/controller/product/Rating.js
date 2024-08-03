const Product = require('../../models/ProductModels');
const addRating = async (req, res) => {
    try {
        const { productId, rating, userId } = req.body;
        
        if (!productId || !rating || !userId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        const existingRating = product.ratings.find(r => r.userId.toString() === userId);
        if (existingRating) {
            existingRating.rating = rating;
        } else {
            product.ratings.push({ userId, rating });
        }
        
        await product.save();
        res.json({ message: 'Rating added successfully', success: true });
    } catch (error) {
        console.error('Error adding rating:', error);
        res.status(500).json({ message: error.message, success: false });
    }
};
module.exports=addRating