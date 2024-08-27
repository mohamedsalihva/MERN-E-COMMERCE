import React from 'react';
import { Link } from 'react-router-dom';
import successImage from '../../assest/successimage/3226836.jpg'; 

function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-10">
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <img
        src={successImage}
        alt="Payment Successful"
        className="w-48 h-48 mx-auto mb-6" 
      />
      <h1 className="text-2xl font-semibold text-green-600 mb-4">
        Payment Successful!
      </h1>
      <p className="text-gray-600 mb-8">
        Thank you for your purchase. Your order has been processed successfully.
      </p>
      <div className="mb-8">
        <Link
          to="/orders"
          className="text-blue-600 hover:underline text-lg"
        >
          View Order Details
        </Link>
      </div>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300"
      >
        Continue Shopping
      </Link>
    </div>
  </div>
  );
}

export default SuccessPage;
