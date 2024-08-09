import React, { useState, useEffect } from 'react';
import productCategory from '../../helpers/productCategory';
import ProductCardVertical from '../../component/veritcalproductcard/VerticalProductCard';
import SummaryApi from '../../common';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductFilter = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const URLsearch = new URLSearchParams(location.search);
  const urlCategoryListArray = URLsearch.getAll('category');

  const urlCategoryListobj = {};
  urlCategoryListArray.forEach(el => {
    urlCategoryListobj[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListobj);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("")
  console.log("sortby:",sortBy)

  const fetchData = async () => {
    setLoading(true);
    try {
      const payload = { category: filterCategoryList };
      console.log('Request Payload:', payload);

      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const Dataresponse = await response.json();
      console.log('API Response:', Dataresponse);
      setData(Dataresponse?.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory(prev => ({
      ...prev,
      [value]: checked,
    }));
  };

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .filter(categoryKeyName => selectCategory[categoryKeyName]);

    setFilterCategoryList(arrayOfCategory);


    const urlFormat = arrayOfCategory.map(el => `category=${el}`).join('&&');
    navigate(`/ProductFilter?${urlFormat}`);
    console.log('Updated filterCategoryList:', arrayOfCategory);
  }, [selectCategory]);

 const HandleSortBy=(e)=>{
const {value} =e.target
setSortBy(value)
if(value ==='asc'){
setData(prev=>prev.sort((a,b)=>a.sellingPrice - b.sellingPrice))
}
if(value ==='dsc'){
  setData(prev=>prev.sort((a,b)=>b.sellingPrice - a.sellingPrice))
  }
 }
 useEffect(()=>{

 },[sortBy])


  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  return (
    <div className='container mx-auto p-6 mt-20'>
      <div className='grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-6'>
        {/* Left Side: Filter Sidebar */}
        <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-200'>
          <h2 className='text-xl font-bold mb-6 text-gray-900 border-b-2 border-gray-200 pb-2'>Sort by</h2>
          <ul className='space-y-4'>
            <li className='cursor-pointer py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300'>
              <input type='radio' checked={sortBy === 'asc'} id='price-low-high' name='sortBy'  onChange={HandleSortBy} value={"asc"} />
              <label htmlFor='price-low-high'>Price: Low to High</label>
            </li>
            <li className='cursor-pointer py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300'>
              <input type='radio' checked={sortBy === 'dsc'}  id='price-high-low' name='sortBy'  onChange={HandleSortBy} value={"dsc"}/>
              <label htmlFor='price-high-low'>Price: High to Low</label>
            </li>
          </ul>

          <h2 className='text-xl font-bold mt-8 mb-6 text-gray-900 border-b-2 border-gray-200 pb-2'>Category</h2>
          <div className='space-y-3'>
            {productCategory.map((categoryName, index) => (
              <div key={index} className='flex items-center'>
                <input
                  type='checkbox'
                  name='category'
                  checked={selectCategory[categoryName?.value] || false}
                  id={categoryName?.value}
                  value={categoryName?.value}
                  className='form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded'
                  onChange={handleSelectCategory}
                />
                <label htmlFor={categoryName?.value} className='ml-3 text-gray-800 text-sm'>
                  {categoryName.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Product Display */}
        <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            data.length !== 0 ? <ProductCardVertical data={data} /> : <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
