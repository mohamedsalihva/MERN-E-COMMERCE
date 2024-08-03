import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SummaryApi from '../../common';
import ProductCard from '../../component/productcard/ProductCard';
import ReactStars from 'react-rating-stars-component';
import Context from '../../context/context'; 
import { toast } from 'react-toastify';

const ProductDetail = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: "",
        userRating: null
    });
    const [rating, setRating] = useState(0);

    const { id } = useParams();
    const { user } = useContext(Context);
    const userId = user ? user._id : null;

    const fetchProductDetail = async () => {
        const response = await fetch(`${SummaryApi.productDetail.url}?productId=${id}&userId=${userId}`, {
            method: SummaryApi.productDetail.method,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include' // Ensures cookies are sent with the request
        });
        
        const dataResponse = await response.json();
        setData(dataResponse?.data);
        setRating(dataResponse?.data?.userRating || 0);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.productImage.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === data.productImage.length - 1 ? 0 : prevIndex + 1));
    };

    const handleRating = async (rate) => {
        setRating(rate);

        if (!userId) {
            toast.error('User not authenticated');
            return;
        }

        try {
            const response = await fetch(SummaryApi.addProductRating.url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include', // This must be set to include cookies
                body: JSON.stringify({
                    productId: id,
                    userId: userId,
                    rating: rate
                })
            });
            
        

            if (!response.ok) {
                const error = await response.json();
                toast.error(`Error: ${error.message}`);
                return;
            }

            const result = await response.json();

            if (result.success) {
                toast.success('Rating submitted successfully');
                setData(prevData => ({
                    ...prevData,
                    userRating: rate
                }));
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
            toast.error('An error occurred while submitting the rating.');
        }
    };

    useEffect(() => {
        fetchProductDetail();
    }, []);

    return (
        <div className='container mx-auto px-4 mt-20'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-40'>
                <div className='relative flex justify-center items-center'>
                    {data.productImage && data.productImage.length > 0 && (
                        <>
                            <button
                                className='absolute left-0 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition-all'
                                onClick={handlePrev}
                            >
                                &lt;
                            </button>
                            <img
                                src={data.productImage[currentIndex]}
                                alt={data.productName}
                                className='object-contain h-96 rounded shadow-md'
                            />
                            <button
                                className='absolute right-0 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition-all'
                                onClick={handleNext}
                            >
                                &gt;
                            </button>
                        </>
                    )}
                </div>
                <div>
                    <p className='text-md text-gray-700 mb-2 font-semibold bg-slate-400 rounded-full w-16 h-6 text-center'>{data.brandName}</p>
                    <div className="rating-container mb-4">
                        <ReactStars
                            count={5}
                            onChange={handleRating}
                            size={24}
                            activeColor="#ffd700"
                            value={rating}
                        />
                    </div>
                    <h1 className='text-3xl font-semibold mb-4'>{data.productName}</h1>
                    <p className='text-lg mb-4'>{data.description}</p>
                    <div className='flex items-center mb-6'>
                        <p className='text-2xl text-red-600 font-bold mr-4'>&#8377;{data.sellingPrice}</p>
                        <p className='text-xl text-gray-500 line-through'>&#8377;{data.price}</p>
                    </div>
    
                    <div className='flex items-center mb-4'>
                        <button className='px-3 py-2 text-white bg-cyan-500 hover:bg-cyan-700 rounded-full mr-2'>
                            Add to Cart
                        </button>
                        <button className='px-6 py-2 text-white bg-cyan-500 hover:bg-cyan-700 rounded-full'>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
    
            {data.category && (
                <ProductCard category={data.category} heading={"Recommended products"} />
            )}
        </div>
    );
};

export default ProductDetail;
