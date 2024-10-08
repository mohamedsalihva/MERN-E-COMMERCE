import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../../common';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Context from '../../context/context';
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.addToCartVeiw.url, {
        method: SummaryApi.addToCartVeiw.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
      });
      const responseData = await response.json();

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateCart = async (id, newQty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        _id: id,
        quantity: newQty
      })
    });
    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const deleteCartItem = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          _id: id,
        })
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
        context.fetchUserAddToCart();
        toast.success(responseData.message);

      } else {
        toast.error("Error deleting item:", responseData.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const increaseCart = (id, qty) => {
    updateCart(id, qty + 1);
  };

  const decreaseCart = (id, qty) => {
    if (qty > 1) {
      updateCart(id, qty - 1);
    }
  };
 const handlePayment =async()=>{

  const stripePromise =await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

      const response = await fetch(SummaryApi.payment.url,{
        method:SummaryApi.payment.method,
        credentials:'include',
        headers: {
          "content-type": "application/json"
        },
        body:JSON.stringify({
          cartItems:data
        })
      })
      const DataResponse = await response.json()
      if(DataResponse?.id){
        stripePromise.redirectToCheckout({sessionId :DataResponse.id})
      }
      console.log("DataResponsepayment:",DataResponse)
 }

  return (
    <div className='container mx-auto mt-20 ml-10'>
      <div className='text-center text-lg my-3'>
        {data.length === 0 && !loading && (
          <p className='bg-white py-5 rounded-md shadow-sm'>No Data</p>
        )}
      </div>

      <div className='flex flex-col lg:flex-row gap-8 lg:justify-between p-4'>
        <div className='w-full max-w-3xl'>
          {loading ? (
            loadingCart.map((_, index) => (
              <div key={index} className='w-full bg-gray-200 h-40 my-2 border border-gray-300 animate-pulse rounded-md'></div>
            ))
          ) : (
            data.map((product) => (
              <div key={product?._id} className='w-full bg-white h-min my-2 border border-gray-300 rounded-md flex shadow-sm'>
                <div className='w-40 h-full bg-gray-200 rounded-l-md flex-shrink-0'>
                  {product?.productId?.productImage && product.productId.productImage.length > 0 && (
                    <img
                      src={product.productId.productImage[0]}
                      className='w-full h-full object-contain rounded-l-md'
                      style={{ maxHeight: '150px', maxWidth: '150px' }}  
                      alt={product?.productId?.productName || 'Product Image'}
                    />
                  )}
                </div>

                <div className='px-4 py-2 flex-grow flex flex-col justify-between'>
                  <div>
                    <h2 className='text-lg font-semibold text-gray-800 break-words'>{product?.productId?.productName || 'Product Name Not Available'}</h2>
                    <p className='text-sm text-gray-500 capitalize'>{product?.productId?.category || 'Category Not Available'}</p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className='text-red-600 font-medium text-lg'>₹{product?.productId?.sellingPrice?.toFixed(2) || 'Price Not Available'}</p>
                    <p className='text-gray-600 font-semibold text-lg'>₹{((product?.productId?.sellingPrice || 0) * product?.quantity).toFixed(2)}</p>
                  </div>
                  <div className='flex items-center gap-2 mt-1'>
                    <button
                      className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-8 h-8 flex justify-center items-center rounded-md'
                      onClick={() => decreaseCart(product._id, product.quantity)}
                    >
                      -
                    </button>
                    <span className='w-8 text-center'>{product?.quantity}</span>
                    <button
                      className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-8 h-8 flex justify-center items-center rounded-md'
                      onClick={() => increaseCart(product._id, product.quantity)}
                    >
                      +
                    </button>
                    <button
                      className='border border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white w-8 h-8 flex justify-center items-center rounded-md'
                      onClick={() => deleteCartItem(product._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
         {
          data[0] && (
        <div className='mt-5 lg:mt-0 w-full max-w-sm mr-20'>
          {loading ? (
            <div className='h-36 bg-gray-200 border border-gray-300 animate-pulse rounded-md'></div>
          ) : (
            <div className='bg-white rounded-md shadow-sm p-4'>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>Summary</h2>
              <div className='flex items-center justify-between text-lg text-gray-600 mb-2'>
                <p>Quantity</p>
                <p>{data.reduce((total, item) => total + item.quantity, 0)}</p>
              </div>
              <div className='flex items-center justify-between text-lg text-gray-600 mb-4'>
                <p>Total Price</p>
                <p>₹{data.reduce((total, item) => total + (item.productId?.sellingPrice * item.quantity), 0).toFixed(2)}</p>
              </div>
              <button className='bg-blue-600 text-white py-2 rounded-md w-full'onClick={handlePayment}>Proceed to Payment</button>
            </div>
          )}
        </div>
          )
         }
      </div>
    </div>
  );
};

export default Cart;
