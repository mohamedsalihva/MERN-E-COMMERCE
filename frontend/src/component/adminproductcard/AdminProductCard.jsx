import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
// import AdminEditProduct from './AdminEditProduct';
// import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
  data,
  // fetchdata
}) => {
  // const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-white p-4 rounded shadow-md flex flex-col items-center">
      <div className="w-full">
        <div className="w-32 h-32 flex justify-center items-center mx-auto mb-4">
          <img
            src={data?.productImage[0]}
            alt={data.productName}
            className="max-w-full max-h-full object-cover rounded-md"
          />
        </div>
        <h1 className="text-center text-lg font-semibold mb-2 line-clamp-2">
          {data.productName}
        </h1>
        <p className="text-center font-semibold text-gray-800 mb-4">
          {/* {displayINRCurrency(data.sellingPrice)} */}
          ₹{data.sellingPrice}
        </p>
        <div className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer flex items-center justify-center">
          <MdModeEditOutline size={24} />
        </div>
      </div>

      {/* {editProduct && (
        <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
      )} */}
    </div>
  );
};

export default AdminProductCard;
