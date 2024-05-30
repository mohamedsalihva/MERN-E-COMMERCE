import React, { useState } from 'react';
import productCategory from '../../helpers/productCategory';
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import uploadImage from '../../helpers/Uploadimage';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const UploadProducts = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(SummaryApi.uploadProduct.url, {
            method: SummaryApi.uploadProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (responseData.success) {
            toast.success(responseData.message);
            console.log(responseData.message);
            navigate('/admin-panel');
        } 
        if (responseData.error) {
            toast.error(responseData.message);
            console.log(responseData.message);
        }
    };

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        const uploadImageCloudinary = await uploadImage(file);

        setData((prev) => ({
            ...prev,
            productImage: [...prev.productImage, uploadImageCloudinary.url]
        }));
    };

    const handleDeleteImage = (url) => {
        setData((prev) => ({
            ...prev,
            productImage: prev.productImage.filter(image => image !== url)
        }));
    };

    const handleCancel = () => {
        navigate('/admin-panel');
    };

    return (
        <div className="fixed w-full h-full top-0 left-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-2xl h-full max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-xl">Upload Product</h2>
                    <button className="text-2xl font-bold cursor-pointer" onClick={handleCancel}><CgClose /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            value={data.productName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Brand Name</label>
                        <input
                            type="text"
                            name="brandName"
                            value={data.brandName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Category</label>
                        <select
                            name="category"
                            value={data.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        >
                            <option value="" disabled>Select Category</option>
                            {productCategory.map((el, index) => (
                                <option value={el.value} key={el.value + index}>{el.label}</option>
                            ))}
                        </select>
                    </div>

                    <label htmlFor='productImage' className='block text-sm font-semibold mb-2'>Product Image :</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input
                                    type='file'
                                    id='uploadImageInput'
                                    className='hidden'
                                    multiple
                                    onChange={handleUploadProduct}
                                />
                            </div>
                        </div>
                    </label>

                    {data.productImage.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-4">
                            {data.productImage.map((el, index) => (
                                <div key={index} className="relative w-32 h-32 border rounded overflow-hidden">
                                    <img
                                        src={el}
                                        alt={`Uploaded product ${index}`}
                                        className="object-cover w-full h-full"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1"
                                        onClick={() => handleDeleteImage(el)}
                                    >
                                        <RiDeleteBin6Line />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Description</label>
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Selling Price</label>
                        <input
                            type="number"
                            name="sellingPrice"
                            value={data.sellingPrice}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadProducts;
