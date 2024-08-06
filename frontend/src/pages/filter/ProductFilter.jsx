import React, { useState, useEffect } from 'react';
import productCategory from '../../helpers/productCategory';
import ProductCard from '../../component/productcard/ProductCard';
import { useParams } from 'react-router-dom';

const ProductFilter = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState({});


    const fetchData = async () => {
      setLoading(true);
      try {
        // Make sure to provide a valid URL or endpoint
        const response = await fetch(''); 
        const Dataresponse = await response.json();
        setData(Dataresponse?.data || []);
        console.log(Dataresponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

 

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  console.log("selectCategory:", selectCategory);
useEffect(()=>{
const arrayofCategory = Object.keys(selectCategory).map(categoryName=>{
  console.log(categoryName)
})
},[selectCategory])
  return (
    <div className='container mx-auto p-6 mt-20'>
      <div className='grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-6'>
        {/* Left Side: Filter Sidebar */}
        <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-200'>
          <h2 className='text-xl font-bold mb-6 text-gray-900 border-b-2 border-gray-200 pb-2'>Sort by</h2>
          <ul className='space-y-4'>
            <li className='cursor-pointer py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300'>
              <input type="checkbox" id="price-high-low" />
              <label htmlFor="price-high-low">Price: High to Low</label>
            </li>
            <li className='cursor-pointer py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300'>
              <input type="checkbox" id="price-low-high" />
              <label htmlFor="price-low-high">Price: Low to High</label>
            </li>
          </ul>

          <h2 className='text-xl font-bold mt-8 mb-6 text-gray-900 border-b-2 border-gray-200 pb-2'>Category</h2>
          <div className='space-y-3'>
            {productCategory.map((categoryName, index) => (
              <div key={index} className='flex items-center'>
                <input
                  type='checkbox'
                  name={"category"}
                  checked={selectCategory[categoryName?.value] || false}
                  id={categoryName?.value}
                  value={categoryName?.value}
                  className='form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded'
                  onChange={handleSelectCategory}
                />
                <label
                  htmlFor={categoryName?.value}
                  className='ml-3 text-gray-800 text-sm font-medium'
                >
                  {categoryName.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Product Display */}
        <div>
          {
            data.length !== 0 && !loading && (
              <ProductCard data={data} loading={loading} />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
