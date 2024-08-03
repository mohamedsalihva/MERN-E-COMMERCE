import React, { useEffect, useState } from 'react';
import SummaryApi from '../../common';
import { useNavigate } from 'react-router-dom';

const ProductListCategory = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const navigate = useNavigate();

  const fetchCategoryProduct = async () => {
    try {
      const response = await fetch(SummaryApi.productCategory.url);
      const dataResponse = await response.json();
      setCategoryProduct(dataResponse.data);
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/ProductFilter?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className='container mx-auto p-4 mt-20'>
      <div className='flex items-center gap-2 justify-between overflow-scroll scrollbar-none'>
        {categoryProduct.map((product, index) => (
          <div className='cursor-pointer' key={index} onClick={() => handleCategoryClick(product.category)}>
            <div className='w-20 h-20 rounded-full overflow-hidden p-3 bg-white flex items-center'>
              <img src={product?.productImage[0]} alt={product?.category} className='h-full' />
            </div>
            <p className='text-center text-sm mt-2 capitalize font-semibold'>{product?.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListCategory;
