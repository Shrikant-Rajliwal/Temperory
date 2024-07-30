import React from 'react';
import { MdDeleteForever } from "react-icons/md";


const ProductCard = ({ product }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white lg:w-72">
      <img className="w-full" src={product.Image} alt={product.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.Name}</div>
        <p className="text-gray-700 text-base">
          {product.Description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
      <span className="block text-lg bg-blue-300 w-4/5 text-black font-semibold mr-2 mb-2 p-2 rounded-full">
                Price :{product.Price} Rs
              </span>
      </div>
    </div>
  );
};

export default ProductCard;
