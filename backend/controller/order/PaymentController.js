const stripe = require("../../config/stripe");
const userModel = require("../../models/userModel");

const paymentController = async (req, res) => {
  try {
    const { cartItems } = req.body;

    const user = await userModel.findOne({ _id: req.userId });

    // Stripe session creation parameters
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: 'auto',
      shipping_options: [
        {
          shipping_rate: "shr_1Ps1wg2LLCNUx5nYYsq3pIJi"
        }
      ],
      customer_email: user.email,
      metadata:{
        userId : req.userId
      },
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.productId.productName,
            images: [item.productId.productImage[0]], 
            metadata: {
              productId: item.productId._id
            }
          },
          unit_amount: item.productId.sellingPrice * 100 
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1
        },
        quantity: item.quantity
      })),
      success_url: `${process.env.FRONTEND_URL}/Success`,
      cancel_url: `${process.env.FRONTEND_URL}/Cancel`
    };

  
    const session = await stripe.checkout.sessions.create(params);
    

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = paymentController;
