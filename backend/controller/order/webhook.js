
const stripe = require('../../config/stripe');
const orderModel = require('../../models/OrderProductModel');

const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

async function getLineItems(lineItems){
let productItems =[]
if(lineItems?.data?.length){
  for(const item of lineItems.data){
   const product =await stripe.products.retrive(item.price.product)
   const productId = product.metadata.productId
   const productData ={
    productId:productId,
    name:product.name,
    price:item.price.unit_amount/100,
    quantity:item.quantity,
    image:product.image
   }
   productItems.push(productData)
  }
}
return productItems
}

const webhooks = async(req,res)=>{
    const sig = req.headers['Stripe-Signature'];

    const PayloadString =JSON.stringify(req.body)
    
const header = stripe.webhooks.generateTestHeaderString({
    payload: PayloadString,
    secret :endpointSecret,
  });
  
    
  let event;

  try {
    event = stripe.webhooks.constructEvent(PayloadString, header, endpointSecret);
  }
  catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log("session:",session);
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      console.log("Line items:", lineItems);
      const productDetails = await getLineItems(lineItems)
       
   const orderDetails={
          productDetails:productDetails,
          email : session.customer_email,
          userId : session.metadata.userId,

          paymentDetails:{
            paymentId : session.payment_intent,
            payment_method_type : session.payment_method_types,
            payment_status : session.payment_status,
        },
        shipping_options : session. shipping_options,
        totalAmount : session.amount_total
   }

   const order = await orderModel(orderDetails)
   const saveOrder = await order.save()

      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
res.status(200).send();

}

module.exports =webhooks;