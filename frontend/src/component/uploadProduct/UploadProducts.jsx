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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 mt-20">
            <div className="bg-white p-8 rounded-lg w-full max-w-2xl h-full max-h-screen overflow-y-auto shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-2xl text-gray-800">Upload Product</h2>
                    <button className="text-2xl text-gray-600 hover:text-gray-900 transition" onClick={handleCancel}>
                        <CgClose />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            value={data.productName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Brand Name</label>
                        <input
                            type="text"
                            name="brandName"
                            value={data.brandName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                        <select
                            name="category"
                            value={data.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        >
                            <option value="" disabled>Select Category</option>
                            {productCategory.map((el, index) => (
                                <option value={el.value} key={el.value + index}>{el.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image</label>
                        <label htmlFor="uploadImageInput" className="block">
                            <div className="p-4 bg-gray-100 border border-dashed border-gray-300 rounded h-32 w-full flex justify-center items-center cursor-pointer hover:bg-gray-200 transition">
                                <div className="text-gray-500 flex flex-col justify-center items-center gap-2">
                                    <FaCloudUploadAlt className="text-4xl" />
                                    <p className="text-sm">Upload Product Image</p>
                                </div>
                                <input
                                    type="file"
                                    id="uploadImageInput"
                                    className="hidden"
                                    onChange={handleUploadProduct}
                                />
                            </div>
                        </label>
                    </div>
                    {data.productImage.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-4">
                            {data.productImage.map((el, index) => (
                                <div key={index} className="relative w-32 h-32 border border-gray-300 rounded overflow-hidden shadow-sm">
                                    <img
                                        src={el}
                                        alt={`Uploaded product ${index}`}
                                        className="object-cover w-full h-full"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1 hover:bg-red-600 transition"
                                        onClick={() => handleDeleteImage(el)}
                                    >
                                        <RiDeleteBin6Line />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Selling Price</label>
                        <input
                            type="number"
                            name="sellingPrice"
                            value={data.sellingPrice}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded ml-2 hover:bg-blue-700 transition"
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
