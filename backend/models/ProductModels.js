const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number
});

const productSchema = mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [String], 
    description: String,
    price: Number,
    sellingPrice: Number,
    ratings: [ratingSchema] 
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
