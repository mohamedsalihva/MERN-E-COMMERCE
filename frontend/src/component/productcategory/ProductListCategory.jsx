import React, { useEffect, useState } from 'react';
import SummaryApi from '../../common';
import { Link } from 'react-router-dom';

const ProductListCategory = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);

  const fetchCategoryProduct = async () => {
    const response = await fetch(SummaryApi.productCategory.url);
    const dataResponse = await response.json();
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className='container mx-auto p-4 mt-20'>
      <div className='flex  items-center gap-2 justify-between overflow-scroll scrollbar-none '>
        {categoryProduct.map((product, index) => (
          <Link to={"product-category/"+product?.category} className='cursor-pointer' key={index}>
            <div className='w-20 h-20 rounded-full overflow-hidden p-3 bg-white flex items-center'>
              <img src={product?.productImage[0]} alt={product?.category} className='h-full ' />
            </div>
            <p className='text-center text-sm mt-2 capitalize font-semibold '>{product?.category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductListCategory;
