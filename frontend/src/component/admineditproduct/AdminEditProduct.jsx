import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import productCategory from '../../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../../helpers/Uploadimage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../../common/index';
import { toast } from 'react-toastify';

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
  const [data, setData] = useState({
    ...productData,
    productImage: productData?.productImage || []
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url]
    }));
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => ({
      ...prev,
      productImage: newProductImage
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchdata();
    } else if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(SummaryApi.deleteProduct.url, {
        method: SummaryApi.deleteProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id: data._id })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData?.message);
        console.log("deleted successfully");
        onClose();
        fetchdata();
      } else {
        toast.error(responseData?.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An error occurred while deleting the product.");
    }
  };

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Edit Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <CgClose />
          </div>
        </div>

        <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
          <label htmlFor='productName'>Product Name :</label>
          <input
            type='text'
            id='productName'
            placeholder='Enter product name'
            name='productName'
            value={data.productName || ''}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
          <input
            type='text'
            id='brandName'
            placeholder='Enter brand name'
            value={data.brandName || ''}
            name='brandName'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='category' className='mt-3'>Category :</label>
          <select required value={data.category || ''} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
            <option value="">Select Category</option>
            {productCategory.map((el) => (
              <option value={el.value} key={el.value}>{el.label}</option>
            ))}
          </select>

          <label htmlFor='productImage' className='mt-3'>Product Image :</label>
          <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
              <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                <span className='text-4xl'><FaCloudUploadAlt /></span>
                <p className='text-sm'>Upload Product Image</p>
                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
              </div>
            </div>
          </label>

          <div>
            {data?.productImage.length > 0 ? (
              <div className='flex items-center gap-2'>
                {data.productImage.map((el, index) => (
                  <div className='relative group' key={el + index}>
                    <img
                      src={el}
                      alt={`Product Image ${index}`}
                      width={80}
                      height={80}
                      className='bg-slate-100 border cursor-pointer'
                    />
                    <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-red-600 text-xs'>*Please upload a product image</p>
            )}
          </div>

          <label htmlFor='price' className='mt-3'>Price :</label>
          <input
            type='number'
            id='price'
            placeholder='Enter price'
            value={data.price || ''}
            name='price'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
          <input
            type='number'
            id='sellingPrice'
            placeholder='Enter selling price'
            value={data.sellingPrice || ''}
            name='sellingPrice'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='description' className='mt-3'>Description :</label>
          <textarea
            className='h-28 bg-slate-100 border resize-none p-1'
            placeholder='Enter product description'
            rows={3}
            onChange={handleOnChange}
            name='description'
            value={data.description || ''}
          ></textarea>

          <button type='submit' className='px-3 py-2 bg-red-600 text-white mb-5 hover:bg-red-700'>Update Product</button>

          <button type='button' className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700' onClick={handleDeleteProduct}>Delete Product</button>

        </form>

      </div>
    </div>
  );
};

export default AdminEditProduct;
