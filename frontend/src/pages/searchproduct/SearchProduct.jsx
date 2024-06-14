import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryApi from '../../common';
import Context from '../../context/context';
import addTocart from '../../helpers/addTocart';

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  console.log("query:", query.search);

  const fetchProduct = async () => {
    try {
      const response = await fetch(SummaryApi.searchProduct.url + query.search, {
        method: SummaryApi.searchProduct.method
      });
      const dataresponse = await response.json();
      setData(dataresponse.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  
  const {fetchUserAddToCart} =useContext(Context)

  const handleaddtocart=async (e,id)=>{
  await  addTocart(e,id)
  fetchUserAddToCart()
  }

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <div className='container mt-20'>
      <p className="text-xl font-semibold mb-4">Search results: {data.length}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((product) => (
          <div key={product._id} className="bg-white shadow-md rounded-md overflow-hidden">
            <img src={product.productImage[0]} alt={product.productName} className="w-full h-40 object-contain" />
            <div className="p-4">
              <h3 className="text-md font-semibold mb-1">{product.productName}</h3>
              <p className="text-gray-600 mb-2 text-sm">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-gray-700 font-semibold text-sm">${product.price}</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded-md transition-colors duration-300" onClick={(e)=>handleaddtocart(e,product?._id)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SearchProduct;
