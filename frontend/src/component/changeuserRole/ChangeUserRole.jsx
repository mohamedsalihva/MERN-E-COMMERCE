import React, { useState } from 'react';
import ROLE from '../../common/role/role';
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../../common/index';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name: initialName,
    email: initialEmail,
    role: initialRole,
    userId,
    onClose,
    callFunc,
}) => {
    const [formData, setFormData] = useState({
        name: initialName,
        email: initialEmail,
        role: initialRole
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const updateUser = async () => {
        try {
            const fetchResponse = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    ...formData
                })
            });

            const responseData = await fetchResponse.json();

            if (responseData.success) {
                toast.success(responseData.message);
                onClose();
                callFunc();
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    const deleteUser = async (userId) => {
        try {
            const response = await fetch(SummaryApi.DeleteUser.url, {
                method: SummaryApi.DeleteUser.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId })
            });
    
            const responseData = await response.json();
    
            if (response.ok && responseData.success) {
                toast.success("User deleted successfully");
                onClose();
                callFunc();
            } else {
                toast.error(responseData.message || "User deletion failed");
            }
        } catch (error) {
            console.error("Error during deletion:", error);
            toast.error("An error occurred during user deletion");
        }
    };
    
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50'>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
                <button className='block ml-auto' onClick={onClose}>
                    <IoMdClose />
                </button>

                <h1 className='pb-4 text-lg font-medium'>Change User Details</h1>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                        Name
                    </label>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                        Email
                    </label>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='role'>
                        Role
                    </label>
                    <select
                        name='role'
                        value={formData.role}
                        onChange={handleChange}
                        className='border px-4 py-2 rounded w-full'
                    >
                        {Object.values(ROLE).map((el) => (
                            <option value={el} key={el}>
                                {el}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className='w-full py-2 px-4 rounded bg-red-600 text-white hover:bg-red-700'
                    onClick={updateUser}
                >
                    Update User
                </button>

                <button
                    className='w-full py-2 px-4 rounded bg-red-600 text-white hover:bg-red-700 mt-2'
                    onClick={() => deleteUser(userId)}
                >
                    Delete User
                </button>
            </div>
        </div>
    );
};

export default ChangeUserRole;
