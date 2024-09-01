import React, { useEffect, useState } from 'react';
import SummaryApi from '../../common';

function OrderPage() {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(SummaryApi.allOrder.url, {
        method: SummaryApi.allOrder.method,
        credentials: 'include',
      });
      const DataResponse = await response.json();
      console.log('orderDataResponse:', DataResponse);

      if (Array.isArray(DataResponse.data)) {
        setData(DataResponse.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-190px)] overflow-y-scroll">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Orders</h1>
      {data.length === 0 ? (
        <p className="text-center text-gray-500">No orders available</p>
      ) : (
        <div className="space-y-6">
          {data.map((order) => (
            <div key={order._id} className="bg-white shadow-lg rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between mb-4">
                <div className="w-1/2 pr-4 border-r border-gray-200">
                  <h3 className="text-md font-medium mb-2">Items:</h3>
                  {order.productDetails.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <p className="text-sm font-medium">{item.name}</p>
                      </div>
                      <p className="text-sm font-medium">₹{item.price} x {item.quantity}</p>
                    </div>
                  ))}
                  <div className="mt-4">
                    <p className="text-md font-semibold">Total: ₹{order.totalAmount}</p>
                  </div>
                </div>
                
                <div className="w-1/2 pl-4">
                  <h2 className="text-lg font-semibold mb-2">Order ID: {order._id}</h2>
                  <p className="text-gray-600 mb-4 text-sm">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>

                  <div className="mb-4">
                    <h3 className="text-md font-medium mb-2">Payment Details:</h3>
                    <p className="text-sm font-medium">Payment Method: {order.paymentDetails.payment_method_type.join(', ')}</p>
                    <p className="text-sm font-medium">Payment ID: {order.paymentDetails.paymentId}</p>
                    <p className="text-sm font-medium">Status: {order.paymentDetails.payment_status}</p>
                  </div>

                  <div>
                    <h3 className="text-md font-medium mb-2">Shipping Details:</h3>
                    {order.shipping_options.map((option, idx) => (
                      <p key={idx} className="text-sm font-medium mb-1">Shipping Amount: ₹{option.shipping_amount}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderPage;
