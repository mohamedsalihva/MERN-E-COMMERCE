import React, { useRef, useContext } from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import addTocart from '../../helpers/addTocart';
import Context from '../../context/context';

const ProductCardVertical = ({ data = [], heading }) => { // Provide default value for data
  const scrollRef = useRef(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addTocart(e, id);
    fetchUserAddToCart();
  };

  const scrollUp = () => {
    scrollRef.current.scrollBy({ top: -300, behavior: 'smooth' });
  };

  const scrollDown = () => {
    scrollRef.current.scrollBy({ top: 300, behavior: 'smooth' });
  };

  return (
    <div id='product' className='container mx-auto px-4 my-6 relative'>
      <h2 className='text-2xl font-bold mb-6'>{heading}</h2>
      <div className='relative'>
        <button
          onClick={scrollUp}
          className='absolute left-1/2 transform -translate-x-1/2 top-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200'
        >
          <FaAngleUp />
        </button>
        <div ref={scrollRef} className='flex flex-col overflow-y-auto gap-4 scrollbar-hide scroll-smooth' style={{ maxHeight: '500px' }}>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {data.length > 0 ? (
              data.map((product, index) => (
                <Link to={`product/${product?._id}`} key={index} className='bg-white rounded-sm shadow p-4 flex flex-col'>
                  <div className='bg-slate-200 h-32 flex justify-center items-center mb-4'>
                    <img src={product.productImage[0]} className='object-contain h-full' alt='' />
                  </div>
                  <div className='flex flex-col flex-grow'>
                    <h2 className='font-medium text-base text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                    <p className='capitalize text-slate-500 mt-1'>{product?.category}</p>
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
        </div>
        <button
          onClick={scrollDown}
          className='absolute left-1/2 transform -translate-x-1/2 bottom-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200'
        >
          <FaAngleDown />
        </button>
      </div>
    </div>
  );
};

export default ProductCardVertical;
