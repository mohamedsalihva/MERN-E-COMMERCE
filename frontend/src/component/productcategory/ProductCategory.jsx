import React, { useEffect, useState } from 'react';
import SummaryApi from '../../common';

const ProductCategory = () => {
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
    <div className='container mx-auto p-4'>
      <div className='flex flex-wrap items-center gap-2 justify-between '>
        {categoryProduct.map((product, index) => (
          <div key={index}>
            <div className='w-20 h-20 rounded-full overflow-hidden p-3 bg-white flex items-center'>
              <img src={product?.productImage[0]} alt={product?.category} className='h-full hidden md:block' />
            </div>
            <p className='text-center text-sm mt-2 capitalize font-semibold  hidden md:block'>{product?.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
