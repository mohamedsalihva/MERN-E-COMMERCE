import React, { useEffect, useState, useRef, useContext } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import addTocart from '../../helpers/addTocart';
import Context from '../../context/context';
import getCategoryWiseProduct from '../../helpers/getcategorywiseproduct';

const ProductCard = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addTocart(e, id);
    fetchUserAddToCart();
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await getCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div id='product' className='container mx-auto px-4 my-6 relative'>
      <h2 className='text-2xl font-bold mb-6'>{heading}</h2>
      <div className='relative'>
        <button
          onClick={scrollLeft}
          className='absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200'
        >
          <FaAngleLeft />
        </button>
        <div ref={scrollRef} className='flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth'>
          {loading ? (
            <div className='w-full min-w-[280px] max-w-[280px] bg-white rounded-sm shadow animate-pulse'>
              <div className='bg-slate-200 h-48 p-4 flex justify-center items-center'></div>
              <div className='p-4'>
                <div className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></div>
                <div className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></div>
                <div className='flex gap-3'>
                  <div className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></div>
                  <div className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></div>
                </div>
                <button className='mt-4 text-sm text-white px-3 py-1 rounded-full bg-slate-200 animate-pulse'></button>
              </div>
            </div>
          ) : data.length > 0 ? (
            data.map((product, index) => (
              <Link to={`/product/${product?._id}`} key={index} className='min-w-[280px] max-w-[280px] bg-white rounded-sm shadow'>
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
                  <button className='mt-4 text-sm bg-cyan-500 hover:bg-red-700 text-white px-3 py-1 rounded-full' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                </div>
              </Link>
            ))
          ) : (
            <p>No products available.</p>
          )}
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
};

export default ProductCard;
