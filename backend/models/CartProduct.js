const mongoose = require('mongoose')

const AddToCart = mongoose.Schema({
  productId : {
      ref : 'product',
      type :String,
  },
  quantity : Number,
  userId : String,

}, {
    timestamps: true
})

const AddToCartModel =mongoose.model("Cart",AddToCart)

module.exports =AddToCartModel