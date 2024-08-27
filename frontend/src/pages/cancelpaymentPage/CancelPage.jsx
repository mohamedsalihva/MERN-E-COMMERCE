import React from 'react';
import { Link } from 'react-router-dom';
import cancelImage from '../../assest/cancelimage/995dc29c-3ed8-4308-86a4-dfef0d4a877b.jpg';

function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <img
          src={cancelImage}
          alt="Payment Canceled"
          className="w-48 h-48 mx-auto mb-6" 
        />
        <h1 className="text-2xl font-semibold text-red-600 mb-4">
          Payment Canceled
        </h1>
        <p className="text-gray-600 mb-8">
          Your payment was not completed. If this was a mistake, you can try again.
        </p>
        <div className="mb-8">
          <Link
            to="/cart"
            className="text-blue-600 hover:underline text-lg"
          >
            View Your Cart
          </Link>
        </div>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default CancelPage;
