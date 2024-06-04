import React, { useEffect, useState, useRef, useContext } from 'react';
import getcategorywiseproduct from '../../helpers/getcategorywiseproduct';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import addTocart from '../../helpers/addTocart';
import Context from '../../context/context';

const ProductCard = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const scrollRef = useRef(null);

  const {fetchUserAddToCart} =useContext(Context)

  const handleaddtocart=async (e,id)=>{
  await  addTocart(e,id)
  fetchUserAddToCart()
  }


  const fetchData = async () => {
    const categoryproduct = await getcategorywiseproduct(category);
    setData(categoryproduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className='container mx-auto px-4 my-6 relative'>
      <h2 className='text-2xl font-bold mb-6'>{heading}</h2>
      <div className='relative'>
        <button
          onClick={scrollLeft}
          className='absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200'
        >
          <FaAngleLeft />
        </button>
        <div
          ref={scrollRef}
          className='flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth'
        >
          {data.map((product, index) => (
            <Link to={"product/"+product?._id}  key={index} className='min-w-[280px] max-w-[280px] bg-white rounded-sm shadow'>
              <div className='bg-slate-200 h-48 p-4 flex justify-center items-center'>
                <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' alt='' />
              </div>
              <div className='p-4'>
                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                <p className='capitalize text-slate-500'>{product?.category}</p>
                <div className='flex justify-between items-center mt-2'>
                  <p className='text-red-600 font-medium'>&#8377;{product?.sellingPrice}</p>
                  <p className='text-slate-500 line-through'>&#8377;{product?.price}</p>
                </div>
                <button className='mt-4 text-sm bg-cyan-500 hover:bg-red-700 text-white px-3 py-1 rounded-full' onClick={(e)=>handleaddtocart(e,product?._id)}>Add to Cart</button>
              </div>
            </Link>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className='absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200'
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );

}
export default ProductCard;
