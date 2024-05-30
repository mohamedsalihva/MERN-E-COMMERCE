import React, { useState, useEffect } from 'react';
import UploadProducts from '../../component/uploadProduct/UploadProducts';
import SummaryApi from '../../common';
import AdminProductCard from '../../component/adminproductcard/AdminProductCard';

function AllProducts() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(SummaryApi.allproduct.url);
      const dataResponse = await response.json();
      setAllProduct(dataResponse?.data || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white py-4 px-6 rounded-lg shadow-md flex justify-between items-center">
        <h2 className="font-bold text-xl text-gray-800">All Products</h2>
        <button
          className="border-2 border-red-600 text-red-600 py-2 px-4 rounded-full transition duration-200 hover:bg-red-600 hover:text-white"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>
      
      {openUploadProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <UploadProducts />
            <button
              className="mt-4 text-gray-500 hover:text-gray-700 transition duration-200"
              onClick={() => setOpenUploadProduct(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

<div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {allProduct.map((product, index) => (
    <AdminProductCard
      data={product}
      key={index + "allProduct"}
      fetchdata={fetchAllProduct}
    />
  ))}
</div>

    </div>
  );
}

export default AllProducts;
