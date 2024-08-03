import React, { useState } from 'react';
import productCategory from '../../helpers/productCategory';

const ProductFilter = () => {
  const [data,setData]=useState([]);
  const [loading,setLoding]=useState(false)

  const fetchData =async()=>{
    const response = await fetch()

    const Dataresponse=await response.json()
    setData(Dataresponse?.data || [])
    console.log(Dataresponse)
  }
  return (
    <div className='container mx-auto p-6 mt-20'>
      <div className='grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-6'>
        
        {/* Left Side: Filter Sidebar */}
        <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-200'>
          <h2 className='text-xl font-bold mb-6 text-gray-900 border-b-2 border-gray-200 pb-2'>Sort by</h2>
          <ul className='space-y-4'>
            <li className='cursor-pointer py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300'>
             <input type="checkbox" />
             <label htmlFor="">Price: High to Low</label>
            </li>
            <li className='cursor-pointer py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300'>
            <input type="checkbox" />
            <label htmlFor="">Price: Low to high</label>
            </li>
          </ul>

          <h2 className='text-xl font-bold mt-8 mb-6 text-gray-900 border-b-2 border-gray-200 pb-2'>Category</h2>
          <div className='space-y-3'>
            {productCategory.map((category, index) => (
              <div key={index} className='flex items-center'>
                <input
                  type='checkbox'
                  id={category.value}
                  className='form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded'
                />
                <label
                  htmlFor={category.value}
                  className='ml-3 text-gray-800 text-sm font-medium'
                >
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Product Display */}
        <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-200'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            <div className='border rounded-lg overflow-hidden shadow-md'>
              <img src='https://via.placeholder.com/150' alt='Product 1' className='w-full h-48 object-cover' />
              <div className='p-4'>
                <h3 className='text-lg font-semibold mb-2 text-gray-800'>Product 1</h3>
                <p className='text-gray-600 text-sm'>Description of product 1.</p>
              </div>
            </div>
            <div className='border rounded-lg overflow-hidden shadow-md'>
              <img src='https://via.placeholder.com/150' alt='Product 2' className='w-full h-48 object-cover' />
              <div className='p-4'>
                <h3 className='text-lg font-semibold mb-2 text-gray-800'>Product 2</h3>
                <p className='text-gray-600 text-sm'>Description of product 2.</p>
              </div>
            </div>
            <div className='border rounded-lg overflow-hidden shadow-md'>
              <img src='https://via.placeholder.com/150' alt='Product 3' className='w-full h-48 object-cover' />
              <div className='p-4'>
                <h3 className='text-lg font-semibold mb-2 text-gray-800'>Product 3</h3>
                <p className='text-gray-600 text-sm'>Description of product 3.</p>
              </div>
            </div>
            {/* Add more product cards as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
